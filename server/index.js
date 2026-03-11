import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

const PORT = Number(process.env.BACKEND_PORT || 5000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";
const SMTP_HOST = (process.env.SMTP_HOST || "").trim();
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = String(process.env.SMTP_SECURE || "false") === "true";
const SMTP_USER = (process.env.SMTP_USER || "").trim();
const SMTP_PASS_RAW = process.env.SMTP_PASS || "";
const SMTP_PASS = SMTP_HOST.includes("gmail")
  ? SMTP_PASS_RAW.replace(/\s+/g, "")
  : SMTP_PASS_RAW.trim();
const CONTACT_TO_EMAIL = (process.env.CONTACT_TO_EMAIL || "").trim();
const CONTACT_FROM_EMAIL = (process.env.CONTACT_FROM_EMAIL || SMTP_USER).trim();
const CONTACT_SUBJECT_PREFIX = process.env.CONTACT_SUBJECT_PREFIX || "Website Contact";

const missingSmtpConfig = [SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL].some((value) => !value);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "100kb" }));

app.use(
  "/api/contact",
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.RATE_LIMIT_MAX || 25),
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again shortly." },
  })
);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "contact-api",
    smtpConfigured: !missingSmtpConfig,
    recipient: CONTACT_TO_EMAIL || null,
  });
});

app.post("/api/contact", async (req, res) => {
  if (missingSmtpConfig) {
    return res.status(500).json({
      message: "SMTP server is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and CONTACT_TO_EMAIL.",
    });
  }

  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (name.length < 2) {
    return res.status(400).json({ message: "Name must be at least 2 characters." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please provide a valid email address." });
  }

  if (message.length < 10) {
    return res.status(400).json({ message: "Message must be at least 10 characters." });
  }

  const subject = `${CONTACT_SUBJECT_PREFIX} - ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  try {
    console.info("[ContactAPI] Sending message", {
      to: CONTACT_TO_EMAIL,
      from: CONTACT_FROM_EMAIL,
      replyTo: email,
    });

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("[ContactAPI] SMTP send error", error);
    const isAuthError = error?.code === "EAUTH" || error?.responseCode === 535;
    return res.status(502).json({
      message: isAuthError
        ? "SMTP authentication failed. Check SMTP_USER, SMTP_PASS (App Password), and Gmail 2-Step setup."
        : "Failed to send message via SMTP.",
    });
  }
});

app.listen(PORT, async () => {
  console.info(`[ContactAPI] Running at http://localhost:${PORT}`);

  if (!missingSmtpConfig && String(process.env.SMTP_VERIFY || "true") === "true") {
    try {
      await transporter.verify();
      console.info("[ContactAPI] SMTP connection verified");
    } catch (error) {
      console.error("[ContactAPI] SMTP verification failed", error?.message || error);
    }
  }
});

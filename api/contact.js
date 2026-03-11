import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getConfig = () => {
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
  const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

  return {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
    CONTACT_SUBJECT_PREFIX,
    FRONTEND_ORIGIN,
  };
};

const addCorsHeaders = (res, origin) => {
  if (origin === "*") {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

export default async function handler(req, res) {
  const config = getConfig();
  addCorsHeaders(res, config.FRONTEND_ORIGIN);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const missingSmtpConfig = [
    config.SMTP_HOST,
    config.SMTP_USER,
    config.SMTP_PASS,
    config.CONTACT_TO_EMAIL,
  ].some((value) => !value);

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

  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  const subject = `${config.CONTACT_SUBJECT_PREFIX} - ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  try {
    await transporter.sendMail({
      from: config.CONTACT_FROM_EMAIL,
      to: config.CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("[ContactAPI:Vercel] SMTP send error", error);
    const isAuthError = error?.code === "EAUTH" || error?.responseCode === 535;

    return res.status(502).json({
      message: isAuthError
        ? "SMTP authentication failed. Check SMTP_USER, SMTP_PASS (App Password), and Gmail 2-Step setup."
        : "Failed to send message via SMTP.",
    });
  }
}

import dotenv from "dotenv";

dotenv.config();

export default function handler(_req, res) {
  const SMTP_HOST = (process.env.SMTP_HOST || "").trim();
  const SMTP_USER = (process.env.SMTP_USER || "").trim();
  const SMTP_PASS_RAW = process.env.SMTP_PASS || "";
  const SMTP_PASS = SMTP_HOST.includes("gmail")
    ? SMTP_PASS_RAW.replace(/\s+/g, "")
    : SMTP_PASS_RAW.trim();
  const CONTACT_TO_EMAIL = (process.env.CONTACT_TO_EMAIL || "").trim();

  const smtpConfigured = ![SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL].some((value) => !value);

  return res.status(200).json({
    ok: true,
    service: "contact-api",
    smtpConfigured,
    recipient: CONTACT_TO_EMAIL || null,
  });
}

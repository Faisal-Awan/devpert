# SMTP Contact Backend Setup (Node + Express)

This project now uses a real backend email API:
- Frontend: `src/pages/ContactPage.jsx` -> `POST /api/contact`
- Backend: `server/index.js` (Express + Nodemailer)

## 1. Install dependencies

Already added:
- `express`
- `nodemailer`
- `cors`
- `dotenv`
- `helmet`
- `express-rate-limit`
- `concurrently`

## 2. Configure `.env`

Use this as baseline:

```env
BACKEND_PORT=5000
FRONTEND_ORIGIN=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASS=your_app_password_or_smtp_password

CONTACT_TO_EMAIL=info@devpert.com
CONTACT_FROM_EMAIL=your_email@example.com
CONTACT_SUBJECT_PREFIX=Website Contact

SMTP_VERIFY=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=25

VITE_CONTACT_API_ENDPOINT=/api/contact
```

Important:
- `CONTACT_TO_EMAIL` is now required and has no fallback.
- If `CONTACT_TO_EMAIL` is missing in deployment env, API returns config error instead of silently sending to `SMTP_USER`.

## 3. If using Gmail SMTP (recommended for quick setup)

1. Turn on 2-Step Verification in Google account.
2. Generate an App Password (Google Account -> Security -> App passwords).
3. Put your Gmail in `SMTP_USER`.
4. Put generated app password in `SMTP_PASS`.

Do not use your normal Gmail account password.

If your app password appears with spaces in Google UI, you can paste it as-is; the backend normalizes it for Gmail.

## 4. Run the app

Run frontend + backend together:

```bash
npm run dev:full
```

Or separately:

```bash
npm run server
npm run dev
```

## 5. Verify backend health

Open:

- `http://localhost:5000/api/health`

Expected JSON:

```json
{
  "ok": true,
  "service": "contact-api",
  "smtpConfigured": true
}
```

## 6. Test contact API manually (PowerShell)

```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/contact -Method Post -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","message":"Hello from API test message."}'
```

## 7. Common errors

- `SMTP verification failed Invalid login 535`:
  - Wrong `SMTP_USER` or `SMTP_PASS`
  - For Gmail: app password missing/wrong

- `CORS blocked`:
  - Check `FRONTEND_ORIGIN` matches your frontend URL

- `Failed to send message via SMTP`:
  - SMTP provider rejected credentials, port, or sender

## 8. Production notes

- Set `FRONTEND_ORIGIN` to your real frontend domain.
- Keep `.env` out of git.
- Do not expose SMTP credentials to frontend.
- Keep rate limiting enabled.

## 9. Deploy on Vercel

1. Push this repository to GitHub.
2. Import project in Vercel.
3. In Vercel Project Settings -> Environment Variables, set:
  - `SMTP_HOST=smtp.gmail.com`
  - `SMTP_PORT=587`
  - `SMTP_SECURE=false`
  - `SMTP_USER=faisal.awan3303@gmail.com`
  - `SMTP_PASS=<your_gmail_app_password>`
  - `CONTACT_TO_EMAIL=info@devpert.com`
  - `CONTACT_FROM_EMAIL=faisal.awan3303@gmail.com`
  - `CONTACT_SUBJECT_PREFIX=Website Contact`
  - `FRONTEND_ORIGIN=https://<your-vercel-domain>`
  - `VITE_CONTACT_API_ENDPOINT=/api/contact`
4. Redeploy after setting env vars.
5. Verify:
  - `https://<your-vercel-domain>/api/health`
  - Confirm response shows `"recipient":"info@devpert.com"`.

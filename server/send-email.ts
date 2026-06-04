"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  body: `
    margin:0;
    padding:0;
    background-color:#0b0b0b;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif;
  `,

  wrapper: `
    max-width:520px;
    margin:40px auto;
    padding:24px;
  `,

  card: `
    background-color:#ffffff;
    border-radius:12px;
    padding:32px;
    box-shadow:0 10px 30px rgba(0,0,0,0.15);
    text-align:left;
  `,

  logoWrap: `
    width:40px;
    height:40px;
    border-radius:8px;
    background-color:#0b0b0b;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:24px;
  `,

  logoText: `
    color:#ffffff;
    font-weight:700;
    font-size:16px;
    letter-spacing:-0.02em;
  `,

  heading: `
    font-size:22px;
    font-weight:600;
    color:#0f172a;
    margin:0 0 12px 0;
    line-height:1.4;
  `,

  paragraph: `
    font-size:15px;
    color:#475569;
    margin:0 0 24px 0;
    line-height:1.6;
  `,

  button: `
    display:inline-block;
    padding:12px 20px;
    background-color:#0b0b0b;
    color:#ffffff;
    text-decoration:none;
    border-radius:8px;
    font-size:14px;
    font-weight:500;
  `,

  divider: `
    height:1px;
    background-color:#e5e7eb;
    margin:32px 0;
  `,

  footerText: `
    font-size:13px;
    color:#64748b;
    line-height:1.6;
  `,

  footerMuted: `
    font-size:12px;
    color:#94a3b8;
    margin-top:16px;
  `,
};

export async function sendEmail({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link?: string;
  };
}) {
  const mailOptions = {
    from: `EliteWealth <${process.env.NODEMAILER_USER}>`,
    to,
    subject: `EliteWealth • ${subject}`,
    html: `
      <body style="${styles.body}">
        <div style="${styles.wrapper}">
          <div style="${styles.card}">
            
            <div style="${styles.logoWrap}">
              <span style="${styles.logoText}">EW</span>
            </div>

            <h1 style="${styles.heading}">
              ${subject}
            </h1>

            <p style="${styles.paragraph}">
              ${meta.description.replace(/\n/g, "<br /><br />")}
            </p>

            <a href="${meta.link}" style="${styles.button}">
              Verify your email
            </a>

            <div style="${styles.divider}"></div>

            <p style="${styles.footerText}">
              If you did not request this action, you can safely ignore this email.
              No changes will be made to your account.
            </p>

            <p style="${styles.footerMuted}">
              © ${new Date().getFullYear()} EliteWealth. All rights reserved.
            </p>

          </div>
        </div>
      </body>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}

export async function sendPasswordResetEmail({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link?: string;
  };
}) {
  const mailOptions = {
    from: `EliteWealth <${process.env.NODEMAILER_USER}>`,
    to,
    subject: `EliteWealth • ${subject}`,
    html: `
      <body style="${styles.body}">
        <div style="${styles.wrapper}">
          <div style="${styles.card}">
            
            <div style="${styles.logoWrap}">
              <span style="${styles.logoText}">EW</span>
            </div>

            <h1 style="${styles.heading}">
              ${subject}
            </h1>

            <p style="${styles.paragraph}">
              ${meta.description.replace(/\n/g, "<br /><br />")}
            </p>

            <a href="${meta.link}" style="${styles.button}">
              Reset Password
            </a>

            <div style="${styles.divider}"></div>

            <p style="${styles.footerText}">
              If you did not request this action, you can safely ignore this email.
              No changes will be made to your account.
            </p>

            <p style="${styles.footerMuted}">
              © ${new Date().getFullYear()} EliteWealth. All rights reserved.
            </p>

          </div>
        </div>
      </body>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}

export async function onPasswordResetEmail({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link?: string;
  };
}) {
  const mailOptions = {
    from: `EliteWealth <${process.env.NODEMAILER_USER}>`,
    to,
    subject: `EliteWealth • ${subject}`,
    html: `
      <body style="${styles.body}">
        <div style="${styles.wrapper}">
          <div style="${styles.card}">
            
            <div style="${styles.logoWrap}">
              <span style="${styles.logoText}">EW</span>
            </div>

            <h1 style="${styles.heading}">
              ${subject}
            </h1>

            <p style="${styles.paragraph}">
              ${meta.description.replace(/\n/g, "<br /><br />")}
            </p>

            <div style="${styles.divider}"></div>

            <p style="${styles.footerText}">
              If you did not request this action, you can safely ignore this email.
              No changes will be made to your account.
            </p>

            <p style="${styles.footerMuted}">
              © ${new Date().getFullYear()} EliteWealth. All rights reserved.
            </p>

          </div>
        </div>
      </body>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}
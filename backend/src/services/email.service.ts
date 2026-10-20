import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { FormSubmission } from '../models/form.model';

/**
 * Nodemailer transporter setup for Gmail SMTP
 */
export const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

/**
 * Verify transporter connection on startup or demand
 */
export async function verifyEmailTransporter(): Promise<boolean> {
  try {
    if (!config.email.user || !config.email.pass) {
      console.warn('⚠️ EMAIL_USER or EMAIL_PASS not configured in .env. Email sending will be skipped.');
      return false;
    }
    await emailTransporter.verify();
    console.log('📧 Nodemailer email transporter ready');
    return true;
  } catch (error) {
    console.error('❌ Nodemailer transporter verification failed:', error);
    return false;
  }
}

/**
 * Send notification email to the owner/admin when a contact form is submitted
 */
export async function sendContactNotification(submission: FormSubmission) {
  if (!config.email.user || !config.email.pass) {
    console.warn('Skipping notification email: email credentials missing');
    return;
  }

  const recipient = config.email.owner || config.email.user;
  const servicesList = submission.services && submission.services.length > 0
    ? submission.services.map((s) => `<span style="display:inline-block;padding:4px 10px;margin:2px;background:#eef2ff;border-radius:12px;font-size:12px;color:#3730a3;">${s}</span>`).join(' ')
    : '<em>None selected</em>';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
        📬 New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 140px; font-weight: bold;">Name:</td>
          <td style="padding: 8px 0; color: #111827;">${submission.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email:</td>
          <td style="padding: 8px 0; color: #111827;"><a href="mailto:${submission.email}">${submission.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Phone:</td>
          <td style="padding: 8px 0; color: #111827;">${submission.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Organization:</td>
          <td style="padding: 8px 0; color: #111827;">${submission.organization || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Services:</td>
          <td style="padding: 8px 0;">${servicesList}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 6px;">
        <p style="margin: 0 0 8px 0; color: #6b7280; font-weight: bold;">Message:</p>
        <p style="margin: 0; color: #1f2937; white-space: pre-wrap;">${submission.message || 'No message provided.'}</p>
      </div>

      <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
        Submitted at: ${new Date().toLocaleString()}
      </p>
    </div>
  `;

  const info = await emailTransporter.sendMail({
    from: `"Contact Form" <${config.email.user}>`,
    to: recipient,
    replyTo: submission.email,
    subject: `New Inquiry from ${submission.name}`,
    html: htmlContent,
  });
  console.log(`✅ Notification email sent to ${recipient} (Message ID: ${info.messageId})`);
  return info;
}

/**
 * Send an automated confirmation email to the user
 */
export async function sendUserConfirmation(submission: FormSubmission) {
  if (!config.email.user || !config.email.pass || !submission.email) {
    return;
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827;">Thank you for contacting us, ${submission.name}!</h2>
      <p style="color: #4b5563; line-height: 1.6; font-size: 15px;">
        We have received your request and our team will reach out to you soon.
      </p>
      <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 6px;">
        <h4 style="margin: 0 0 10px 0; color: #374151;">Summary of your request:</h4>
        <p style="margin: 4px 0; color: #6b7280;"><strong>Services:</strong> ${submission.services.join(', ') || 'General Inquiry'}</p>
        ${submission.message ? `<p style="margin: 4px 0; color: #6b7280;"><strong>Message:</strong> ${submission.message}</p>` : ''}
      </div>
      <p style="margin-top: 20px; color: #4b5563; font-size: 14px;">
        Best regards,<br/>Team
      </p>
    </div>
  `;

  const info = await emailTransporter.sendMail({
    from: `"Support Team" <${config.email.user}>`,
    to: submission.email,
    subject: `We got your request! Our team will reach out soon`,
    html: htmlContent,
  });
  console.log(`✅ Confirmation email sent to ${submission.email} (Message ID: ${info.messageId})`);
  return info;
}

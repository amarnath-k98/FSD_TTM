import nodemailer from "nodemailer";

export default function sendEmail({ to, subject, text }) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transport.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}

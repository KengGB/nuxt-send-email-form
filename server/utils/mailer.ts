import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

function getMailer() {
  if (!transporter) {
    const config = useRuntimeConfig()

    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: Number(config.smtpPort),
      secure: true,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      }
    })
  }

  return transporter
}

export async function sendMail(to: string, subject: string, html: string) {
  const config = useRuntimeConfig()
  const mailer = getMailer()

  return await mailer.sendMail({
    from: config.mailFrom,
    to,
    subject,
    html
  })
}

export interface MailBody {
  to: string
  subject: string
  html: string
}

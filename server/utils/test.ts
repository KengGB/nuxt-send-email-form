import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'username',
    pass: 'password'
  }
})

await transporter.sendMail({
  from: 'Ashby Hypnotherapy <name@email.com>',
  to: 'customer@email.com',
  subject: 'Test Email',
  html: 'Thank you for submiiting the form'
})

import { sendMail } from '../utils/mailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await sendMail(body.to, body.subject, body.html)

  return { success: true }
})

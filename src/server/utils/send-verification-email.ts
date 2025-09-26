import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendVerificationEmail = async (to: string, code: string) => {
  try {
    await transporter.sendMail({
      from: '"Союз Вестей" <no-reply@myapp.com>',
      to,
      subject: "Код подтверждения",
      text: `Ваш код подтверждения: ${code}`,
      html: `<p>Ваш код подтверждения: <b>${code}</b></p>`,
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}

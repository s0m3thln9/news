import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendResetPasswordEmail = async (to: string, code: string) => {
  try {
    await transporter.sendMail({
      from: '"Союз Вестей" <no-reply@myapp.com>',
      to,
      subject: "Код для сброса пароля",
      text: `Ваш код для сброса пароля: ${code}`,
      html: `<p>Ваш для сброса пароля: <b>${code}</b></p>`,
    })
  } catch (e) {
    console.error(e)
    throw e
  }
}

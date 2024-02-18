import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: '94waystodie@gmail.com',
    pass: 'nowb mxcn jodg vxqo',
  },
})

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    try {
        const mailOptions = {
            from: '94waystodie@gmail.com',
            to: email,
            subject: 'Verificación de correo electrónico',
            text: `Para verificar tu correo electrónico, haz clic en el siguiente enlace: http://localhost:1234/verify/${verificationToken}`, 
        }

        
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error al enviar el correo electrónico de verificación:', error)
        throw new Error('Error al enviar el correo electrónico de verificación')
    }
}
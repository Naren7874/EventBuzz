import nodemailer from 'nodemailer';

const sendMail = async (senderEmail , otp) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAIL_EMAIL,
            pass: process.env.NODEMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `"EventBuzz" <${process.env.NODEMAIL_EMAIL}>`, // sender address
        to: `${senderEmail}`, // list of receivers
        subject: "OTP for login in EventBuzz", // Subject line
        text: "Welcome to EventBuzz", // plain text body
        html: `<b>your OTP is ${otp}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

export default sendMail;

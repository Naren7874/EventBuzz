import generateOtp from '../utils/generateOtp.js';
import sendMail from "../utils/sendMail.js";
const sendOtp = async (req, res) => {

    const {email} = req.body;
    const generatedOtp = generateOtp()
    console.log("Generated OTP: ",generatedOtp);
    await sendMail(email, generatedOtp);
    res.json({message: 'OK' });
}

export default {sendOtp};

import generateOtp from '../utils/generateOtp.js';
import sendMail from "../utils/sendMail.js";
import {getEmailAndOtp, setEmailAndOtp} from '../redis/redisUtils.js'


const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;
        const generatedOtp = generateOtp()
        console.log("Generated OTP: ",generatedOtp);
        await sendMail(email, generatedOtp);
        await setEmailAndOtp(email, generatedOtp);
        res.json({message: 'OK' });
    }catch(error) {
        console.log("Error to send OTP: ",error);
        res.json({message: 'Error to send OTP ' , error});
    }
}

const validateOtp = async (req, res) => {
    try {
        const {email , givenOtp} = req.body;
        const redisData = await getEmailAndOtp(email);
        if(!redisData){
            throw {
                message: 'OTP expires',
                status: 400,
            }
        }

        else if(redisData.generatedOtp !== givenOtp){
            throw {
                message: 'wrong OTP',
                status: 400,
            }
        }

        else res.json({message: 'Correct OTP' , isVerify: true});

    }
    catch (error) {
        console.log(error);
        res.status(error.status || 500).json({message: error.message || 'Unknown error' , isVerify:false});
    }
}

export default {sendOtp , validateOtp};

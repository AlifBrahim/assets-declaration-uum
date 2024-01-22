// In your API route (e.g., pages/api/verifyCaptcha.js)
import axios from 'axios';

export default async function handler(req, res) {
    const { token } = req.body;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await axios.post(googleVerifyUrl);

    if (response.data.success) {
        // The CAPTCHA was successfully completed
        res.status(200).json({ success: true });
    } else {
        // The CAPTCHA failed verification
        res.status(400).json({ success: false, message: 'Invalid CAPTCHA' });
    }
}

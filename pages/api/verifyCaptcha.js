import axios from 'axios';

export default async function handler(req, res) {
    const { token } = req.body;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);

    try {
        const response = await axios.post(googleVerifyUrl, params.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        // Handle the response from Google's reCAPTCHA API
        if (response.data.success) {
            res.status(200).json({ success: true });
        } else {
            console.log("reCAPTCHA verification failed with error codes:", response.data['error-codes']);
            res.status(400).json({ success: false, message: 'Invalid CAPTCHA', errorCodes: response.data['error-codes'] });
        }
    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        res.status(500).json({ success: false, message: 'Error verifying reCAPTCHA', error: error.message });
    }
}

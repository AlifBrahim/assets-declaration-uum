// pages/api/verifyEmail.js
import { checkIfEmailAllowed } from '@/firebaseAdmin';

export default function handler(req, res) {
    const { email } = req.body;

    if (checkIfEmailAllowed(email)) {
        res.status(200).json({ message: "Email is allowed." });
    } else {
        res.status(403).json({ error: "Email not allowed" });
    }
}

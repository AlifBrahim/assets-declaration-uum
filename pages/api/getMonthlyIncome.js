// pages/api/getMonthlyIncome.js
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import connection from '@/db';
var serviceAccount = require("../../assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        // Add other Firebase Admin initialization options here if needed
    });
}

export default async (req, res) => {
    try {
        // Ensure the request has an Authorization header
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No authorization token provided' });
        }
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split('Bearer ')[1];

        // Verify the ID token using Firebase Admin SDK
        const decodedToken = await getAuth().verifyIdToken(token);
        const email = decodedToken.email;

        if (req.method === 'GET') {
            // Query the database for monthly income data using the user's email
            connection.query('SELECT * FROM MonthlyIncome WHERE email = ?', [email], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'An error occurred', error });
                }
                return res.status(200).json(results);
            });
        } else {
            // Only GET method is allowed
            return res.status(405).json({ message: 'Only GET requests are allowed' });
        }
    } catch (error) {
        // Handle any errors that occur during the token verification process
        console.error('Error verifying Firebase ID token:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

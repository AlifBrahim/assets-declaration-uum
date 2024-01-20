// pages/api/getAssetInformation.js
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import connection from "@/db";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    var serviceAccount = require("../../assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default async (req, res) => {
    if (req.method === 'GET') {
        try {
            // Ensure the request has an Authorization header
            if (!req.headers.authorization) {
                return res.status(401).json({ message: 'No authorization token provided' });
            }
            const token = req.headers.authorization.split('Bearer ')[1];

            // Verify the ID token using Firebase Admin SDK
            const decodedToken = await getAuth().verifyIdToken(token);
            const email = decodedToken.email;

            // Query the database for asset information using the user's email
            connection.query('SELECT * FROM AssetInformation WHERE email = ?', [email], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'An error occurred', error });
                }
                return res.status(200).json(results);
            });
        } catch (error) {
            // Handle any errors that occur during the token verification process
            console.error('Error verifying Firebase ID token:', error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(405).json({ message: 'Only GET requests are allowed' });
    }
};

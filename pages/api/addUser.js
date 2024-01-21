// pages/api/addUser.js
import { auth } from '/firebaseAdmin';
import connection from "@/db";

// API route handler
export default function handler(req, res) {
    console.log('Received request on /api/addUser');
    if (req.method !== 'POST') {
        console.log('Request method is not POST');
        res.status(405).end('Method Not Allowed');
        return;
    }

    if (!req.headers.authorization) {
        console.log('Authorization header is missing');
        res.status(401).end('No authorization token provided');
        return;
    }

    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) {
        console.log('Bearer token is null or undefined');
        res.status(401).end('The token is null or undefined.');
        return;
    }

    console.log('Verifying ID token');
    auth.verifyIdToken(token)
        .then(decodedToken => {
            const uid = decodedToken.uid;
            const email = decodedToken.email;
            console.log(`ID token verified for email: ${email}`);

            console.log('Executing SQL query to insert user');
            connection.query(
                'INSERT INTO users (id, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE email=VALUES(email)',
                [uid, email],
                (error, results, fields) => {
                    if (error) {
                        console.error('SQL query error:', error);
                        res.status(500).json({ message: 'Error inserting user into database', error });
                        return;
                    }
                    console.log('User inserted or already exists', results);
                    res.status(200).json({ message: 'User added or already exists', results });
                }
            );
        })
        .catch(error => {
            console.error('Error verifying Firebase ID token:', error);
            res.status(401).end('Unauthorized');
        });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
};

// pages/api/submitMonthlySalary.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import connection from '@/db';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    var serviceAccount = require("../../assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    console.log('Received request');
    if (req.method === 'POST') {
        console.log('Request method: POST');

        // Use multer to parse the form data
        upload.any()(req, res, async (err) => {
            if (err) {
                console.error('Error during form parsing:', err);
                return res.status(500).json({ message: 'An error occurred during form parsing', error: err });
            }

            // Verify the Firebase ID token
            if (!req.headers.authorization) {
                return res.status(401).json({ message: 'No authorization token provided' });
            }
            const token = req.headers.authorization;
            let email;
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                email = decodedToken.email;
            } catch (error) {
                console.error('Error verifying Firebase ID token:', error);
                return res.status(401).json({ message: 'Unauthorized' });
            }

            console.log('Form data:', req.body);
            console.log('Files:', req.files);

            const { category, keterangan, salary_jumlah } = req.body;
            const proof = req.files.find(file => file.fieldname === 'proof');

            let relativeFilePath;
            if (proof) {
                relativeFilePath = path.join('uploads', proof.originalname);
                const filePath = path.join(process.cwd(), 'public', relativeFilePath);
                fs.writeFileSync(filePath, fs.readFileSync(proof.path));
                fs.unlinkSync(proof.path); // Remove the file from the temporary directory
            } else {
                console.log('No file uploaded');
            }

            console.log('Inserting data into database');
            await new Promise((resolve, reject) => {
                connection.query('INSERT INTO MonthlyIncome (email, category, description, amount, proof) VALUES (?, ?, ?, ?, ?)', [email, category, keterangan, salary_jumlah, relativeFilePath], (error, results) => {
                    if (error) {
                        console.error('Database error:', error);
                        reject(error);
                    }
                    console.log('Data inserted successfully');
                    resolve(results);
                });
            }).catch((error) => {
                return res.status(500).json({ message: 'An error occurred', error });
            });

            return res.status(200).json({ message: 'Form submitted successfully' });
        });
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
};

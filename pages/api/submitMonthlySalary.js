// pages/api/submitMonthlySalary.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import connection from '@/db';
import axios from 'axios';
import FormData from 'form-data';


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    var serviceAccount = require("../../assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });


export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    console.log('Received request');
    if (req.method === 'POST') {
        let uploadedFilePath;

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
            if (proof) {
                try {
                    // Construct form data to send the file
                    const formData = new FormData();
                    formData.append('file', proof.buffer, proof.originalname);

                    // Send the file to your Ubuntu server
                    const response = await axios.post('http://146.190.102.198:3006/upload', formData, {
                        headers: {
                            ...formData.getHeaders(),
                        },
                    });

                    // Handle the response from your Ubuntu server here
                    if (response.status === 200) {
                        console.log('File uploaded successfully to remote server');
                        // Use the filename from the server response
                        uploadedFilePath = `http://146.190.102.198:3006/assets-declaration/uploads/${response.data.filePath}`;
                    } else {
                        throw new Error('Failed to upload file to remote server');
                    }
                } catch (error) {
                    console.error('Error uploading file to remote server:', error);
                    return res.status(500).json({ message: 'Error uploading file to remote server', error });
                }
            } else {
                console.log('No file uploaded');
            }


// Now, insert the uploadedFilePath into the database instead of the proof object
            console.log('Inserting data into database');
            await new Promise((resolve, reject) => {
                connection.query('INSERT INTO MonthlyIncome (email, category, description, amount, proof) VALUES (?, ?, ?, ?, ?)', [email, category, keterangan, salary_jumlah, uploadedFilePath], (error, results) => {
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
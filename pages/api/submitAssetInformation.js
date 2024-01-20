// pages/api/submitAssetInformation.js
import admin from 'firebase-admin';
import connection from '@/db';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    var serviceAccount = require("../../assets-declaration-uum-firebase-adminsdk-zvimy-ec0dce26fd.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Ensure the request has an Authorization header
            if (!req.headers.authorization) {
                return res.status(401).json({ message: 'No authorization token provided' });
            }
            const token = req.headers.authorization;

            // Verify the ID token using Firebase Admin SDK
            const decodedToken = await admin.auth().verifyIdToken(token);
            const email = decodedToken.email;

            // Extract asset information from the request body
            const {
                jenisHarta, pemilikHarta, keteranganHarta, alamatHarta, poskod,
                bandar, negeri, noSijilPendaftaran, tarikhPemilikan, jumlahKuantiti,
                ukuranKuantiti, nilaiPerolehanHarta, anggaranNilaiSemasa, keteranganLain,
                caraDiperolehi
            } = req.body;

            // Insert asset information into the database
            connection.query('INSERT INTO AssetInformation (email, jenisHarta, pemilikHarta, keteranganHarta, alamatHarta, poskod, bandar, negeri, noSijilPendaftaran, tarikhPemilikan, jumlahKuantiti, ukuranKuantiti, nilaiPerolehanHarta, anggaranNilaiSemasa, keteranganLain, caraDiperolehi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, jenisHarta, pemilikHarta, keteranganHarta, alamatHarta, poskod, bandar, negeri, noSijilPendaftaran, tarikhPemilikan, jumlahKuantiti, ukuranKuantiti, nilaiPerolehanHarta, anggaranNilaiSemasa, keteranganLain, caraDiperolehi], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'An error occurred', error });
                }
                return res.status(200).json({ message: 'Asset information submitted successfully' });
            });
        } catch (error) {
            // Handle any errors that occur during the token verification process
            console.error('Error verifying Firebase ID token:', error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
};

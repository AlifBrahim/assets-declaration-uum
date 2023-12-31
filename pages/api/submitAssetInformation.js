// pages/api/submitAssetInformation.js
import connection from '@/db'
import { getSession } from 'next-auth/react';


export default async (req, res) => {
    const session = await getSession({ req });
    const email = session.user.email;
    if (req.method === 'POST') {
        const { jenisHarta, pemilikHarta, keteranganHarta, alamatHarta, poskod, bandar, negeri, noSijilPendaftaran, tarikhPemilikan, jumlahKuantiti, ukuranKuantiti, nilaiPerolehanHarta, anggaranNilaiSemasa, keteranganLain, caraDiperolehi } = req.body;

        connection.query('INSERT INTO AssetInformation (email, jenisHarta, pemilikHarta, keteranganHarta, alamatHarta, poskod, bandar, negeri, noSijilPendaftaran, tarikhPemilikan, jumlahKuantiti, ukuranKuantiti, nilaiPerolehanHarta, anggaranNilaiSemasa, keteranganLain, caraDiperolehi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, jenisHarta, pemilikHarta, keteranganHarta, alamatHarta, poskod, bandar, negeri, noSijilPendaftaran, tarikhPemilikan, jumlahKuantiti, ukuranKuantiti, nilaiPerolehanHarta, anggaranNilaiSemasa, keteranganLain, caraDiperolehi], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'An error occurred', error });
            }
            return res.status(200).json({ message: 'Form submitted successfully' });
        });
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
};

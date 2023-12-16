import { getSession } from 'next-auth/react';
import connection from '@/db';

export default async (req, res) => {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        const email = session.user.email;
        console.log(email);

        connection.query('SELECT * FROM AssetInformation WHERE email = ?', [email], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'An error occurred', error });
            }
            return res.status(200).json(results);
        });
    } else {
        res.status(405).json({ message: 'Only GET requests are allowed' });
    }
};

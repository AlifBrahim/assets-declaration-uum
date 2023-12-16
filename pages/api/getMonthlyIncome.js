// pages/api/getMonthlyIncome.js
import connection from '@/db'
import { getSession } from 'next-auth/react';


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const session = await getSession({ req });
    const email = session.user.email;
    if (req.method === 'GET') {
        connection.query('SELECT * FROM MonthlyIncome WHERE email = ?', [email], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'An error occurred', error });
            }
            return res.status(200).json(results);
        });
    } else {
        res.status(405).json({ message: 'Only GET requests are allowed' });
    }
};

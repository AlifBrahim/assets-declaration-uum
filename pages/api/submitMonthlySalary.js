// pages/api/submitMonthlySalary.js
import connection from '@/db'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method === 'POST') {
        const { category, keterangan, salary_jumlah } = req.body;

        connection.query('INSERT INTO MonthlyIncome (category, description, amount) VALUES (?, ?, ?)', [category, keterangan, salary_jumlah], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'An error occurred', error });
            }
            return res.status(200).json({ message: 'Form submitted successfully' });
        });
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
};
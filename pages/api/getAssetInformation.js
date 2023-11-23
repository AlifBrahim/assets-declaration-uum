// pages/api/getAssetInformation.js
import connection from '@/db'

export default async (req, res) => {
    if (req.method === 'GET') {
        connection.query('SELECT * FROM AssetInformation', (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'An error occurred', error });
            }
            return res.status(200).json(results);
        });
    } else {
        res.status(405).json({ message: 'Only GET requests are allowed' });
    }
};

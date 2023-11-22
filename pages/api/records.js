// pages/api/records.js
import db from 'components/db'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const newRecord = req.body
            const result = await db.create('perisytiharan_harta', newRecord)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else if (req.method === 'GET') {
        try {
            const records = await db.readAll('perisytiharan_harta')
            res.status(200).json(records)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}

// pages/api/submitMonthlySalary.js
import connection from '@/db'
import fs from 'fs'
import path from 'path'
import { IncomingForm } from 'formidable'

export default async (req, res) => {
    if (req.method === 'POST') {
        const form = new IncomingForm();
        await form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error parsing form: ', err);
                return res.status(500).json({message: 'An error occurred', err});
            }

            console.log('Fields: ', fields);
            console.log('Files: ', files);

            const {category, keterangan, salary_jumlah} = fields;
            const proof = files.proof;

            if (!proof) {
                console.error('No file was uploaded');
                return res.status(400).json({message: 'No file was uploaded'});
            }
            console.log('Proof originalFilename: ', proof.originalFilename);

            if (!proof.originalFilename) {
                console.error('Uploaded file does not have a name');
                return res.status(400).json({message: 'Uploaded file does not have a name'});
            }


            // Save the file to the server
            const filePath = path.join('C:\\Users\\DELL\\WebstormProjects\\assets-declaration-uum\\uploads', proof.originalFilename)
            fs.writeFileSync(filePath, fs.readFileSync(proof.path))


            connection.query('INSERT INTO MonthlyIncome (category, description, amount, proof) VALUES (?, ?, ?, ?)', [category, keterangan, salary_jumlah, filePath], (error, results) => {
                if (error) {
                    console.error('Error executing query: ', error);
                    return res.status(500).json({message: 'An error occurred', error});
                }
                console.log('Query results: ', results);
                return res.status(200).json({message: 'Form submitted successfully'});
            });
        });
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};

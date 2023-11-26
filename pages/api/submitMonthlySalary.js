import connection from '@/db'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

// Configure multer
const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    console.log('Received request');
    if (req.method === 'POST') {
        console.log('Request method: POST')

        // Use multer to parse the form data
        upload.any()(req, res, async (err) => {
            if (err) {
                console.error('Error during form parsing:', err);
                return res.status(500).json({message: 'An error occurred during form parsing', error: err});
            }

            console.log('Form data:', req.body);
            console.log('Files:', req.files);

            const {category, keterangan, salary_jumlah} = req.body;
            const proof = req.files.find(file => file.fieldname === 'proof');

            // Save the file to the server
            const filePath = path.join('C:\\Users\\DELL\\WebstormProjects\\assets-declaration-uum\\uploads', proof.originalname)
            fs.writeFileSync(filePath, fs.readFileSync(proof.path))

            console.log('Inserting data into database');
            await new Promise((resolve, reject) => {
                connection.query('INSERT INTO MonthlyIncome (category, description, amount, proof) VALUES (?, ?, ?, ?)', [category, keterangan, salary_jumlah, filePath], (error, results) => {
                    if (error) {
                        console.error('Database error:', error);
                        reject(error);
                    }
                    console.log('Data inserted successfully');
                    resolve(results);
                });
            }).catch((error) => {
                return res.status(500).json({message: 'An error occurred', error});
            });

            return res.status(200).json({message: 'Form submitted successfully'});
        });
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
};

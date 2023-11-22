// db.js
import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'uumevents-do-user-14295301-0.b.db.ondigitalocean.com',
    port: 25060,
    user: 'doadmin',
    password: 'AVNS_7KPMC3xu3yCp_jz_WfT',
    database: 'assets_declaration_uum'
})
connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database: ', error)
        return
    }
    console.log('Connected to the database')
})
const db = {
    create: (table, record) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${table} SET ?`
            connection.query(query, record, (error, results) => {
                if (error) reject(error)
                else resolve(results)
            })
        })
    },
    readAll: (table) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${table}`
            connection.query(query, (error, results) => {
                if (error) reject(error)
                else resolve(results)
            })
        })
    },
    update: (table, id, record) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${table} SET ? WHERE id = ?`
            connection.query(query, [record, id], (error, results) => {
                if (error) reject(error)
                else resolve(results)
            })
        })
    },
    delete: (table, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${table} WHERE id = ?`
            connection.query(query, id, (error, results) => {
                if (error) reject(error)
                else resolve(results)
            })
        })
    }
}

export default db
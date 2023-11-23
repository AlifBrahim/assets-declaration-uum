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

// export db connection
export default connection
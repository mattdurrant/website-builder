const mysql     = require('mysql2/promise')
const config    = require('./config.json')

async function getLatestEvents() {
    const connection = await mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    })

    let results = await connection.query('SELECT * FROM `homepage`.`events` ORDER BY timestamp DESC LIMIT 10')
    return results[0]
}

module.exports = {
    getLatestEvents
}

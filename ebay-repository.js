const mysql     = require('mysql2/promise')
const config    = require('./config.json')

async function loadItems() {
    try {
        const connection = await mysql.createConnection({
            host: config.mysql.host,
            port: config.mysql.port,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database    
        })

        let sql = `SELECT * FROM homepage.ebay`

        let results = await connection.query(sql)
        
        let items = []
        for (let i = 0; i <results[0].length; i++) {
            let itemJson = results[0][i].item
            items.push(itemJson)
        }

        return items
    }
    catch (exception) {
        console.log(exception)
    }
}

module.exports = {
    loadItems
}
const mysql     = require('mysql2/promise')
const config    = require('./config.json')

async function loadAlbums(year = null) {
    try {
        const connection = await mysql.createConnection({
            host: config.mysql.host,
            port: config.mysql.port,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database    
        })

        let sql = `SELECT * FROM homepage.albums ORDER BY percentage DESC LIMIT 200`

        if (year !== null)
            sql = `SELECT * FROM homepage.albums WHERE albums.year = '${year}' ORDER BY percentage DESC LIMIT 50`

        let results = await connection.query(sql)
        
        let albums = []
        for (let i = 0; i <results[0].length; i++) {
            let albumJson = results[0][i].album
            albums.push(albumJson)
        }

        return albums
    }
    catch (exception) {
        console.log(exception)
    }
}

module.exports = {
    loadAlbums
}
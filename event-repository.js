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

    let results = await connection.query('SELECT * FROM `homepage`.`events` ORDER BY timestamp DESC LIMIT 20')
    return results[0]
}

async function getLatestRuns() {
    const connection = await mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    })

    let results = await connection.query("SELECT * FROM `homepage`.`events` WHERE type_ind = 'strava' AND timestamp > '2020-01-01 00:00:00' ORDER BY timestamp DESC")
    return results[0]
}

async function getLatestBookReviews() {
    const connection = await mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    })

    let results = await connection.query("SELECT * FROM `homepage`.`events` WHERE type_ind = 'goodreads' ORDER BY timestamp DESC")
    return results[0]
}

async function getLatestPhonePics() {
    const connection = await mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    })

    let results = await connection.query("SELECT * FROM `homepage`.`events` WHERE type_ind = 'imgurPhotos' AND timestamp > '2020-07-01 00:00:00' ORDER BY timestamp DESC")
    return results[0]
}

async function getLatestYouTubeVideos() {
    const connection = await mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    })

    let results = await connection.query("SELECT * FROM `homepage`.`events` WHERE type_ind = 'youtube' AND timestamp > '2020-09-01 00:00:00' ORDER BY timestamp DESC")
    return results[0]
}

async function getLatestDropboxTracks() {
    const connection = await mysql.createConnection({
        host: config.mysql.host,
        port: config.mysql.port,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    })

    let results = await connection.query("SELECT * FROM `homepage`.`events` WHERE type_ind = 'dropbox' ORDER BY timestamp DESC")
    return results[0]
}

module.exports = {
    getLatestEvents,
    getLatestRuns,
    getLatestBookReviews,
    getLatestPhonePics,
    getLatestYouTubeVideos,
    getLatestDropboxTracks
}
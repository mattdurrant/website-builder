
const ftp       = require('basic-ftp')
const fs        = require('fs') 
const ora       = require('ora')
const config    = require('./config.json')
const retry     = require('async-retry')
 
async function upload(fileName, filePath) {
    let retries = 1

    await retry(async bail => {
        const client = new ftp.Client()
        
        try {
            await client.access({
                host: config.website.ftp.host,
                user: config.website.ftp.username,
                password: config.website.ftp.password,
            })
            await client.cd(`public_html`)
            spinner = ora(`Uploading ${fileName} via FTP (Attempt ${retries}).`).start()
            await client.upload(fs.createReadStream(filePath), fileName)
            spinner.succeed(`${fileName} uploaded.`)
        } catch (exception) {
            spinner.fail(`${fileName} failed to upload (Attempt ${retries}).`)
            retries++
            throw exception
        } finally {
            client.close()
        }
      }, {
        retries: 10
      })    
}



async function uploadStylesheet() {
    const client = new ftp.Client()
    try {
        await client.access({
            host: config.website.ftp.host,
            user: config.website.ftp.username,
            password: config.website.ftp.password,
        })
        await client.cd(`public_html`)
        
        spinner = ora(`Uploading stylesheet via FTP.`).start()
        await client.upload(fs.createReadStream("styles.css"), "styles.css")
        spinner.succeed(`styles.css uploaded.`)
    }
    catch(ex) {
        spinner.fail(`Stylesheet failed to upload.`)
    }   
    
    client.close()
}


module.exports = {
    upload,
    uploadStylesheet
}

const ftp       = require('basic-ftp')
const fs        = require('fs') 
const ora       = require('ora')
const config    = require('./config.json')
const retry     = require('async-retry')
 
async function upload(filePath) {
    let retries = 1

    try {
        await retry(async bail => {
            const client = new ftp.Client()
            
            let path = filePath.split('/')
            let fileName = path[path.length - 1]
            
            try {
                await client.access({
                    host: config.website.ftp.host,
                    user: config.website.ftp.username,
                    password: config.website.ftp.password,
                })
                
                await client.cd(`public_html`)

                for (let i = 0; i < path.length - 1; i++) {
                    await client.cd(path[i])
                }

                spinner = ora(`Uploading ${fileName} (Attempt ${retries}).`).start()
                await client.upload(fs.createReadStream(`generated-site/${filePath}`), fileName)
                spinner.succeed(`${fileName} uploaded (Attempt ${retries}).`)
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
    catch {
        return
    }
}

module.exports = {
    upload
}
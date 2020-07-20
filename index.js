const uploader    = require('./uploader.js')
const output      = require('./output.js')
const config      = require('./config.json')

; (async () => {
  await start();
})()

async function start() {
  // getLatestEvents()
  // write the output
  
  let htmlFile = await output.writeToHtml()
  
  uploader.upload(config.filename, htmlFile)
}

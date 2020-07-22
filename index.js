const uploader        = require('./uploader.js')
const output          = require('./output.js')
const config          = require('./config.json')
const eventRepository = require('./event-repository.js')

; (async () => {
  await start();
})()

async function start() {
  let latestEvents = await eventRepository.getLatestEvents()
  let htmlFile = await output.writeToHtml(latestEvents)
  await uploader.upload(config.filename, htmlFile)
  process.exit()
}

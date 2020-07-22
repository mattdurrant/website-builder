const fs        = require('fs').promises;
const cheerio   = require('cheerio')
const moment    = require('moment')

async function writeToHtml(latestEvents) {
    let eventsHtml = ''

    for (i = 0; i < latestEvents.length; i++) {
        eventsHtml += `<i> ${(moment(latestEvents[i].timestamp)).format('llll')} </i> - ${latestEvents[i].details} </br>`
    }
       
    let html = await buildHtml(eventsHtml)
    let filename = 'output.html'
    fs.writeFile(filename, html)
    return filename
}

async function buildHtml(eventsHtml) {
    const html = await fs.readFile("template.html", "binary");
    const $ = cheerio.load(html)  
    $('.contentGoesHere').replaceWith(eventsHtml)
    $('.renderedDataGoesHere').replaceWith(`Rendered: ${moment().format('llll')}`)
    return $.html()
}

module.exports = {
    writeToHtml
}

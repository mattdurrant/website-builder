const fs        = require('fs').promises;
const cheerio   = require('cheerio')
const moment    = require('moment')

async function writeToHtml(latestEvents) {
    let eventsHtml = "<table>"
    let lastDate = ''
    
    for (i = 0; i < latestEvents.length; i++) {
        let date = moment(latestEvents[i].timestamp)
        if (lastDate != date.startOf('date').toString()) {
            lastDate = date.startOf('date').toString()
            eventsHtml += `<tr><td class="date"><date>${date.format('DD/MM/YY')}</date></td>` 
        }
        else {
            eventsHtml += `<tr><td class="date"></td>` 
        }

        eventsHtml += `<td class="time"><time class="noWrap"> ${(moment(latestEvents[i].timestamp)).format('hh:mm a')} </time></td><td>${unescape(latestEvents[i].details)}</td></tr>`
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
    $('.renderedDataGoesHere').replaceWith(`${moment().format('DD/MM/YY hh:mm a')}`)
    return $.html()
}

module.exports = {
    writeToHtml
}

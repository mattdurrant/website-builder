const fs        = require('fs').promises;
const cheerio   = require('cheerio')
const moment    = require('moment')

async function generate(filename, latestEvents) {
    let eventsHtml = "<table>"
    let lastDate = ''
    
    for (i = 0; i < latestEvents.length; i++) {
        let date = moment(latestEvents[i].timestamp)
        if (lastDate != date.startOf('date').toString() && latestEvents[i].pinned === 0) {
            lastDate = date.startOf('date').toString()
            eventsHtml += `<tr><td class="date"><date>${date.format('DD/MM/YY')}</date></td>` 
        }
        else {
            eventsHtml += `<tr><td class="date"></td>` 
        }

        if (latestEvents[i].pinned === 1) {
            eventsHtml += `<td class="time"><time class="noWrap"></time></td><td><img class="gold-medal"> ${unescape(latestEvents[i].details)}</td></tr>`
        } else {
            eventsHtml += `<td class="time"><time class="noWrap"> ${(moment(latestEvents[i].timestamp)).format('hh:mm a')} </time></td><td>${unescape(latestEvents[i].details)}</td></tr>`
        }
    }
       
    let html = await buildHtml(eventsHtml)
    let filepath = `generated-site/${filename}`
    fs.writeFile(filepath, html)
    return filepath
}

async function buildHtml(eventsHtml) {
    const html = await fs.readFile("template.html", "binary");
    const $ = cheerio.load(html)  
    $('.stylesheetGoesHere').replaceWith('')
    $('.contentGoesHere').replaceWith(eventsHtml)
    $('.renderedDateGoesHere').replaceWith(`${moment().format('DD/MM/YY hh:mm a')}`)
    return $.html()
}

module.exports = {
    generate
}

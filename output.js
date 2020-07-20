const fs        = require('fs').promises;
const cheerio   = require('cheerio')
const moment    = require('moment')

async function writeToHtml() {
    let html = await buildHtml()
   
    let filename = 'output.html'
    fs.writeFile(filename, html)

    return filename
}

async function buildHtml() {
    const html = await fs.readFile("template.html", "binary");
     
    const $ = cheerio.load(html)
   
    $('.contentGoesHere').replaceWith('<p> Rendered at ' + moment.utc().toISOString() + '.</p>')
    console.log($.html())
   
    return $.html()
}

module.exports = {
    writeToHtml
}

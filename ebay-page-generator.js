const fs        = require('fs').promises;
const moment    = require('moment')
const cheerio   = require('cheerio')

async function generate(filename, items) {
    let albumsHtml = `<table id="results"><tr><th></th><th>Title</th><th>Price</th><th class="endTimeColumn">Ending</th></tr>`

    items = items.sort(
        function(a, b) {
          return a.totalPrice - b.totalPrice
        })

    for (let i = 0; i < items.length; i++) {
        albumsHtml += `<tr>`
        albumsHtml += `<td class="cover"><img src="${items[i].imageUrl}"></td>`
        albumsHtml += `<td class="title"><a href="${items[i].url}">${items[i].album} - ${items[i].artist}</a><br />`
        albumsHtml += `${items[i].title}`
        if (items[i].subtitle !== null)
            albumsHtml += `${items[i].subtitle}<br />`
        albumsHtml += `${items[i].listingType == 'StoreInventory' || items[i].listingType == 'FixedPrice' ? '<div class="buyItNow">Buy It Now</div>' : '<div class="auction">Auction</div>' }`
        albumsHtml += `</td>`
        albumsHtml += `<td class="price">&pound;${items[i].totalPrice}</td>`
        albumsHtml += `<td class="endTime">${items[i].endTime === null ? 'No end date' :  items[i].endTime}</td>`
        albumsHtml += `</tr>`
    }
    albumsHtml += `</table>`

    let html = await buildHtml(albumsHtml)
    let filepath = `generated-site/${filename}`
    fs.writeFile(filepath, html)
}

async function buildHtml(albumsHtml) {
    const html = await fs.readFile("template.html", "binary");
    const $ = cheerio.load(html)  
    $('head').append(`
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script>
    function setEndTimes() { 
        var endTimes = document.getElementsByClassName("endTime"); 
        for (i = 0; i < endTimes.length; i++) { 
            endTimes[i].innerHTML = 'Ends ' + moment(endTimes[i].innerHTML).fromNow() + '.'; 
        } 
    }        
    window.onload = setEndTimes;
    </script>`)
    $('.stylesheetGoesHere').replaceWith('<link rel="stylesheet" type="text/css" href="/vinyl.css">')
    $('.contentGoesHere').replaceWith(albumsHtml)
    $('.renderedDateGoesHere').replaceWith(`${moment().format('DD/MM/YY hh:mm a')}`)
    return $.html()
}

module.exports = {
  generate
}
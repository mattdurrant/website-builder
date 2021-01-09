const fs        = require('fs').promises;
const moment    = require('moment')
const cheerio   = require('cheerio')

async function generate(filename, albums, year = null) {
    let albumsHtml = ``

    if (year === null) {
        albumsHtml += `<h1>${albums.length} Favourite Albums</h1>`
    } else {
        albumsHtml += `<h1>${albums.length} Favourite Albums of ${year}</h1>`
    }

    albumsHtml += `<p>My favourite albums as determined by my Spotify account <a href="https://github.com/mattdurrant/spotify-favourite-albums">(source code)</a>.</p>`
    if (year === null) {
      albumsHtml += `<p><a href="./albums">All Time</a>`
    } else {
      albumsHtml += `<p><a href="../albums">All Time</a>`
    }

    for (let y = 2021; y >= 2000; y--) {
        if (year === null) {
          albumsHtml += ` || <a href="./albums/${y}">${y}</a>`
        } else {
          albumsHtml += ` || <a href="./${y}">${y}</a>`
        }
    }

    let playlistId = await getPlaylistId(year)   
    if (playlistId != null) {
        albumsHtml += `<iframe src="https://open.spotify.com/embed/playlist/${playlistId}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
    }

    albumsHtml += `</p><table><tr><th>Rank</th><th>Album</th><th>Tracks</th></tr><tbody>`
    
    for (let i = 0; i < albums.length; i++) {
        albumsHtml += `<tr><td><div class="rank">${i + 1}.</div><div class="score">${Math.round(albums[i].percentage)}%</div>`
        albumsHtml += `<td><a href="${albums[i].albumUrl}">${albums[i].albumName}</a><br>${albums[i].artistName}<br>${albums[i].albumYear}<br><a href="${albums[i].albumUrl}"><img width="100%" src="${albums[i].albumArtUrl}"></img></a></td>`
        albumsHtml += `<td>`

        for (let trackStatus of albums[i].tracksStatus)
        {
            if (trackStatus.score == 1) {
                albumsHtml += `<a href="${trackStatus.href}">${trackStatus.track}. ${trackStatus.name}<img class="gold-medal"></br>`
            } 
            else if (trackStatus.score >= 0.75) {
                albumsHtml += `<a href="${trackStatus.href}">${trackStatus.track}. ${trackStatus.name}<img class="silver-medal"></br>`
            }
            else if (trackStatus.score >= 0.5) {
                albumsHtml += `<a href="${trackStatus.href}">${trackStatus.track}. ${trackStatus.name}<img class="bronze-medal"></br>`
            }
            else if (trackStatus.score >= 0.0) {
                albumsHtml += `<a style="color: LightGrey;" href="${trackStatus.href}">${trackStatus.track}. ${trackStatus.name}</br>`
            }           
        }
        
        albumsHtml += `</td></tr>`
    }
    albumsHtml += `</tbody></table></div></div>`

    let html = await buildHtml(albumsHtml)

    let filepath = `generated-site/${filename}`
    fs.writeFile(filepath, html)
}

async function buildHtml(albumsHtml) {
    const html = await fs.readFile("template.html", "binary");
    const $ = cheerio.load(html)  
    $('.stylesheetGoesHere').replaceWith('<link rel="stylesheet" type="text/css" href="/albums.css">')
    $('.contentGoesHere').replaceWith(albumsHtml)
    $('.renderedDateGoesHere').replaceWith(`${moment().format('DD/MM/YY hh:mm a')}`)
    return $.html()
}

async function getPlaylistId(year) {
    switch (year) {
      case (2004):
        return '7s3N90tJmUoJFSmtoJTnrr'
      case (2005):
        return '7zi88II6MYyJSjmpSOptyj'
      case (2006):
        return '5QDxtZb50DBbSbQ4Un8715'
      case (2007):
        return '0ryLtf0WdGPu9CUyMeXZav'
      case (2008):
        return '6y9mb5tubxhSGcHRsX8cZC'
      case (2009):
        return '2S1zz3TCWfXp1p5wUXpwM6'
      case (2010):
        return '2C4GhJXpiE34lqoqS58BgG'
      case (2011):
        return '0kpRLT9H47jMFObGnfJSeO'
      case (2012):
        return '33ITE4NqI7BWYSMqkqecoU'
      case (2013):
        return '2IrkfqzuVlYNUqQsNhd5dw'
      case (2014):
        return '1mmQw1jM53Gn0S86OIkFLf'
      case (2015):
        return '4mY1RXi5GYYpKI71crScD7'
      case (2016):
        return '1gapnZTdVTICFHFi2uR4aI'
      case (2017):
        return '6uGAZ1PPWI447y6S9wQqMf'
      case (2018):
        return '6pWjuaR76tIu6v872F55jG'
      case (2019):
        return '4eSeDm1JZLRz3LzTMIhuf4' 
      case (2020):
        return '4z9lCm8YGpqgTQPG4kV9bl'
      case (2021):
        return '1ALDWU2KkUqdoRMayO2OJW'
    }
  
    return null
  }

module.exports = {
  generate
}

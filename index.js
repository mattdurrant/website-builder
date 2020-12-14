const albumPageGenerator  = require('./album-page-generator.js')
const albumRepository     = require('./album-repository.js')
const eventPageGenerator  = require('./event-page-generator.js')
const eventRepository     = require('./event-repository.js')
const uploader            = require('./uploader.js')

;(async () => {
  await start();
})()

async function start() {
  try {
    let albums = await albumRepository.loadAlbums()
    await albumPageGenerator.generate('albums.html', albums)
    await uploader.upload(`albums.html`)

    for (let year = 2000; year <= 2020; year++) {
      let albums = await albumRepository.loadAlbums(year)
      albumPageGenerator.generate(`albums/${year}.html`, albums, year)
      await uploader.upload(`albums/${year}.html`)
    }

    let latestEvents = await eventRepository.getLatestEvents()
    await eventPageGenerator.generate('index.html', latestEvents)
    await uploader.upload('index.html')

    let latestRuns = await eventRepository.getLatestRuns()
    await eventPageGenerator.generate('runaround.html', latestRuns)
    await uploader.upload('runaround.html')

    let bookReviews = await eventRepository.getLatestBookReviews()
    await eventPageGenerator.generate('bookReviews.html', bookReviews)
    await uploader.upload('bookReviews.html')

    let phonePics = await eventRepository.getLatestPhonePics()
    await eventPageGenerator.generate('phonePics.html', phonePics)
    await uploader.upload('phonePics.html')

    let youtubeVideos = await eventRepository.getLatestYouTubeVideos()
    await eventPageGenerator.generate('phoneVideos.html', youtubeVideos)
    await uploader.upload('phoneVideos.html')

    let dropboxTracks = await eventRepository.getLatestDropboxTracks()
    await eventPageGenerator.generate('runaround.html', dropboxTracks)
    await uploader.upload('tracks.html')
   
    await uploader.uploadStylesheet()
    await uploader.uploadAlbumStylesheet()
  }
  catch (ex) {
    console.log(ex)
  }
  finally {
    process.exit()
  }
}
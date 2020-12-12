const uploader        = require('./uploader.js')
const output          = require('./output.js')
const eventRepository = require('./event-repository.js')

;(async () => {
  await start();
})()

async function start() {
  try {
    let latestEvents = await eventRepository.getLatestEvents()
    let indexPage = await output.writeToHtml(latestEvents)
    await uploader.upload("index.html", indexPage)

    let latestRuns = await eventRepository.getLatestRuns()
    let runaroundPage = await output.writeToHtml(latestRuns)
    await uploader.upload("runaround.html", runaroundPage)

    let bookReviews = await eventRepository.getLatestBookReviews()
    let bookReviewsPage = await output.writeToHtml(bookReviews)
    await uploader.upload("bookReviews.html", bookReviewsPage)

    let phonePics = await eventRepository.getLatestPhonePics()
    let phonePicsPage = await output.writeToHtml(phonePics)
    await uploader.upload("phonePics.html", phonePicsPage)

    let youtubeVideos = await eventRepository.getLatestYouTubeVideos()
    let youtubeVideosPage = await output.writeToHtml(youtubeVideos)
    await uploader.upload("phoneVideos.html", youtubeVideosPage)

    let dropboxTracks = await eventRepository.getLatestDropboxTracks()
    let dropboxTracksPage = await output.writeToHtml(dropboxTracks)
    await uploader.upload("tracks.html", dropboxTracksPage)

    await uploader.uploadStylesheet()
  }
  catch (ex) {
    console.log(ex)
  }
  finally {
    process.exit()
  }
}

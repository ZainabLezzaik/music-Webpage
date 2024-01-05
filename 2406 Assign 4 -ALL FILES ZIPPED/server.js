//Zainab Lezzaik
//101263105


const express = require('express') //express framework
const http = require('http')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT
const app = express()

//middleware
app.use(express.static(__dirname + '/public')) //static server
//routes
const validRoutes = ['/mytunes.html', '/mytunes', '/index.html', '/'];
app.get(validRoutes, (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

//code I used from tutorial 7
app.get('/songs', (request, response) => {
  let song = request.query.title
  if(!song) {
    response.json({message: 'Please enter a song title here : '})
    return
  }
  const titleWithPlusSigns = song.replaceAll(" ", "+");
  const options = {
    "method": "GET",
    "hostname": "itunes.apple.com",
    "port": null,
    "path": `/search?term=${titleWithPlusSigns}&entity=musicTrack&limit=20`,
    "headers": {
      "useQueryString": true
    }
  }
  //creating the actual http request and setting up its handlers
  http.request(options, function(apiResponse) {
    let songData = ''
    apiResponse.on('data', function(chunk) {
      songData += chunk
    })
    apiResponse.on('end', function() {
      response.contentType('application/json').json(JSON.parse(songData))
    })
  }).end() //important to end the request
          //to actually send the message
})
//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server Running on Port ${PORT}  CNTL-C to quit`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/mytunes.html`)
    console.log(`http://localhost:3000/mytunes`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000`)
  }
})

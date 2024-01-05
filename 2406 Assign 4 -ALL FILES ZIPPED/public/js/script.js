//Zainab Lezzaik 
//101263105

let playlistSize = 0; //this stores the size of the playlist, aka how many rows in it
//an event listener for when the window loads, to initialize the playlist
window.addEventListener('load', () => { //this loads the playlist when the window loads
  //it also loads the songs that are already in the playlist
  let firstTime = true; //this will only check if it's being run for the 1st time
  //this checks if there are items in the localStorage
  if (localStorage.length > 0) { //this checks if there are items in the localStorage
    const playlistDiv = document.getElementById('playlist'); //get the playlistDiv element by its id
    //this sets the initial content of the playlistDiv
    playlistDiv.innerHTML = '<h1>Playlist</h1>'; //with a heading
    //this updates the playlistSize based 
    playlistSize = localStorage.length; //on the number of items in localStorage
    createTable('playlist'); //create the playlist table
    for (let i = 0; i < localStorage.length; i++) { //loop through localStorage to retrieve and display stored songs
      sData = JSON.parse(localStorage.getItem(`song${i}`)); //this retrieve song data from localStorage and parse it from JSON
      if (sData != null) { //this checks if the localStorage.getItem returns
        addRow(sData, 'playlist');
        // if it returns something
        firstTime = false; //then that means it's the same run
      }
    }
    if (firstTime) { //incase its a first time being runned
      //if it is the first run, clear the content in the playlistDiv
      playlistDiv.innerHTML = ''; //it gets rid of the content in the playlistDiv
      localStorage.clear(); //and then clear the local storage for a new run
    }
  }
})

//GOT THE CODE FROM TUTORIAL 7
function getSong() { //this will interact with the server to search for a song
  let songTitle = document.getElementById('song').value //the user have to type a song title in the field
  if(songTitle === '') { //incase the user did not type anything but still pressed enter
    return alert('Please enter a song to proceed') //then return an alert informing them to enter a songtitle
  }
  //this also creates and loads search results table
  let songDiv = document.getElementById('search-results')
  songDiv.innerHTML = ''

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      songDiv.innerHTML = `<h1>Songs matching: ${songTitle} </h1>`
      createTable('search-results'); //creates the search table results
      //this loads the search results
      loadResultsToTable(response, 'search-results'); //to table using API JSON response data
    }
  }
  xhr.open('GET', `/songs?title=${songTitle}`, true)
  xhr.send()
}

//this allows the user to "click" Submit button using the Enter key
const ENTER = 13
function handleKeyUp(event) {
  event.preventDefault()
  if (event.keyCode === ENTER) {
    document.getElementById("submit_button").click()
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit_button').addEventListener('click', getSong)
  //this adds a key handler for the document as a whole, 
  document.addEventListener('keyup', handleKeyUp) //not separate elements
})

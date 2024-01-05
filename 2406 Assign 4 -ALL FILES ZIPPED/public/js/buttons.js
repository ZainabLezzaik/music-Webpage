//Zainab Lezzaik 
//101263105

function addToThePlaylist() {//this function is to handle when we wanna add a song to the playlsit
    //this creates a playlist table 
    //it check if the playlist table does not exist yet
    if (document.getElementById('playlist-table') == null) { //if it doesn't exist yet
      //if it doesn't exist, set the initial content of the playlistDiv with a heading
      document.getElementById('playlist').innerHTML = '<h1>Playlist</h1>'; //html tags
      //call the createTable function to create the playlist table
      createTable('playlist'); //call the createTable function
      //to ensure a clean start 
      localStorage.clear(); //clear the localStorage
    }
    const sData = getsDataFromRow(this); //retrieve song data from the current row using the getsDataFromRow function
    addRow(sData, 'playlist');//this will add a row to the playlist table in html
    //this will convert the data to a string
    localStorage.setItem(`song${playlistSize}`, JSON.stringify(sData)); //then will add it to the localstorage
    playlistSize++; //increment the size var
}
  
  function removeFromThePlaylist() {//this will hanlde when we wanna remove a song from the playlist
    //this will get the row of the table
    const rowIndex = this.closest('tr').rowIndex; //from the row where it got clicked
    //this will delete the row
    document.getElementById('playlist-table').deleteRow(rowIndex); //from the html page
    //this updates the local storage
    for (let i = rowIndex; i < localStorage.length - 1; i++) { //by looping thru the whole thing
      localStorage.setItem(`song${i}`, localStorage.getItem(`song${i+1}`));
    }
    localStorage.removeItem(`song${localStorage.length-1}`);
    playlistSize--; //decrement since we removed a row from the playlist so it decreases
    if (playlistSize == 0) { //incase the size is 0 aka the playlist is empty and no songs in it
      document.getElementById('playlist').innerHTML = ''; //remove the playlist from the html page
    }
  }
  
  function moveUpInPlaylist() { //this song handles when we wanna move the song up in the playlist
    const currentRow = this.closest('tr'); //get the current row where the click event occurred
    const currentRIndex = currentRow.rowIndex; //get the index of the current row in the table
    //this will move the song up if and only if the song 
    if (currentRIndex > 0) {  //is not on the top 
      //it will not do anything if the song is already on top
      const previousRow = currentRow.previousElementSibling; //this retrieve the previous row in the table
      //this will swap items in the local storage
      //to reflect the change in order that happened
      let tempString = localStorage.getItem(`song${currentRIndex}`);
      localStorage.setItem(`song${currentRIndex}`, localStorage.getItem(`song${currentRIndex-1}`));
      localStorage.setItem(`song${currentRIndex-1}`, tempString);
      //this udate the HTML page by swapping the table row elements
      currentRow.parentNode.insertBefore(currentRow, previousRow); //by switching table row elements 
      //the above line effectively moves the currentRow before the previousRow in the table structure
    }
  }
  
  function moveDownInPlaylist() { //this will handle when we wanna move down the song in the playlist
    const currentRow = this.closest('tr'); //get the current row where the click event occurred
    const currentRIndex = currentRow.rowIndex;//get the index of the current row in the table
    //it will only move the song down in the playlist if and only if the song is not 
    //already in the down bottom of the playlist
    if (currentRIndex < playlistSize-1) { //it won't do anything if the song is already in the last row
      //it will ignore 
      const nextRow = currentRow.nextElementSibling;
      //this swap items in local storage
      //to reflect the change in order that happened
      let tempString = localStorage.getItem(`song${currentRIndex}`);
      localStorage.setItem(`song${currentRIndex}`, localStorage.getItem(`song${currentRIndex+1}`));
      localStorage.setItem(`song${currentRIndex+1}`, tempString);
      //this will update the html page 
      currentRow.parentNode.insertBefore(nextRow, currentRow); //by switching table row elements 
    }
  }
  
  //this gets the local song data based on the table row that the button was clicked from
  function getsDataFromRow(buttonElement) { //based on the table row that the button was clicked from
    const songRow = buttonElement.closest('tr');
    const sData = {}; //it will store it in a javascript object
    sData.trackId = songRow.id
    //this gets the data based 
    sData.trackName = songRow.querySelector('.title').innerHTML; //on the class of the table columns
    sData.artistName = songRow.querySelector('.artist').innerHTML; //on the class of the table columns
    sData.artworkUrl100 = songRow.querySelector('.artwork').querySelector('img').src; //on the class of the table columns
    return sData; //return the javascript object 
  }
  
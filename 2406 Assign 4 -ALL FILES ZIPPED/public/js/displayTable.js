//Zainab Lezzaik 
//101263105

function createTable(type) { //this will create the tables
  let tableDiv = document.getElementById(type); //this will get the html element
  let table = document.createElement('table'); //creates a new HTML table element
  table.id = `${type}-table`;//sets the id attribute of the newly created table element
  
  let bodyTable = document.createElement('tbody'); //this line creates a tbody (table body) element
  bodyTable.id = `${type}-table-body`;//this line sets the id attribute of the table body
  
  table.appendChild(bodyTable); //this line appends the tbody element to the table element
  table.setAttribute("border", "2"); //this line sets the border attribute of the table to "2"
  //this line appends the entire table element (including the tbody)
  tableDiv.appendChild(table); // to the HTML element identified by the type parameter
}
  
  //this loads the search results for the song returned 
  function loadResultsToTable(searchResult, type) { //from server into the search results table
    searchResult.results.forEach(songResult => { //this loops thru each song of the search
      addRow(songResult, type); //this will add a row for each song
    });
  }
  //a function to add a new row to a table based on song data and type
  function addRow(sData, type) { //this will add a table row  when given a songdata & a "type"
    //this gets the table body element based on the provided type
    let body = document.getElementById(`${type}-table-body`);
    //this creates a new table row element
    let songRow = document.createElement('tr'); //tr stands for the table row same as ww3 school
    songRow.id = sData.trackIds //set the id of the row based on the trackIds property in song data
    //this will add columns for each row
    let columnsAction = columnAction(type); //create action column for the row by calling the columnAction function
    //this is for the title 
    let columnTitle = document.createElement('td'); //create a column for the title of the song
    columnTitle.className = 'title'; //set the class name for styling purposes
    columnTitle.innerHTML = sData.trackName; //set the content of the column to the track name
    //this is for the artist 
    let columnArtist = document.createElement('td');
    columnArtist.className = 'artist'; //set the class name for styling purposes
    columnArtist.innerHTML = sData.artistName;//set the content of the column to the artist name
    //this is for the artwork 
    let columnWork = document.createElement('td');
    columnWork.className = 'artwork'; //set the class name for styling purposes
    columnWork.innerHTML = `<img src=${sData.artworkUrl100} />`; //set the content of the column to an image tag with the artwork URL
    //this add the columns to the songRow
    songRow.append(columnsAction, columnTitle, columnArtist, columnWork);
    body.appendChild(songRow); //and then adds the songRow to table body
  }

  function columnAction(type) { //this creates & return a table column 
    //woth the buttons in it 
    let columnsAction = document.createElement('td');
    switch(type) {
      case 'search-results':
        columnsAction.appendChild(createButton('+', addToThePlaylist));
        break;
      case 'playlist':
        //this creates the buttons and append them to the table column
        //on the type given
        columnsAction.appendChild(createButton('-', removeFromThePlaylist));
        columnsAction.appendChild(createButton('\u{1F53C}', moveUpInPlaylist)); //this is the up arrow emoji
        columnsAction.appendChild(createButton('\u{1F53D}', moveDownInPlaylist)); //this is the down arrow emoji
        break;
    }
    return columnsAction;
  }

  function createButton(symbol, action=null) { //this creates the buttons that are being used
    //in the columnAction()
    let addButton = document.createElement('input');
    addButton.type = 'button';
    addButton.value = symbol; //this sets the symbol of button (i.e. +, -, up arrow emoji, or down arrow emoji)
    addButton.onclick = action; //this sets the onclick event listener for button
    return addButton //return it 
  }
  
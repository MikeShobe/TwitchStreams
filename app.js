var pageNumber = 1;
var currentQuery;
var results;

function changeQuery(currQuery) {
  var xmlHttp = new XMLHttpRequest();
  var query = currQuery || document.getElementById('searchInput').value;
  var url = 'https://api.twitch.tv/kraken/search/streams?q=' + query; //query for API request

  currentQuery = query; // keeps track of current search query & gets displayed as red text

  xmlHttp.open('GET', url, true);
  xmlHttp.responseType = 'json';

//resets to first page if inputting new query from later page
  if (!currQuery && pageNumber === 2){
    pageNumber = 1;
  }

  xmlHttp.onload = function(){
    results = xmlHttp.response.streams.length;
    var totalPages = Math.ceil(results / 5);
    var pageLoad = 5 * pageNumber;

  //clear display elements if no streams from search query
    if (!results) {
      clearDisplay();      
    }

    if (xmlHttp.status === 200){
    //loop allows for streams index 5+ to get rendered to the same five original elements
      for (var i = pageLoad - 5, elementNum = 0; i < pageLoad; i++, elementNum++) {
        document.getElementById('currentQuery').innerHTML = currentQuery;

      //creates dynamic streamItems
        if (i < results){
          //pass in request & loop data to populate page
          renderStreamItems(elementNum, results, totalPages, xmlHttp.response, i);
        }

      //remove left-over streamItems from previous page
        else {
          removeStreamItems(elementNum);
        }
      }
    }
    else {
      console.error('Request failed. Status code: ' + xmlHttp.status);      
    }
  }

  //sends API data to front-end and clears the search form
    xmlHttp.send();
    document.getElementById("search").reset();
    return false;

}

//takes in data from API request and changeQuery function to populate page
function renderStreamItems(elementNum, results, totalPages, data, index) {

  //makes proper elements visible if they were invisible from default or page turn
    document.getElementById('img' + elementNum).style = 'display:inline';
    document.getElementById('id' + elementNum).style = 'display:inline';
    document.getElementById('gameName' + elementNum).style = 'display:inline';
    document.getElementById('viewers' + elementNum).style = 'display:inline';
    document.getElementById('description' + elementNum).style = 'display:block';
    document.getElementById('link' + elementNum).style = 'display:block';

  //interface that will appear because there were results
    document.getElementById('result').innerHTML = results;
    document.getElementById('result').style = 'display:inline';
    document.getElementById('pages').style = 'display:inline';          
    document.getElementById('pages').innerHTML = pageNumber + '/' + totalPages;
    document.getElementById('leftButton').style = 'display:inline';
    document.getElementById('rightButton').style = 'display:inline';

  //builds stream items dynamically from the loop in changeQuery
    document.getElementById('img' + elementNum).src = data.streams[index].preview.medium;
    document.getElementById('link' + elementNum).href = data.streams[index].channel.url;
    document.getElementById('id'  + elementNum).innerHTML = data.streams[index].channel.display_name;
    document.getElementById('gameName' + elementNum).innerHTML = data.streams[index].game || 'GAME NOT SPECIFIED';
    document.getElementById('viewers' + elementNum).innerHTML = '- ' + data.streams[index].viewers + ' viewers';
    document.getElementById('description' + elementNum).innerHTML = data.streams[index].channel.status.substring(0,62) + ' ...';  
}

// clears display if no results
function clearDisplay() {
  document.getElementById('result').innerHTML = 0;
  document.getElementById('pages').style = 'display:none'; 
  document.getElementById('leftButton').style = 'display:none';
  document.getElementById('rightButton').style = 'display:none';
}

//removes left-over streamItems when there are fewer than 5 on active page
function removeStreamItems(elementNum){
  document.getElementById('img' + elementNum).style = 'display:none';
  document.getElementById('link' + elementNum).style = 'display:none';
  document.getElementById('id'  + elementNum).style = 'display:none';
  document.getElementById('gameName' + elementNum).style = 'display:none';
  document.getElementById('viewers' + elementNum).style = 'display:none';
  document.getElementById('description' + elementNum).style = 'display:none';
}

//loads the next page of streams if rightButton is clicked
function nextPage(){
  if (pageNumber === 1 && results !== 5){
    pageNumber++;
    changeQuery(currentQuery);    
  }
}

//loads the previous page of streams if leftButton is clicked
function lastPage(){
  if (pageNumber === 2){
    pageNumber--;
    changeQuery(currentQuery);
  }
}
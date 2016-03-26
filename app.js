var pageNumber = 1;
var currentQuery;

function changeQuery(inputQuery){
  var xmlHttp = new XMLHttpRequest();
  var query = inputQuery || document.getElementById('searchInput').value;
  var url = 'https://api.twitch.tv/kraken/search/streams?q=' + query;

  currentQuery = query; // keeps track of current search query & gets displayed as red text

  xmlHttp.open('GET', url, true);
  xmlHttp.responseType = 'json';

//resets to first page if inputting new query from later page
  if (!inputQuery && pageNumber === 2){
    pageNumber = 1;
  }

  xmlHttp.onload = function(){
    var results = xmlHttp.response.streams.length;
    var totalPages = Math.ceil(results / 5);
    var pageLoad = 5 * pageNumber;

    if (!results) {
      document.getElementById('result').innerHTML = 0;
      document.getElementById('pages').style = 'display:none'; 
      document.getElementById('leftButton').style = 'display:none';
      document.getElementById('rightButton').style = 'display:none';      
    }

    if (xmlHttp.status === 200){
    //loop allows to add larger indexed streams get rendered to the same five elements
      for (var i = pageLoad - 5, elementNum = 0; i < pageLoad; i++, elementNum++) {
        document.getElementById('currentQuery').innerHTML = currentQuery;

      //creates dynamic streamItems
        if (i < results){

        //makes proper elements visible if they were invisible from default or page turn
          document.getElementById('img' + elementNum).style = 'display:inline';
          document.getElementById('id' + elementNum).style = 'display:inline';
          document.getElementById('gameName' + elementNum).style = 'display:inline';
          document.getElementById('viewers' + elementNum).style = 'display:inline';
          document.getElementById('description' + elementNum).style = 'display:block';
          document.getElementById('link' + elementNum).style = 'display:block';

        //interface that only appears if input is valid
          document.getElementById('result').innerHTML = results;
          document.getElementById('result').style = 'display:inline';
          document.getElementById('pages').style = 'display:inline';          
          document.getElementById('pages').innerHTML = pageNumber + '/' + totalPages;
          document.getElementById('leftButton').style = 'display:inline';
          document.getElementById('rightButton').style = 'display:inline';

        //builds stream items dynamically
          document.getElementById('img' + elementNum).src = xmlHttp.response.streams[i].preview.medium;
          document.getElementById('link' + elementNum).href = xmlHttp.response.streams[i].channel.url;
          document.getElementById('id'  + elementNum).innerHTML = xmlHttp.response.streams[i].channel.display_name;
          document.getElementById('gameName' + elementNum).innerHTML = xmlHttp.response.streams[i].game;
          document.getElementById('viewers' + elementNum).innerHTML = '- ' + xmlHttp.response.streams[i].viewers + ' viewers';
          document.getElementById('description' + elementNum).innerHTML = xmlHttp.response.streams[i].channel.status.substring(0,71) + ' ...';
        }

      //remove left-over streamItems from previous page
        else {
          document.getElementById('img' + elementNum).style = 'display:none';
          document.getElementById('link' + elementNum).style = 'display:none';
          document.getElementById('id'  + elementNum).style = 'display:none';
          document.getElementById('gameName' + elementNum).style = 'display:none';
          document.getElementById('viewers' + elementNum).style = 'display:none';
          document.getElementById('description' + elementNum).style = 'display:none';
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
}

//loads the next page of streams if rightButton is clicked
function nextPage(){
  if (pageNumber === 1){
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
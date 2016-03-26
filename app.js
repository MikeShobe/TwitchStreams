var pageNumber = 1;
var currentQuery;

function changeQuery(inputQuery){
  var xmlHttp = new XMLHttpRequest();
  var query = inputQuery || document.getElementById('searchInput').value;
  var url = 'https://api.twitch.tv/kraken/search/streams?q=' + query;
  currentQuery = query;

  xmlHttp.open('GET', url, true);
  xmlHttp.responseType = 'json';

  // if (currentQuery && pageNumber === 2){
  //   pageNumber = 1;
  // }

  xmlHttp.onload = function(){
    var results = xmlHttp.response.streams.length;
    var totalPages = Math.ceil(results / 5);
    var pageLoad = 5 * pageNumber;

    if (xmlHttp.status === 200){
      for (var i = pageLoad - 5, elementNum = 0; i < pageLoad; i++, elementNum++) {
        document.getElementById('result').innerHTML = results;
        document.getElementById('pages').innerHTML = pageNumber + '/' + totalPages;
        document.getElementById('leftButton').style = 'display:inline';
        document.getElementById('rightButton').style = 'display:inline';

        //dynamic 'stream' items
        if (i < results){

          //makes proper elements visible if they were invisible from default or page turn
          document.getElementById('img' + elementNum).style = 'display:inline';
          document.getElementById('id' + elementNum).style = 'display:inline';
          document.getElementById('gameName' + elementNum).style = 'display:inline';
          document.getElementById('viewers' + elementNum).style = 'display:inline';
          document.getElementById('description' + elementNum).style = 'display:block';
          document.getElementById('link' + elementNum).style = 'display:block';

        //builds stream items dynamically
          document.getElementById('img' + elementNum).src = xmlHttp.response.streams[i].preview.medium;
          document.getElementById('link' + elementNum).href = xmlHttp.response.streams[i].channel.url;
          document.getElementById('id'  + elementNum).innerHTML = xmlHttp.response.streams[i].channel.display_name;
          document.getElementById('gameName' + elementNum).innerHTML = xmlHttp.response.streams[i].game;
          document.getElementById('viewers' + elementNum).innerHTML = '- ' + xmlHttp.response.streams[i].viewers + ' viewers';
          document.getElementById('description' + elementNum).innerHTML = xmlHttp.response.streams[i].channel.status.substring(0,71) + ' ...';
        }
        //remove left-over stream items from previous page
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
      alert('Request failed. Status code: ' + xmlHttp.status);      
    }
  }
  //sends API data to front-end and clears the search form
    xmlHttp.send();
    document.getElementById("search").reset();
}

//loads the next page of streams
function nextPage(){
  if (pageNumber === 1){
    pageNumber++;
    changeQuery(currentQuery);    
  }
}

//loads the previous page of streams
function lastPage(){
  if (pageNumber > 1){
    pageNumber--;
    changeQuery(currentQuery);
  }
}
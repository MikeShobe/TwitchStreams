function changeQuery(){
  var xmlHttp = new XMLHttpRequest();
  var query = document.getElementById('searchInput').value;
  var url = 'https://api.twitch.tv/kraken/search/streams?q=' + query;

  xmlHttp.open('GET', url, true);
  xmlHttp.responseType = 'json';

  xmlHttp.onload = function(){
    // var streamNumber = 0;
    if (xmlHttp.status === 200){
      for (var i = 0; i < 5; i++) {
        document.getElementById('result').innerHTML = xmlHttp.response._total;
        document.getElementById('img' + i).src = xmlHttp.response.streams[i].preview.medium;
        document.getElementById('link' + i).href = xmlHttp.response.streams[i].channel.url;
        document.getElementById('id'  + i).innerHTML = xmlHttp.response.streams[i].channel.display_name;
        document.getElementById('gameName' + i).innerHTML = xmlHttp.response.streams[i].game;
        document.getElementById('viewers' + i).innerHTML = '- ' + xmlHttp.response.streams[i].viewers + ' viewers';
        document.getElementById('description' + i).innerHTML = xmlHttp.response.streams[i].channel.status;
      }
    }
    else {
      alert('Request failed. Status code: ' + xmlHttp.status);      
    }
  }
    xmlHttp.send();
    document.getElementById("search").reset();
}

function changeQuery(){
  var xmlHttp = new XMLHttpRequest();
  var query = document.getElementById('searchInput').value;
  var url = 'https://api.twitch.tv/kraken/search/streams?q=' + query;

  xmlHttp.open('GET', url, true);
  xmlHttp.responseType = 'json';

  xmlHttp.onload = function(){
    if (xmlHttp.status === 200){
      document.getElementById('img1').src = xmlHttp.response.streams[0].preview.medium;
      document.getElementById('link1').href = xmlHttp.response.streams[0].channel.url;
      document.getElementById('result').innerHTML = xmlHttp.response._total;
      document.getElementById('id1').innerHTML = xmlHttp.response.streams[0].channel.display_name;
      document.getElementById('gameName1').innerHTML = xmlHttp.response.streams[0].game;
      document.getElementById('viewers1').innerHTML = '- ' + xmlHttp.response.streams[0].viewers + ' viewers';
      document.getElementById('description1').innerHTML = xmlHttp.response.streams[0].channel.status;
    }
    else {
      alert('Request failed. Status code: ' + xmlHttp.status);      
    }
  }
    xmlHttp.send();
    document.getElementById("search").reset();
}

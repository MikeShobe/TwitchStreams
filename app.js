var xmlHttp = new XMLHttpRequest();
// var query = document.getElementById('searchInput').value || 'starcraft';

xmlHttp.open('GET', encodeURI('https://api.twitch.tv/kraken/search/streams?q=starcraft'));
xmlHttp.responseType = 'json';

xmlHttp.onload = function() {
  if (xmlHttp.status === 200) {
    console.log(JSON.stringify(xmlHttp.response));
    document.getElementById('result').innerHTML = xmlHttp.response._total;
    document.getElementById('img1').src = xmlHttp.response.streams[0].preview.medium;
    document.getElementById('id1').innerHTML = xmlHttp.response.streams[0].channel.display_name;
    document.getElementById('gameName1').innerHTML = xmlHttp.response.streams[0].game;
    document.getElementById('viewers1').innerHTML = '- ' + xmlHttp.response.streams[0].viewers + ' viewers';
    document.getElementById('description1').innerHTML = xmlHttp.response.streams[0].channel.status;

  }
  else {
    alert('Request failed. Status code: ' + xmlHttp.status);
  }
};

function changeQuery(){
  // query = document.getElementById('searchInput').value;
  // query = document.getElementById('searchInput').getAttribute('onclick');
  // xmlHttp.open('GET', encodeURI('https://api.twitch.tv/kraken/search/streams?q=' + query));
  // xmlHttp.send();
  alert(document.getElementById('searchInput').value);

}

xmlHttp.send();
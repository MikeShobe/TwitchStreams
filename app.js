var xmlHttp = new XMLHttpRequest();

xmlHttp.open('GET', encodeURI('https://api.twitch.tv/kraken/search/streams?q=starcraft'));
xmlHttp.responseType = 'json';

xmlHttp.onload = function() {
  if (xmlHttp.status === 200) {
    console.log(JSON.stringify(xmlHttp.response));
    document.getElementById('test').innerHTML = xmlHttp.response;
  }
  else {
    alert('Request failed.  Returned status of ' + xmlHttp.status);
  }
};
xmlHttp.send();
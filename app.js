var xmlHttp = new XMLHttpRequest();
var twitchData = {};

xmlHttp.open('GET', encodeURI('https://api.twitch.tv/kraken/search/streams?q=starcraft'));
xmlHttp.responseType = 'json';

xmlHttp.onload = function() {
  if (xmlHttp.status === 200) {
    console.log(JSON.stringify(xmlHttp.response));
    document.getElementById('test').innerHTML = xmlHttp.response;
    document.getElementById('result').innerHTML = xmlHttp.response._total;

  }
  else {
    alert('Request failed.  Returned status of ' + xmlHttp.status);
  }
  // console.log(twitchData);
};

xmlHttp.send();
// function changeQuery(){
//   var xmlHttp = new XMLHttpRequest();

//   xmlHttp.open('POST', encodeURI('https://api.twitch.tv/kraken/search/streams?q=' + document.getElementById('searchInput').value));
//   xmlHttp.responseType = 'json';

//   xmlHttp.onload = function() {
//     if (xmlHttp.status === 200) {
//       console.log(JSON.stringify(xmlHttp.response));
//       document.getElementById('result').innerHTML = xmlHttp.response._total;
//       document.getElementById('img1').src = xmlHttp.response.streams[0].preview.medium;
//       document.getElementById('id1').innerHTML = xmlHttp.response.streams[0].channel.display_name;
//       document.getElementById('gameName1').innerHTML = xmlHttp.response.streams[0].game;
//       document.getElementById('viewers1').innerHTML = '- ' + xmlHttp.response.streams[0].viewers + ' viewers';
//       document.getElementById('description1').innerHTML = xmlHttp.response.streams[0].channel.status;

//     }
//     else {
//       alert('Request failed. Status code: ' + xmlHttp.status);
//     }
//   };
//   alert('sup');
//   xmlHttp.send();
// }
"use strict";

var monogoChallengeUrl = 'https://www.monogo.pl/competition/input.txt';
fetch('https://www.monogo.pl/competition/input.txt', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  return console.log(data);
});
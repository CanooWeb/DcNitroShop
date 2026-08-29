var landing = document.getElementById('landing');
var scare = document.getElementById('scare');
var face = document.getElementById('face');
var scaredBy = document.getElementById('scaredBy');
var link = document.getElementById('startLink');
var visitorIp = document.getElementById('visitorIp');
var screamAudio = new Audio('YTDown.com_YouTube_Scary-Screamer-Sound-Effect-Free_Media_Yc-CGFVb_EE_008_128k.mp3');
screamAudio.preload = 'auto';
screamAudio.volume = 1.0;
screamAudio.loop = false;

function enterFullscreen() {
  var el = document.documentElement;
  if (el.requestFullscreen) {
    return el.requestFullscreen();
  }
  if (el.webkitRequestFullscreen) {
    return el.webkitRequestFullscreen();
  }
  if (el.msRequestFullscreen) {
    return el.msRequestFullscreen();
  }
}

function playScream() {
  screamAudio.currentTime = 0;
  screamAudio.volume = 1.0;
  screamAudio.play().catch(function (err) {
    console.log('Audio konnte nicht abgespielt werden:', err);
  });
}

function showIp() {
  fetch('https://api.ipify.org?format=json')
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      visitorIp.textContent = 'IP: ' + d.ip;
    })
    .catch(function () {
      visitorIp.textContent = 'IP: unbekannt';
    });
}

function triggerScare() {
  landing.classList.add('hidden');
  scare.classList.remove('hidden');
  face.classList.add('zoomed', 'flicker');
  scare.classList.add('strobe');
  playScream();
  showIp();

  setTimeout(function () {
    scaredBy.classList.remove('hidden');
    visitorIp.classList.remove('hidden');
  }, 3000);

  setTimeout(function () {
    playScream();
  }, 2500);
  setTimeout(function () {
    playScream();
  }, 5000);

  setTimeout(function () {
    face.classList.remove('flicker');
  }, 5500);
}

link.addEventListener('click', function (e) {
  e.preventDefault();
  enterFullscreen();
  triggerScare();
});
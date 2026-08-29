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

(function initSymbols() {
  var symbols = ['\u26A1', '\u2728', '\uD83D\uDCA1', '\uD83D\uDD25', '\u232C', '\u25C6', '\u2605', '\u2726', '\u2727'];
  var container = document.getElementById('bg-symbols');
  var items = [];
  for (var i = 0; i < 40; i++) {
    var s = document.createElement('span');
    s.textContent = symbols[i % symbols.length];
    container.appendChild(s);
    items.push({
      el: s,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: 16 + Math.random() * 28
    });
    s.style.left = items[i].x + 'px';
    s.style.top = items[i].y + 'px';
    s.style.fontSize = items[i].size + 'px';
    setTimeout((function (el) {
      return function () { el.style.opacity = '0.9'; };
    })(s), Math.random() * 2000);
  }

  var rs = function () {
    var r = 130;
    var w = window.innerWidth;
    var h = window.innerHeight;
    for (var k = 0; k < items.length; k++) {
      var it = items[k];
      var dx = it.x - mx;
      var dy = it.y - my;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < r && dist > 0) {
        var force = (r - dist) / r;
        it.vx += (dx / dist) * force * 0.8;
        it.vy += (dy / dist) * force * 0.8;
      }
      it.vx *= 0.94;
      it.vy *= 0.94;
      it.x += it.vx;
      it.y += it.vy;
      if (it.x < 0) it.x = w;
      if (it.x > w) it.x = 0;
      if (it.y < 0) it.y = h;
      if (it.y > h) it.y = 0;
      it.el.style.left = it.x + 'px';
      it.el.style.top = it.y + 'px';
      it.el.style.transform = 'translate(-50%, -50%)';
    }
  };

  var mx = -10000, my = -10000;
  window.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  });
  window.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches.length) {
      mx = e.touches[0].clientX;
      my = e.touches[0].clientY;
    }
  }, { passive: true });
  (function loop() {
    rs();
    requestAnimationFrame(loop);
  })();
})();

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


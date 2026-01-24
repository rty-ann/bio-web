const translations = {
    ru: { label: "Русский", tagline: "течтокер наху", scroll: "Листай вниз", about_title: "версия 0.6", about_text: "создание сайта ещё в процессе." },
    be: { label: "Беларуская", tagline: "тэчтокер", scroll: "Гартай ніжэй", about_title: "версія 0.6", about_text: "стварэнне сайта яшчэ ў працэсе." },
    uk: { label: "Українська", tagline: "течтокер", scroll: "Гортай вниз", about_title: "версія 0.6", about_text: "створення сайту ще у процесі." },
    en: { label: "English", tagline: "techtoker", scroll: "Scroll down", about_title: "version 0.6", about_text: "make in progress." }
};
var audio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause'), trackArt = document.getElementById('track-art'), trackName = document.getElementById('track-name'), trackArtist = document.getElementById('track-artist'), progressBar = document.getElementById('progress-bar'), progressArea = document.querySelector('.progress-container');
const tracks = [
    { name: "Yes Future!", artist: "Noize MC", src: "audio/yesfuture.mp3", art: "covers/2012.png" },
    { name: "На Марсе классно!", artist: "Noize MC", src: "audio/mars.mp3", art: "covers/2010.png" },
    { name: "Вояджер-1", artist: "Noize MC", src: "audio/voyager.mp3", art: "covers/2020.png" }
];
let trackIndex = 0, isPlaying = false, isDragging = false;
function loadTrack(idx) { const t = tracks[idx]; trackName.innerText = t.name; trackArtist.innerText = t.artist; trackArt.src = t.art; audio.src = t.src; }
loadTrack(trackIndex);
const formatTime = (s) => { if (!s) return "0:00"; const m = Math.floor(s/60), sec = Math.floor(s%60); return `${m}:${sec<10?'0':''}${sec}`; };
playPauseBtn.onclick = () => {
    if (isPlaying) { audio.pause(); playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; } 
    else { audio.play(); playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
    isPlaying = !isPlaying;
};
document.getElementById('next').onclick = () => { trackIndex = (trackIndex + 1) % tracks.length; loadTrack(trackIndex); if (isPlaying) audio.play(); };
document.getElementById('prev').onclick = () => { trackIndex = (trackIndex - 1 + tracks.length) % tracks.length; loadTrack(trackIndex); if (isPlaying) audio.play(); };
audio.onended = () => { document.getElementById('next').click(); };
audio.onloadedmetadata = () => { document.getElementById('duration').innerText = formatTime(audio.duration); };
audio.ontimeupdate = () => {
    if (!isDragging && audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${pct}%`;
        document.getElementById('current-time').innerText = formatTime(audio.currentTime);
        document.getElementById('duration').innerText = formatTime(audio.duration);
    }
};
const updateProgress = (e) => {
    const w = progressArea.clientWidth, rect = progressArea.getBoundingClientRect();
    const x = e.clientX - rect.left, pct = Math.max(0, Math.min(x / w, 1));
    progressBar.style.width = `${pct * 100}%`;
    if (audio.duration) audio.currentTime = pct * audio.duration;
};
progressArea.addEventListener('mousedown', (e) => { isDragging = true; document.body.classList.add('hide-cursor'); updateProgress(e); });
document.addEventListener('mousemove', (e) => { if (isDragging) updateProgress(e); });
document.addEventListener('mouseup', () => { if (isDragging) { isDragging = false; document.body.classList.remove('hide-cursor'); } });
window.toggleLangMenu = (e) => { if (e) e.stopPropagation(); const d = document.getElementById('lang-dropdown'); d.classList.toggle('open'); };
window.changeLang = (lang) => { 
    const r = document.getElementById('content-root'), l = document.getElementById('current-lang-label'); 
    document.getElementById('lang-dropdown').classList.remove('open'); r.classList.add('reborn-active'); localStorage.setItem('user_lang', lang);
    setTimeout(() => { 
        document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if (translations[lang][k]) el.innerText = translations[lang][k]; }); 
        l.innerText = translations[lang].label; r.classList.remove('reborn-active'); 
    }, 400); 
};
(function initLang() {
    const saved = localStorage.getItem('user_lang') || 'en', label = document.getElementById('current-lang-label');
    document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if (translations[saved][k]) el.innerText = translations[saved][k]; });
    if (label) label.innerText = translations[saved].label;
})();
document.addEventListener('click', (e) => { const d = document.getElementById('lang-dropdown'); if (d && !d.contains(e.target)) d.classList.remove('open'); });
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
document.addEventListener('mousedown', (e) => {
    const fav = document.createElement('div'); fav.className = 'falling-avatar';
    fav.style.left = (e.clientX - 20) + 'px'; fav.style.top = (e.clientY - 20) + 'px';
    document.body.appendChild(fav); setTimeout(() => fav.remove(), 1500);
});
(function() {
    const s = document.querySelector('.volume-slider'), i = document.querySelector('.volume-control i');
    if (audio && s) { audio.volume = s.value; s.oninput = (e) => { audio.volume = e.target.value; if (i) i.className = audio.volume == 0 ? 'fas fa-volume-mute' : audio.volume < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up'; }; }
})();

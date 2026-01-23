const translations = {
    ru: { label: "Русский", tagline: "течтокер наху", scroll: "Листай вниз", about_title: "версия 0.6", about_text: "создание сайта ещё в процессе." },
    be: { label: "Беларуская", tagline: "тэчтокер", scroll: "Гартай ніжэй", about_title: "версія 0.6", about_text: "стварэнне сайта яшчэ ў працэсе." },
    uk: { label: "Українська", tagline: "течтокер", scroll: "Гортай вниз", about_title: "версія 0.6", about_text: "створення сайту ще у процесі." },
    en: { label: "English", tagline: "techtoker", scroll: "Scroll down", about_title: "version 0.6", about_text: "make in progress." }
};

function toggleLangMenu() { document.getElementById('lang-dropdown').classList.toggle('open'); }

function changeLang(lang) {
    const root = document.getElementById('content-root');
    const label = document.getElementById('current-lang-label');
    document.getElementById('lang-dropdown').classList.remove('open');
    root.classList.add('reborn-active');
    setTimeout(() => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.innerText = translations[lang][key];
        });
        label.innerText = translations[lang].label;
        localStorage.setItem('selectedLang', lang);
        root.classList.remove('reborn-active');
    }, 400);
}

const audio = new Audio();
const trackArt = document.getElementById('track-art');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const progressArea = document.getElementById('progress-area');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const tracks = [
    { name: "Yes Future!", artist: "Noize MC", src: "audio/yesfuture.mp3", art: "covers/2012.png" },
    { name: "На Марсе классно!", artist: "Noize MC", src: "audio/mars.mp3", art: "covers/2010.png" },
    { name: "Вояджер-1", artist: "Noize MC", src: "audio/voyager.mp3", art: "covers/2020.png"}
];

let index = 0;
let playing = false;

function load(idx) {
    const t = tracks[idx];
    document.getElementById('track-name').innerText = t.name;
    document.getElementById('track-artist').innerText = t.artist;
    trackArt.src = t.art;
    audio.src = t.src;
}

load(index);

playPauseBtn.onclick = () => {
    if (playing) { audio.pause(); playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; }
    else { audio.play(); playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
    playing = !playing;
};

nextBtn.onclick = () => {
    trackArt.style.opacity = '0';
    setTimeout(() => {
        index = (index + 1) % tracks.length; load(index);
        trackArt.style.opacity = '1';
        if (playing) audio.play();
    }, 250);
};

prevBtn.onclick = () => {
    trackArt.style.opacity = '0';
    setTimeout(() => {
        index = (index - 1 + tracks.length) % tracks.length; load(index);
        trackArt.style.opacity = '1';
        if (playing) audio.play();
    }, 250);
};

audio.ontimeupdate = () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = pct + "%";
};

progressArea.onclick = (e) => {
    const width = progressArea.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
};

const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', (e) => {
    const fav = document.createElement('div');
    fav.className = 'falling-avatar';
    fav.style.left = e.clientX - 20 + 'px';
    fav.style.top = e.clientY - 20 + 'px';
    document.body.appendChild(fav);
    setTimeout(() => fav.remove(), 1500);
});

let isDragging = false;

progressArea.addEventListener('mousedown', () => {
    isDragging = true;
    document.body.classList.add('hide-cursor');
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        document.body.classList.remove('hide-cursor');
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const width = progressArea.clientWidth;
        const rect = progressArea.getBoundingClientRect();
        let x = e.clientX - rect.left;
        
        if (x < 0) x = 0;
        if (x > width) x = width;
        
        const pct = (x / width) * 100;
        progressBar.style.width = pct + "%";
        audio.currentTime = (x / width) * audio.duration;
    }
});

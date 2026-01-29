const translations = {
    ru: { label: "Русский", tagline: "течтокер", scroll: "Листай вниз", about_title: "Обо мне", about_text: "Родом из Беларуси. Течтокер и начинающий программист. Эксперт во многих эксплоитах IOS, а также в Android тематике. Пишу код на Unreal Engine и Unity, а также HTML, CSS, JS. Исследую мобильные системы изнутри.", nav_title: "Навигатор",
        nav_ios9_title: "iOS 9",
        nav_ios9_desc: "Мой гайд по обходу блокировки активации на iOS >= 9.3 для Linux/MacOS",
        nav_merula_title: "turdus_merula",
        nav_merula_desc: "Откат A9-A10 устройств на Linux/MacOS",
        nav_legacy_title: "Legacy iOS Kit",
        nav_legacy_desc: "Как использовать данную программу"},
    be: { label: "Беларуская", tagline: "тэчтокер", scroll: "Гартай ніжэй", about_title: "Пра мяне", about_text: "Родам з Беларусі. Тэчтокер і пачатковец-праграміст. Эксперт у многіх эксплоітах IOS, а таксама ў Android тэматыцы. Пішу код на Unreal Engine і Unity, а таксама HTML, CSS, JS. Даследую мабільныя сістэмы знутры.", nav_title: "Навігатар",
        nav_ios9_title: "iOS 9",
        nav_ios9_desc: "Мой гайд па абыходзе блакіроўкі актывацыі на iOS >= 9.3 для Linux/MacOS",
        nav_merula_title: "turdus_merula",
        nav_merula_desc: "Адкат A9-A10 прылад на Linux/MacOS",
        nav_legacy_title: "Legacy iOS Kit",
        nav_legacy_desc: "Як карыстацца дадзенай праграмай"},
    uk: { label: "Українська", tagline: "течтокер", scroll: "Гортай вниз", about_title: "Про мене", about_text: "Родом з Білорусі. Течтокер та програміст-початківець. Експерт у багатьох експлоїтах IOS, а також в Android тематиці. Пишу код на Unreal Engine та Unity, а також HTML, CSS, JS. Досліджую мобільні системи зсередини.", nav_title: "НАВІГАТОР",
        nav_ios9_title: "iOS 9",
        nav_ios9_desc: "Мій гайд по обходу блокування активації на iOS >= 9.3 для Linux/MacOS",
        nav_merula_title: "turdus_merula",
        nav_merula_desc: "Відкат A9-A10 пристроїв на Linux/MacOS",
        nav_legacy_title: "Legacy iOS Kit",
        nav_legacy_desc: "Як використовувати дану програму"},
    en: { label: "English", tagline: "techtoker", scroll: "Scroll down", about_title: "About Me", about_text: "From Belarus. Techtoker and junior developer. Expert in many iOS exploits, as well as Android topics. Developing projects in Unreal Engine and Unity, also in HTML, CSS, JS. Exploring mobile internals.", nav_title: "Navigator",
        nav_ios9_title: "iOS 9",
        nav_ios9_desc: "My guide on bypassing activation lock on iOS >= 9.3 for Linux/MacOS",
        nav_merula_title: "turdus_merula",
        nav_merula_desc: "A9-A10 devices downgrade on Linux/MacOS",
        nav_legacy_title: "Legacy iOS Kit",
        nav_legacy_desc: "How to use this tool"}
};

var audio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause'), trackArt = document.getElementById('track-art'), trackName = document.getElementById('track-name'), trackArtist = document.getElementById('track-artist'), progressBar = document.getElementById('progress-bar'), progressArea = document.querySelector('.progress-container');
const tracks = [
    { name: "Кладбище Самолётов", artist: "Валентин Стрыкало", src: "audio/kladbischesamoletov.mp3", art: "covers/kladbischesamoletov.jpg" },
    { name: "Yes Future!", artist: "Noize MC", src: "audio/yesfuture.mp3", art: "covers/yesfuture.png" },
    { name: "На Марсе классно!", artist: "Noize MC", src: "audio/mars.mp3", art: "covers/namarseklassno.png" },
    { name: "Вояджер-1", artist: "Noize MC", src: "audio/voyager.mp3", art: "covers/voyager1.png" },
    { name: "В темноте", artist: "Noize MC", src: "audio/vtemnote.mp3", art: "covers/vtemnote.jpg" },
    { name: "Детка, послушай", artist: "Noize MC", src: "audio/detkaposlyshay.mp3", art: "covers/detkaposlyshay.jpg" },
    { name: "Следы на спине", artist: "Noize MC", src: "audio/sledynaspine.mp3", art: "covers/sledynaspine.jpg"},
    { name: "Жвачка", artist: "Noize MC, Mewark (🥀)", src: "audio/zhvachka.mp3", art: "covers/zhvachka.jpg" },
    { name: "Устрой дестрой", artist: "Noize MC, Чача", src: "audio/ystroydestroy.mp3", art: "covers/ystroydestroy.png"},
    { name: "Иордан", artist: "Noize MC, Atlantida Project (🥀)", src: "audio/iordan.mp3", art: "covers/iordan.jpg" },
    { name: "гори гори гори", artist: "Монеточка", src: "audio/gorigorigori.mp3", art: "covers/gorigorigori.jpg" },
    { name: "Последняя дискотека", artist: "Монеточка", src: "audio/poslednyyadiskoteka.mp3", art: "covers/poslednyyadiskoteka.jpg"}
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

let copyClickCount = 0;
const secretTrigger = document.getElementById('secret');
const photoOverlay = document.getElementById('photo');
const secretSound = document.getElementById('sound');

if (secretTrigger) {
    secretTrigger.addEventListener('click', () => {
        copyClickCount++;

        if (copyClickCount === 5) {
            copyClickCount = 0;

            photoOverlay.classList.remove('fade-out');
            photoOverlay.classList.add('active');

            if (secretSound) {
                secretSound.currentTime = 0;
                secretSound.volume = 1;
                secretSound.play();
            }

            setTimeout(() => {
                photoOverlay.classList.remove('active');
                photoOverlay.classList.add('fade-out');
                
                setTimeout(() => {
                    if (secretSound) {
                        secretSound.pause();
                        secretSound.currentTime = 0;
                    }
                }, 800); 
            }, 3000);
        }
    });
}

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loaderBar = document.querySelector('.loader-bar');
    const statusText = document.querySelector('.loader-status');
    const logsContainer = document.getElementById('loader-logs');
    
    const systemMessages = [
    "[DEBUG] Initiating rty_OS bootloader...",
    "[INFO]  Checking hardware acceleration... Enabled",
    "[DEBUG] GET /assets/style.css - 200 OK",
    "[ERROR] RenderEngine: Failed to load 'Liquid_Glass' shader",
    "[WARN]  UI: Filter 'backdrop-blur' is not responding",
    "[INFO]  System: Attempting shader recompilation...",
    "[DEBUG] Recompiling: liquid_glass_v2.glsl... [SUCCESS]",
    "[INFO]  Liquid Glass effect mounted successfully",
    "[DEBUG] GET /assets/voyager.mp3 - 206 Partial",
    "[DEBUG] GET /assets/iordan.mp3 - 206 Partial",
    "[DEBUG] GET /assets/yesfuture.mp3 - 206 Partial",
    "[DEBUG] GET /assets/zhvachka.mp3 - 206 Partial",
    "[ERROR] AudioContext: User interaction required for autoplay",
    "[WARN]  Performance: High GPU usage detected!",
    "[INFO]  Optimizing physics engine for mobile devices...",
    "[DEBUG] i18n: Locales injected [RU, BE, UK, EN]",
    "[ERROR] Network: Socket timeout at xx.xx.x.x",
    "[INFO]  Retrying connection via secure tunnel...",
    "[DEBUG] Tunnel: established 256-bit AES",
    "[WARN]  Security: Non-critical module active",
    "[INFO]  Finalizing DOM hydration...",
    "[DEBUG] Assets: All assets loaded. Preparing GUI."
    ];

    function getLogClass(text) {
        if (text.includes('[DEBUG]')) return 'log-debug';
        if (text.includes('[INFO]'))  return 'log-info';
        if (text.includes('[WARN]'))  return 'log-warn';
        if (text.includes('[ERROR]')) return 'log-error';
        return 'log-info';
    }

    function addLog(text) {
        const entry = document.createElement('div');
        entry.className = `log-entry ${getLogClass(text)}`;
        entry.innerText = text;
        logsContainer.appendChild(entry);
        logsContainer.scrollTop = logsContainer.scrollHeight;
        if (logsContainer.childNodes.length > 20) logsContainer.removeChild(logsContainer.firstChild);
    }

    let progress = 0;
    let logIndex = 0;

    const logInterval = setInterval(() => {
        if (logIndex < systemMessages.length) {
            addLog(systemMessages[logIndex]);
            logIndex++;
        } else {
            clearInterval(logInterval);
        }
    }, 45);

    const progressInterval = setInterval(() => {
        let targetProgress = (logIndex / systemMessages.length) * 100;
        
        if (progress < targetProgress) {
            progress += 1;
        }

        loaderBar.style.width = `${progress}%`;

        if (progress >= 100 && logIndex >= systemMessages.length) {
            clearInterval(progressInterval);
            
            statusText.innerText = "DONE!";
            statusText.style.color = "#00ff88";

            setTimeout(() => {
                preloader.classList.add('loaded');
                document.getElementById('content-root').style.opacity = '1';
            }, 800);
        }
    }, 20);
});

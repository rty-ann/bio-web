/* ═══════════════════════════════════════════
   RTY BIO · SCRIPT  v2.0 (Clean System Version)
   ═══════════════════════════════════════════ */

/* ── TRANSLATIONS ── */
const translations = {
  ru: { 
    label:"Русский", tagline:"течтокер", nav_title:"НАВИГАТОР", nav_links:"— ССЫЛКИ —",
    nav_spoof_title: "lara iOS",
    nav_spoof_desc: "Гайд по включению Маркетплейсов за пределами ЕС",
    nav_ios9_title:"iOS 9", nav_ios9_desc:"Мой гайд по обходу блокировки активации на iOS >= 9.3",
    nav_merula_title:"turdus_merula", nav_merula_desc:"Откат A9-A10 устройств на Linux/MacOS",
    nav_legacy_title:"Legacy iOS Kit", nav_legacy_desc:"Как использовать данную программу"
  },
  be: { 
    label:"Беларуская", tagline:"тэчтокер", nav_title:"НАВІГАТАР", nav_links:"— СПАСЫЛКІ —",
    nav_spoof_title: "lara iOS",
    nav_spoof_desc: "Гайд па ўключэнні Маркетплейсаў за межамі ЕС",
    nav_ios9_title:"iOS 9", nav_ios9_desc:"Мой гайд па абыходзе блакіроўкі актывацыі на iOS >= 9.3",
    nav_merula_title:"turdus_merula", nav_merula_desc:"Адкат A9-A10 прылад на Linux/MacOS",
    nav_legacy_title:"Legacy iOS Kit", nav_legacy_desc:"Як карыстацца дадзенай праграмай"
  },
  uk: { 
    label:"Українська", tagline:"течтокер", nav_title:"НАВІГАТАР", nav_links:"— ПОСИЛАННЯ —",
    nav_spoof_title: "lara iOS",
    nav_spoof_desc: "Посібник із ввімкнення Маркетплейсів за межами ЄС",
    nav_ios9_title:"iOS 9", nav_ios9_desc:"Мій гайд по обходу блокування активації на iOS >= 9.3",
    nav_merula_title:"turdus_merula", nav_merula_desc:"Відкат A9-A10 пристроїв на Linux/MacOS",
    nav_legacy_title:"Legacy iOS Kit", nav_legacy_desc:"Як використовувати дану програму"
  },
  en: { 
    label:"English", tagline:"techtoker", nav_title:"NAVIGATOR", nav_links:"— LINKS —",
    nav_spoof_title: "lara iOS",
    nav_spoof_desc: "Guide for enabling Marketplaces outside the EU",
    nav_ios9_title:"iOS 9", nav_ios9_desc:"My guide on bypassing activation lock on iOS >= 9.3",
    nav_merula_title:"turdus_merula", nav_merula_desc:"A9-A10 devices downgrade on Linux/MacOS",
    nav_legacy_title:"Legacy iOS Kit", nav_legacy_desc:"How to use this tool"
  }
};

/* ═══════════════════════════════════════════
   1. ANIMATED MESH BACKGROUND (Canvas)
═══════════════════════════════════════════ */
(function initMesh() {
  const canvas = document.getElementById('mesh-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const NODES = [
    { x:.15, y:.2,  r:320, c:[123,47,255]  },
    { x:.85, y:.1,  r:280, c:[0,245,255]   },
    { x:.5,  y:.55, r:360, c:[255,45,120]  },
    { x:.1,  y:.8,  r:300, c:[0,245,255]   },
    { x:.9,  y:.75, r:250, c:[123,47,255]  },
  ];
  const speeds = NODES.map(() => ({ dx:(Math.random()-.5)*0.0003, dy:(Math.random()-.5)*0.0003 }));

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    NODES.forEach((n,i) => {
      n.x += speeds[i].dx; n.y += speeds[i].dy;
      if (n.x < 0 || n.x > 1) speeds[i].dx *= -1;
      if (n.y < 0 || n.y > 1) speeds[i].dy *= -1;
      const gx = n.x * canvas.width;
      const gy = n.y * canvas.height;
      const grad = ctx.createRadialGradient(gx,gy,0,gx,gy,n.r);
      grad.addColorStop(0, `rgba(${n.c},0.13)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(gx,gy,n.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════════════
   2. PRELOADER
═══════════════════════════════════════════ */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const bar       = document.getElementById('pre-bar');
  const status    = document.getElementById('pre-status');
  const logs      = document.getElementById('pre-logs');

  const msgs = [
    "[DEBUG] Initiating rty_OS bootloader...",
    "[INFO]  Checking kernel security... darkswoard active",
    "[DEBUG] GET /assets/style.css — 200 OK",
    "[ERROR] RenderEngine: Failed to load 'Liquid_Glass' shader",
    "[WARN]  UI: backdrop-blur not responding",
    "[INFO]  Attempting shader recompilation...",
    "[DEBUG] Recompiling: liquid_glass_v2.glsl... [SUCCESS]",
    "[INFO]  Mounting EU Spoof Guide...",
    "[DEBUG] i18n: Locales injected [RU, BE, UK, EN]",
    "[INFO]  Optimizing for mobile devices...",
    "[DEBUG] Assets: All assets loaded. Preparing GUI.",
    "[INFO]  Finalizing DOM hydration...",
    "[DEBUG] DONE."
  ];

  function cls(t) {
    if (t.includes('[DEBUG]')) return 'log-debug';
    if (t.includes('[INFO]'))  return 'log-info';
    if (t.includes('[WARN]'))  return 'log-warn';
    if (t.includes('[ERROR]')) return 'log-error';
    return 'log-info';
  }

  let li = 0, pct = 0;
  const logInt = setInterval(() => {
    if (li >= msgs.length) { clearInterval(logInt); return; }
    const d = document.createElement('div');
    d.className = cls(msgs[li]);
    d.style.cssText = 'font-size:.6rem;line-height:1.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    d.innerText = msgs[li++];
    logs.appendChild(d);
    logs.scrollTop = logs.scrollHeight;
    if (logs.children.length > 8) logs.removeChild(logs.firstChild);
  }, 60);

  const barInt = setInterval(() => {
    const target = (li / msgs.length) * 100;
    if (pct < target) pct = Math.min(pct + 2, target);
    bar.style.width = pct + '%';
    if (pct >= 100 && li >= msgs.length) {
      clearInterval(barInt);
      status.innerText = "READY.";
      status.style.color = '#00ff88';
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.getElementById('content-root').classList.add('ready');
        triggerReveal();
      }, 600);
    }
  }, 30);
});

/* ═══════════════════════════════════════════
   3. INTERSECTION OBSERVER — REVEAL
═══════════════════════════════════════════ */
function triggerReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════
   4. TYPING ANIMATION (bio)
═══════════════════════════════════════════ */
const bioLines = {
  ru: "Течтокер · iOS эксплойты · Android · UE · Unity",
  be: "Тэчтокер · iOS эксплоіты · Android · UE · Unity",
  uk: "Течтокер · iOS експлойти · Android · UE · Unity",
  en: "TechToker · iOS Exploits · Android · UE · Unity"
};
let typingTimeout = null;
function typeBio(lang) {
  const el = document.getElementById('bio-typed');
  if (!el) return;
  if (typingTimeout) clearTimeout(typingTimeout);
  const text = bioLines[lang] || bioLines.en;
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) { el.textContent += text[i++]; typingTimeout = setTimeout(type, 38); }
  }
  type();
}

/* ═══════════════════════════════════════════
   5. LANGUAGE SWITCHER
═══════════════════════════════════════════ */
window.toggleLangMenu = (e) => {
  if (e) e.stopPropagation();
  document.getElementById('lang-pill').classList.toggle('open');
};
window.changeLang = (lang) => {
  document.getElementById('lang-pill').classList.remove('open');
  localStorage.setItem('user_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][k]) el.innerText = translations[lang][k];
  });
  const lbl = document.getElementById('current-lang-label');
  if (lbl) lbl.innerText = translations[lang].label;
  typeBio(lang);
};
document.addEventListener('click', (e) => {
  const pill = document.getElementById('lang-pill');
  if (pill && !pill.contains(e.target)) pill.classList.remove('open');
});
(function initLang() {
  const saved = localStorage.getItem('user_lang') || 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (translations[saved] && translations[saved][k]) el.innerText = translations[saved][k];
  });
  const lbl = document.getElementById('current-lang-label');
  if (lbl) lbl.innerText = translations[saved].label;
  setTimeout(() => typeBio(saved), 800);
})();

/* ═══════════════════════════════════════════
   6. COPY USERNAME
═══════════════════════════════════════════ */
window.copyUsername = function() {
  navigator.clipboard.writeText('@rtyann_').then(() => {
    const btn = document.getElementById('copy-btn');
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 2000);
  }).catch(() => {
    const btn = document.getElementById('copy-btn');
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 2000);
  });
};

/* ═══════════════════════════════════════════
   7. CUSTOM CURSOR (desktop only)
═══════════════════════════════════════════ */
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if (!isMobile) {
  document.body.classList.add('desktop');
  const cur   = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let mx = -100, my = -100, tx = -100, ty = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });

  (function animTrail() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;
    trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    requestAnimationFrame(animTrail);
  })();

  document.querySelectorAll('a, button, [onclick]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width = '18px'; cur.style.height = '18px';
      cur.style.background = 'var(--neon-pk)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width = ''; cur.style.height = '';
      cur.style.background = '';
    });
  });
}

/* ═══════════════════════════════════════════
   8. TILT EFFECT (social & system cards)
═══════════════════════════════════════════ */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-3px) rotateX(${-dy * 4}deg) rotateY(${dx * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* Touch tilt for mobile */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.style.transform = 'scale(0.97)';
  }, { passive: true });
  card.addEventListener('touchend', () => {
    card.style.transform = '';
  });
});

(function initSmoothScreamer() {
    let clicks = 0;
    let timer = null;
    const trigger = document.getElementById('secret'); // Твой копирайт в футере[cite: 6]
    const overlay = document.getElementById('meme-screamer');
    const audio = document.getElementById('meme-sound');

    if (!trigger || !overlay || !audio) return;

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        clicks++;

        clearTimeout(timer);
        timer = setTimeout(() => { clicks = 0; }, 1000);

        if (clicks === 5) {
            showMeme();
            clicks = 0;
        }
    });

    function showMeme() {
        // Убираем класс затухания, если он остался с прошлого раза
        overlay.classList.remove('screamer-fade');
        overlay.classList.add('screamer-active');
        
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Sound blocked"));

        const closeScreamer = () => {
            // 1. Начинаем плавное затухание
            overlay.classList.add('screamer-fade');
            
            // 2. Ждем завершения анимации (800мс как в CSS) и полностью скрываем
            setTimeout(() => {
                overlay.classList.remove('screamer-active');
                overlay.classList.remove('screamer-fade');
                audio.pause();
            }, 700);

            overlay.removeEventListener('click', closeScreamer);
        };

        // Закрытие по окончании звука
        audio.onended = () => {
            closeScreamer();
        };

        // Возможность закрыть кликом через 2 секунды после начала
        setTimeout(() => {
            overlay.addEventListener('click', closeScreamer);
        }, 2000);
    }
})();

/* =========================================
   TASBEEH APP — SCRIPT
   ========================================= */


//    Loading Screen
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loadingScreen");
        loader.style.opacity = "0";
        loader.style.transition = "0.5s ease";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 1500); // وقت التحميل
});
/* ======== DATA ======== */

const SHEIKHS = [
    {
        id: 1, name: 'الشيخ محمد اللحيدان',
        country: 'السعودية',
        surahs: [
            {
                name: 'الفاتحة',
                audio: '/assets/muhammad_luhaidan/تلاوة/الفاتحه.mp4'
            },
            {
                name: 'المعارج',
                audio: '/assets/muhammad_luhaidan/تلاوة/المعارج.m4a'
            }
        ],
        image: 'assets/muhammad_luhaidan/logo.jpg'
    },
    {
        id: 2, name: 'الشيخ رعد الكردي',
        country: 'العراق',
        surahs: [
            {
                name: 'الفاتحة',
                audio: '/assets/raad_alkurdi/تلاوة/الفاتحه.m4a'
            },
            {
                name: 'المعارج',
                audio: '/assets/raad_alkurdi/تلاوة/المعارج.m4a'
            }
        ],
        image: 'assets/raad_alkurdi/logo.jpg'
    },
];

const AZKAR = {
    morning: [
        { arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.', repeat: 1, source: 'أبو داود' },
        { arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.', repeat: 1, source: 'الترمذي' },
        { arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.', repeat: 100, source: 'البخاري' },
        { arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ.', repeat: 1, source: 'البخاري' },
        { arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.', repeat: 3, source: 'مسلم' },
    ],
    evening: [
        { arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ.', repeat: 1, source: 'أبو داود' },
        { arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.', repeat: 1, source: 'الترمذي' },
        { arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.', repeat: 7, source: 'أبو داود' },
        { arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.', repeat: 3, source: 'أبو داود' },
    ],
    sleep: [
        { arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.', repeat: 1, source: 'البخاري' },
        { arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.', repeat: 3, source: 'أبو داود' },
        { arabic: 'سُبْحَانَ اللَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ.', repeat: 33, source: 'البخاري' },
        { arabic: 'آيَةُ الْكُرْسِيِّ: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...', repeat: 1, source: 'البخاري' },
    ]
};

const TARGETS = [33, 99, 100, 1000];

/* ======== STATE ======== */
let currentPage = 'homePage';
let counter = parseInt(localStorage.getItem('tasbeehCount') || '0');
let selectedZikr = localStorage.getItem('selectedZikr') || 'سُبْحَانَ اللهِ';
let targetIdx = parseInt(localStorage.getItem('targetIdx') || '0');
let todayTotal = getTodayTotal();
let azkarTab = 'morning';
let currentSheikh = null;
let audioEl = null;
let clickAudio = null;

/* ======== INIT ======== */
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadSettings();
    renderSheikhs();
    renderStats();
    initTasbeeh();
    renderAzkar('morning');
    renderQuranSheikhs();
    initAudio();
});

/* ======== THEME ======== */
function loadTheme() {
    const dark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    const toggle = document.getElementById('darkToggle');
    if (toggle) toggle.checked = dark;
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    document.body.classList.toggle('light', !isDark);
    localStorage.setItem('darkMode', isDark);
    const toggle = document.getElementById('darkToggle');
    if (toggle) toggle.checked = isDark;
}

/* ======== SETTINGS ======== */
function loadSettings() {
    const vib = localStorage.getItem('vibration');
    const sound = localStorage.getItem('sound');
    const vibEl = document.getElementById('vibToggle');
    const soundEl = document.getElementById('soundToggle');
    if (vibEl) vibEl.checked = vib !== 'false';
    if (soundEl) soundEl.checked = sound !== 'false';
}

function saveSetting(key, val) {
    localStorage.setItem(key, val);
}

function clearAllData() {
    if (!confirm('هل أنت متأكد من مسح جميع البيانات؟')) return;
    localStorage.clear();
    counter = 0; todayTotal = 0;
    updateCounterUI();
    renderStats();
    alert('تم مسح البيانات بنجاح');
}

/* ======== NAVIGATION ======== */
function showPage(pageId, title) {
    const pages = document.querySelectorAll('.page');
    const navBtns = document.querySelectorAll('.nav-btn');
    const backBtn = document.getElementById('backBtn');
    const pageTitleEl = document.getElementById('pageTitle');

    pages.forEach(p => {
        p.classList.remove('active');
        if (p.id !== currentPage) p.classList.add('slide-from-right');
    });

    const target = document.getElementById(pageId);
    target.classList.remove('slide-from-right');
    target.classList.add('active');
    currentPage = pageId;

    if (pageTitleEl) pageTitleEl.textContent = title;

    const isHome = pageId === 'homePage';
    if (backBtn) backBtn.style.display = isHome ? 'none' : 'flex';

    // Bottom nav active state
    navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    // Special init
    if (pageId === 'tasbeehPage') initTasbeeh();
    if (pageId === 'homePage') renderStats();
}

function goHome() {
    showPage('homePage', 'تطبيق التسبيح');
}

/* ======== SHEIKHS ======== */
function renderSheikhs() {
    const grid = document.getElementById('sheikhsGrid');
    if (!grid) return;
    grid.innerHTML = SHEIKHS.slice(0, 4).map((s, i) => sheikhCardHTML(s, i)).join('');
}

function renderQuranSheikhs() {
    const grid = document.getElementById('quranSheikhsGrid');
    if (!grid) return;
    grid.innerHTML = SHEIKHS.map((s, i) => sheikhCardHTML(s, i)).join('');
}

function sheikhCardHTML(s, i) {
    return `
  <div class="sheikh-card" style="animation-delay:${i * .07}s" onclick="openPlayer(${s.id})">
    <div class="sheikh-avatar">
        <img src="${s.image}" alt="${s.name}">
    </div>
    <div class="sheikh-info">
      <div class="sheikh-name">${s.name}</div>
      <div class="sheikh-country">🌍 ${s.country}</div>
      <button class="play-btn">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="white"/></svg>
        استمع
      </button>
    </div>
  </div>`;
}

/* ======== PLAYER ======== */
function openPlayer(sheikhId) {
    currentSheikh = SHEIKHS.find(s => s.id === sheikhId);
    if (!currentSheikh) return;

    document.getElementById('playerName').textContent = currentSheikh.name;
    document.getElementById('playerAvatar').innerHTML =
        `<img src="${currentSheikh.image}" alt="${currentSheikh.name}">`;
    document.getElementById('playerSurah').textContent = 'اختر سورة للاستماع';

    const surahList = document.getElementById('surahList');
    surahList.innerHTML = currentSheikh.surahs.map((s, i) => `
    <div class="surah-item" id="surahItem${i}" onclick="playSurah(${i},'${s}')">
      <div class="surah-num">${i + 1}</div>
      <div class="surah-name">سورة ${s.name}</div>
      <div class="surah-play">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
    </div>
  `).join('');

    showPage('playerPage', currentSheikh.name);
}

function playSurah(idx, name) {
    const surah = currentSheikh.surahs[idx];

    if (!surah) return;

    document.querySelectorAll('.surah-item')
        .forEach(el => el.classList.remove('playing'));

    document.getElementById(`surahItem${idx}`)
        ?.classList.add('playing');

    document.getElementById('playerSurah').textContent =
        'سورة ' + surah.name;

    audioEl = document.getElementById('audioPlayer');
    audioEl.src = surah.audio;
    audioEl.play().catch(() => { });
}

/* ======== TASBEEH ======== */
function initTasbeeh() {
    const sel = document.getElementById('zikrSelect');
    if (sel) {
        sel.value = selectedZikr || sel.options[0].value;
        document.getElementById('zikrDisplay').textContent = sel.value;
    }
    const t = document.getElementById('targetLabel');
    if (t) t.textContent = TARGETS[targetIdx];
    updateCounterUI();
}

function onZikrChange() {
    const sel = document.getElementById('zikrSelect');
    selectedZikr = sel.value;
    localStorage.setItem('selectedZikr', selectedZikr);
    document.getElementById('zikrDisplay').textContent = selectedZikr;
    counter = 0;
    updateCounterUI();
}

function increment() {
    counter++;
    todayTotal++;
    saveCounterData();
    updateCounterUI();
    animateBtn();
    doVibration();
    doSound();

    // Check if target reached
    const target = TARGETS[targetIdx];
    if (counter === target) {
        setTimeout(() => celebrateTarget(), 200);
    }
}

function resetCounter() {
    counter = 0;
    localStorage.setItem('tasbeehCount', '0');
    updateCounterUI();
}

function cycleTarget() {
    targetIdx = (targetIdx + 1) % TARGETS.length;
    localStorage.setItem('targetIdx', targetIdx);
    const t = document.getElementById('targetLabel');
    if (t) t.textContent = TARGETS[targetIdx];
    document.getElementById('counterTarget').textContent = '/ ' + TARGETS[targetIdx];
    updateRing();
}

function updateCounterUI() {
    const numEl = document.getElementById('counterNum');
    if (!numEl) return;
    numEl.textContent = counter;
    document.getElementById('counterTarget').textContent = '/ ' + TARGETS[targetIdx];
    document.getElementById('todayTotal').textContent = todayTotal;
    updateRing();
}

function updateRing() {
    const ring = document.getElementById('ringFill');
    if (!ring) return;
    const circumference = 2 * Math.PI * 96; // r=96
    const target = TARGETS[targetIdx];
    const progress = Math.min(counter / target, 1);
    ring.style.strokeDashoffset = circumference * (1 - progress);
}

function animateBtn() {
    const num = document.getElementById('counterNum');
    if (!num) return;
    num.classList.add('bump');
    setTimeout(() => num.classList.remove('bump'), 120);
}

function celebrateTarget() {
    const btn = document.getElementById('tapBtn');
    btn.style.background = 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)';
    btn.querySelector('span').textContent = '🎉 أحسنت! أكملت الهدف';
    setTimeout(() => {
        btn.style.background = '';
        btn.querySelector('span').textContent = 'اضغط للتسبيح';
        counter = 0;
        updateCounterUI();
    }, 2200);
}

/* ======== AUDIO & HAPTICS ======== */
function initAudio() {
    // Create short beep using Web Audio API
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        clickAudio = { ctx };
    } catch (e) { clickAudio = null; }
}

function doSound() {
    const soundOn = localStorage.getItem('sound') !== 'false';
    if (!soundOn || !clickAudio) return;
    try {
        const { ctx } = clickAudio;
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
    } catch (e) { }
}

function doVibration() {
    const vibOn = localStorage.getItem('vibration') !== 'false';
    if (!vibOn) return;
    if ('vibrate' in navigator) navigator.vibrate(18);
}

/* ======== TAP RIPPLE ======== */
document.addEventListener('click', e => {
    const btn = e.target.closest('.tap-btn');
    if (!btn) return;
    const r = document.createElement('span');
    r.className = 'ripple-el';
    const rect = btn.getBoundingClientRect();
    r.style.left = (e.clientX - rect.left) + 'px';
    r.style.top = (e.clientY - rect.top) + 'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 550);
});

/* ======== AZKAR ======== */
function switchTab(tab, el) {
    azkarTab = tab;
    document.querySelectorAll('.azkar-tabs .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderAzkar(tab);
}

function renderAzkar(tab) {
    const list = document.getElementById('azkarList');
    if (!list) return;
    const data = AZKAR[tab] || [];
    list.innerHTML = data.map((z, i) => `
    <div class="zikr-card" style="animation-delay:${i * .06}s">
      <div class="zikr-arabic">${z.arabic}</div>
      <div class="zikr-meta">
        <span class="zikr-repeat">${z.repeat > 1 ? z.repeat + ' مرات' : 'مرة واحدة'}</span>
        <span class="zikr-source">رواه ${z.source}</span>
      </div>
    </div>
  `).join('');
}

/* ======== STATS ======== */
function renderStats() {
    const row = document.getElementById('statsRow');
    if (!row) return;
    const today = getTodayTotal();
    const total = parseInt(localStorage.getItem('allTimeTotal') || '0');
    const streak = parseInt(localStorage.getItem('streak') || '1');

    row.innerHTML = `
    <div class="stat-card" style="animation-delay:.05s">
      <div class="stat-num">${today}</div>
      <div class="stat-label">تسبيحات اليوم</div>
    </div>
    <div class="stat-card" style="animation-delay:.10s">
      <div class="stat-num">${total}</div>
      <div class="stat-label">إجمالي التسبيحات</div>
    </div>
    <div class="stat-card" style="animation-delay:.15s">
      <div class="stat-num">${streak}</div>
      <div class="stat-label">أيام متتالية</div>
    </div>
  `;
}

/* ======== PERSISTENCE ======== */
function saveCounterData() {
    localStorage.setItem('tasbeehCount', counter);
    const allTime = parseInt(localStorage.getItem('allTimeTotal') || '0') + 1;
    localStorage.setItem('allTimeTotal', allTime);
    saveTodayTotal();
}

function saveTodayTotal() {
    const today = dateKey();
    localStorage.setItem('todayDate', today);
    const current = parseInt(localStorage.getItem('todayCount') || '0');
    localStorage.setItem('todayCount', current + 1);
    todayTotal = current + 1;
}

function getTodayTotal() {
    const stored = localStorage.getItem('todayDate');
    const today = dateKey();
    if (stored !== today) {
        localStorage.setItem('todayDate', today);
        localStorage.setItem('todayCount', '0');
        return 0;
    }
    return parseInt(localStorage.getItem('todayCount') || '0');
}

function dateKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// Donations & Support
function openDonate() {
    window.open("http://vf.eg/vfcash?id=mt&qrId=6OBNT8", "_blank");
}
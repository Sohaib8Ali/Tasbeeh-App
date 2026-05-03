/* =========================================
   ALL RECITERS PAGE — reciters.js
   Standalone. Does NOT modify existing code.
   ========================================= */

const ALL_RECITERS = [
    {
        id: 1, name: 'الشيخ محمد اللحيدان', country: 'السعودية', emoji: '🎙️',
        surahs: ['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة'],
        image: 'assets/muhammad_luhaidan/logo.jpg'
    },
    {
        id: 2, name: 'الشيخ رعد الكردي', country: 'العراق', emoji: '🎤',
        surahs: ['الفاتحة', 'يس', 'الكهف', 'الرحمن', 'الواقعة'],
        image: 'assets/raad_alkurdi/logo.jpg'
    },
];

let arFiltered = [...ALL_RECITERS];

/* ---- Render ---- */
function arRender(list) {
    const grid = document.getElementById('arGrid');
    const empty = document.getElementById('arEmpty');
    const count = document.getElementById('arCountLabel');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'flex';
        count.textContent = 'لا توجد نتائج';
        return;
    }

    empty.style.display = 'none';
    count.textContent = `${list.length} مقرئ`;

    grid.innerHTML = list.map((r, i) => `
    <div class="ar-card" style="animation-delay:${Math.min(i, 12) * .04}s"
         onclick="arOpenPlayer(${r.id})">
      <div class="ar-avatar">
        <img src="${r.image}" alt="${r.name}">
      </div>
      <div class="ar-info">
        <div class="ar-name">${r.name}</div>
        <div class="ar-meta">
          <span class="ar-country">🌍 ${r.country}</span>
        </div>
        <button class="play-btn ar-play-btn">
          <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="white"/></svg>
          استمع
        </button>
      </div>
    </div>
  `).join('');
}

/* ---- Search / Filter ---- */
function arFilterReciters() {
    const val = document.getElementById('arSearchInput').value.trim();
    const clearBtn = document.getElementById('arClearBtn');
    clearBtn.style.display = val ? 'flex' : 'none';

    const q = val.toLowerCase();
    arFiltered = ALL_RECITERS.filter(r =>
        r.name.includes(val) ||
        r.country.includes(val) ||
        r.style.includes(val)
    );
    arRender(arFiltered);
}

function arClearSearch() {
    const input = document.getElementById('arSearchInput');
    input.value = '';
    document.getElementById('arClearBtn').style.display = 'none';
    arFiltered = [...ALL_RECITERS];
    arRender(arFiltered);
    input.focus();
}

/* ---- Open player (reuses existing openPlayer if sheikh exists, else shows alert) ---- */
function arOpenPlayer(id) {
    // Try to reuse the existing player for the first 4 sheikhs
    if (typeof openPlayer === 'function' && id <= 4) {
        openPlayer(id);
        return;
    }
    // For extended reciters: show a friendly stub
    const reciter = ALL_RECITERS.find(r => r.id === id);
    if (!reciter) return;

    // Populate the existing player page fields and navigate
    const playerName = document.getElementById('playerName');
    const playerAvatar = document.getElementById('playerAvatar');
    const playerSurah = document.getElementById('playerSurah');
    const surahList = document.getElementById('surahList');

    if (playerName) playerName.textContent = reciter.name;
    if (playerAvatar) playerAvatar.textContent = reciter.emoji;
    if (playerSurah) playerSurah.textContent = 'اختر سورة للاستماع';

    const surahs = ['الفاتحة', 'البقرة', 'آل عمران', 'يس', 'الكهف', 'الرحمن', 'الواقعة', 'الملك'];
    if (surahList) {
        surahList.innerHTML = surahs.map((s, i) => `
      <div class="surah-item" id="arSurahItem${i}" onclick="arPlaySurah(${i},'${s}')">
        <div class="surah-num">${i + 1}</div>
        <div class="surah-name">سورة ${s}</div>
        <div class="surah-play">
          <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    `).join('');
    }

    if (typeof showPage === 'function') showPage('playerPage', reciter.name);
}

function arPlaySurah(idx, name) {
    const samples = [
        '/assets/muhammad_luhaidan/تلاوة/الفاتحه.mp4',
    ];
    document.querySelectorAll('.surah-item').forEach(el => el.classList.remove('playing'));
    const el = document.getElementById(`arSurahItem${idx}`);
    if (el) el.classList.add('playing');

    const playerSurah = document.getElementById('playerSurah');
    if (playerSurah) playerSurah.textContent = 'سورة ' + name;

    const audio = document.getElementById('audioPlayer');
    if (audio) {
        audio.src = samples[idx % samples.length];
        audio.play().catch(() => { });
    }
}

/* ---- Init when page becomes visible ---- */
// Patch showPage to init arGrid whenever allRecitersPage is shown
(function patchShowPage() {
    const _orig = window.showPage;
    window.showPage = function (pageId, title) {
        _orig(pageId, title);
        if (pageId === 'allRecitersPage') {
            // Reset search state on every open
            const input = document.getElementById('arSearchInput');
            if (input) input.value = '';
            const clearBtn = document.getElementById('arClearBtn');
            if (clearBtn) clearBtn.style.display = 'none';
            arFiltered = [...ALL_RECITERS];
            arRender(arFiltered);
        }
    };
})();
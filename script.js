/* =========================================================
   REVI & IRWAN — DIGITAL WEDDING INVITATION
   script.js — vanilla JS, no dependencies
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 1. GUEST NAME FROM URL ---------- */
  function initGuestName() {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const el = document.getElementById('guestName');
    if (to && el) {
      el.textContent = decodeURIComponent(to.replace(/\+/g, ' '));
    }
  }

  /* ---------- 2. LOADER ---------- */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 400);
    });
    // Fallback in case 'load' already fired or is delayed
    setTimeout(() => loader.classList.add('is-hidden'), 3500);
  }

  /* ---------- 3. OPEN INVITATION ---------- */
  function initOpenInvitation() {
    const openBtn = document.getElementById('openInvitation');
    const cover = document.getElementById('cover');
    const main = document.getElementById('mainContent');
    const nav = document.getElementById('floatingNav');
    const music = document.getElementById('bgMusic');

    if (!openBtn) return;

openBtn.addEventListener('click', () => {
  cover.style.display = 'none';   // paksa hilang total, tidak ikut alur halaman
  main.removeAttribute('hidden');
  nav.classList.add('is-visible');
  window.scrollTo({ top: 0 });

  if (music) {
    music.volume = 0.6;
    music.play().catch(() => {});
    updateMusicIcon(true);
  }

  // beri jeda sepersekian detik agar browser selesai
  // menghapus cover sebelum auto-scroll mulai berjalan
  setTimeout(() => AutoScroll.start(), 50);
});
  }

  /* ---------- 4. MUSIC TOGGLE ---------- */
  function updateMusicIcon(isPlaying) {
    const btn = document.getElementById('musicToggle');
    if (!btn) return;
    btn.querySelector('.icon-play').hidden = isPlaying;
    btn.querySelector('.icon-pause').hidden = !isPlaying;
    btn.setAttribute('aria-pressed', String(isPlaying));
  }

  function initMusicToggle() {
    const btn = document.getElementById('musicToggle');
    const music = document.getElementById('bgMusic');
    if (!btn || !music) return;

    btn.addEventListener('click', () => {
      if (music.paused) {
        music.play().catch(() => {});
        updateMusicIcon(true);
      } else {
        music.pause();
        updateMusicIcon(false);
      }
    });
  }

  /* ---------- 5. COUNTDOWN TIMER ---------- */
  function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;
    const target = new Date(el.dataset.target).getTime();

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-minutes');
    const sEl = document.getElementById('cd-seconds');

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      dEl.textContent = pad(days);
      hEl.textContent = pad(hours);
      mEl.textContent = pad(minutes);
      sEl.textContent = pad(seconds);
    }

    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ---------- 6. COPY GIFT NUMBER ---------- */
  function initCopyGift() {
    const btn = document.getElementById('copyGift');
    const number = document.getElementById('giftNumber');
    const feedback = document.getElementById('copyFeedback');
    if (!btn || !number) return;

    btn.addEventListener('click', async () => {
      const raw = number.textContent.replace(/\s/g, '');
      try {
        await navigator.clipboard.writeText(raw);
        feedback.textContent = 'Nomor rekening berhasil disalin.';
      } catch (err) {
        feedback.textContent = 'Gagal menyalin, silakan salin manual.';
      }
      setTimeout(() => (feedback.textContent = ''), 2500);
    });
  }

  /* ---------- 7. RSVP WHATSAPP LINK ---------- */
  function initWhatsapp() {
    const link = document.getElementById('whatsappBtn');
    if (!link) return;
    const phone = '6281378378090'; // dummy — ganti dengan nomor asli
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to') ? decodeURIComponent(params.get('to').replace(/\+/g, ' ')) : '';

    const message =
      `Assalamu'alaikum, saya${guest ? ' ' + guest : ''} ingin mengkonfirmasi kehadiran ` +
      `pada acara pernikahan Revi & Irwan, Jumat 17 Juli 2026. Terima kasih.`;

    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  /* ---------- 8. UCAPAN (localStorage) ---------- */
  const WISH_KEY = 'revi-irwan-wishes';

  function loadWishes() {
    try {
      return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveWishes(wishes) {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishes));
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderWishes() {
    const list = document.getElementById('wishList');
    if (!list) return;
    const wishes = loadWishes();

    if (wishes.length === 0) {
      list.innerHTML = '<li class="wish-empty">Jadilah yang pertama mengirimkan ucapan &amp; doa.</li>';
      return;
    }

    list.innerHTML = wishes
      .slice()
      .reverse()
      .map(
        (w) => `
        <li class="wish-item">
          <p class="wish-item-name">${escapeHTML(w.name)}</p>
          <p class="wish-item-message">${escapeHTML(w.message)}</p>
        </li>`
      )
      .join('');
  }

  function initWishForm() {
    const form = document.getElementById('wishForm');
    if (!form) return;

    renderWishes();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('wishName').value.trim();
      const message = document.getElementById('wishMessage').value.trim();
      if (!name || !message) return;

      const wishes = loadWishes();
      wishes.push({ name, message, date: new Date().toISOString() });
      saveWishes(wishes);
      renderWishes();
      form.reset();
    });
  }

  /* ---------- 9. SCROLL PROGRESS BAR ---------- */
  function initProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- 10. ACTIVE NAV ON SCROLL + SMOOTH SCROLL ---------- */
  function initNav() {
    const links = document.querySelectorAll('.floating-nav a[data-nav]');
    if (!links.length) return;

    const sections = Array.from(links)
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          AutoScroll.stop();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    function setActive() {
      let current = sections[0];
      const scrollPos = window.scrollY + window.innerHeight * 0.3;

      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollPos) current = sec;
      });

      links.forEach((link) => {
        const isActive = link.getAttribute('href') === '#' + current.id;
        link.classList.toggle('active', isActive);
      });
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  /* ---------- 11. FADE-IN ON SCROLL (IntersectionObserver) ---------- */
  function initRevealAnimations() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- 12. AUTO-SCROLL BETWEEN SECTIONS ---------- */
  /*
     Setelah tombol "Buka Undangan" ditekan, halaman akan otomatis
     scroll perlahan menyusuri setiap section. Auto-scroll berhenti
     permanen segera setelah pengguna melakukan interaksi manual
     (scroll wheel, sentuhan/drag, atau menekan tombol navigasi).
  */
  const AutoScroll = (function () {
    let rafId = null;
    let active = false;
    const SPEED = 1.75; // px per frame — kecepatan scroll otomatis, sesuaikan jika perlu

    function step() {
      if (!active) return;
      window.scrollBy(0, SPEED);

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (atBottom) {
        stop();
        return;
      }
      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (active) return;
      active = true;
      rafId = requestAnimationFrame(step);
    }

    function stop() {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    function bindInterruptListeners() {
      const stopEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
      stopEvents.forEach((evt) =>
        window.addEventListener(evt, () => stop(), { passive: true, once: false })
      );
    }

    bindInterruptListeners();

    return { start, stop };
  })();

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initGuestName();
    initLoader();
    initOpenInvitation();
    initMusicToggle();
    initCountdown();
    initCopyGift();
    initWhatsapp();
    initWishForm();
    initProgressBar();
    initNav();
    initRevealAnimations();
  });

  // expose for potential inline debugging (not required in production)
  window.AutoScroll = AutoScroll;
})();

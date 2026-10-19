(() => {
  'use strict';
  const c = window.ULIDO_CONFIG || {};
  const $ = id => document.getElementById(id);
  const validColor = value => /^#[0-9a-fA-F]{3,8}$/.test(value || '');
  if (validColor(c.backgroundColor)) document.body.style.backgroundColor = c.backgroundColor;
  if (validColor(c.goldColor)) document.documentElement.style.setProperty('--gold', c.goldColor);
  const guestFromUrl = new URLSearchParams(location.search).get('to');
  const guest = (guestFromUrl || c.defaultGuest || 'Bapak/Ibu/Saudara/i').trim().slice(0,150);
  const couple = c.couple || 'Undangan Digital';
  $('couple').textContent = couple;
  $('endCouple').textContent = couple;
  $('coverLabel').textContent = c.coverLabel || 'UNDANGAN SPESIAL';
  $('guestLabel').textContent = c.guestLabel || 'Kepada Yth.';
  $('guestName').textContent = guest;
  document.title = `${couple} — Undangan Digital`;
  if (c.coverIcon) {
    const logo = document.createElement('img');
    logo.src = c.coverIcon;
    logo.alt = '';
    $('coverIcon').replaceChildren(logo);
  }
  const pages = Array.isArray(c.pages) ? c.pages.filter(p => typeof p === 'string' && p.trim()) : [];
  const pageContainer = $('pages');
  if (!pages.length) pageContainer.innerHTML = '<div class="page-fallback">Belum ada gambar. Tambahkan daftar pages di config.js.</div>';
  pages.forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'invitation-page';
    img.src = src;
    img.alt = `Halaman undangan ${i + 1}`;
    img.loading = i < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'page-fallback';
      fallback.textContent = `Gambar halaman ${i + 1} tidak ditemukan: ${src}`;
      img.replaceWith(fallback);
    });
    pageContainer.appendChild(img);
  });
  // Lokasi Pemberkatan
const pemberkatan = $('mapsPemberkatan');

if (c.mapsPemberkatan &&
    /^https:\/\//i.test(c.mapsPemberkatan)) {
  pemberkatan.href = c.mapsPemberkatan;
  pemberkatan.hidden = false;
}

// Lokasi Resepsi dan Pesta Adat
const resepsi = $('mapsResepsi');

if (c.mapsResepsi &&
    /^https:\/\//i.test(c.mapsResepsi)) {
  resepsi.href = c.mapsResepsi;
  resepsi.hidden = false;
}
  const wa = $('waLink');
  const waNumber = String(c.whatsappNumber || '').replace(/\D/g, '');
  if (waNumber) { wa.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(c.whatsappMessage || '')}`; wa.hidden = false; }
  const audio = $('backgroundAudio');
  const musicBtn = $('musicBtn');
  let hasMusic = !!c.backgroundMusic;
  if (hasMusic) { audio.src = c.backgroundMusic; audio.volume = Math.max(0, Math.min(1, Number(c.musicVolume ?? 0.55))); }
  else musicBtn.hidden = true;
  const syncMusic = () => { const playing = !audio.paused; musicBtn.setAttribute('aria-pressed', String(playing)); musicBtn.title = playing ? 'Jeda musik' : 'Putar musik'; };
  async function playMusic() { if (!hasMusic) return; try { await audio.play(); } catch { syncMusic(); } syncMusic(); }
  audio.addEventListener('pause', syncMusic);
  audio.addEventListener('play', syncMusic);
  audio.addEventListener('error', () => { hasMusic = false; musicBtn.hidden = true; });
  musicBtn.addEventListener('click', () => audio.paused ? playMusic() : audio.pause());
  $('topBtn').addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  $('openBtn').addEventListener('click', () => {
    $('invitation').hidden = false;
    $('floatingActions').hidden = false;
    $('welcome').classList.add('welcome--closing');
    window.scrollTo(0, 0);
    playMusic();
    // Hapus cover dari alur navigasi setelah transisi.
    setTimeout(() => { $('welcome').hidden = true; }, 800);
  }, { once: true });
})();

/* ==========================================================
   PIXEL MAGIC & INTERACTION SCRIPT - FOR NEI 🌸☁️🌹
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const particlesContainer = document.getElementById('particles-container');
  const skyContainer = document.querySelector('.sky-container');
  const toastEl = document.getElementById('pixelToast');

  // Audio Context State
  let audioCtx = null;
  let bgmPlaying = false;
  let bgmInterval = null;
  let sfxEnabled = true;

  // --------------------------------------------------------
  // 1. CLOUD GENERATION (Drifting Pixel Clouds)
  // --------------------------------------------------------
  const cloudCount = 6;
  const cloudSrc = 'images/cloud.svg';

  for (let i = 0; i < cloudCount; i++) {
    createCloud(i);
  }

  function createCloud(index) {
    const cloud = document.createElement('img');
    cloud.src = cloudSrc;
    cloud.className = 'cloud';
    cloud.alt = 'Awan Pixel';

    // Randomize size, position, duration, and delay
    const scale = 1.2 + Math.random() * 1.6;
    const top = 5 + (index * 15) + (Math.random() * 8);
    const duration = 28 + Math.random() * 25;
    const delay = -(Math.random() * duration);

    cloud.style.top = `${top}%`;
    cloud.style.width = `${scale * 45}px`;
    cloud.style.animationDuration = `${duration}s`;
    cloud.style.animationDelay = `${delay}s`;
    cloud.style.opacity = `${0.65 + Math.random() * 0.35}`;

    skyContainer.appendChild(cloud);
  }

  // --------------------------------------------------------
  // 2. FALLING PETALS & HEARTS RAIN
  // --------------------------------------------------------
  const particleTypes = [
    { src: 'images/heart.svg', size: 16 },
    { src: 'images/rose.svg', size: 20 },
    { src: 'images/sparkle.svg', size: 14 }
  ];

  function spawnFallingParticle() {
    if (!particlesContainer) return;
    const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    const p = document.createElement('img');
    p.src = type.src;
    p.className = 'floating-particle';
    p.alt = 'Pixel Particle';

    const left = Math.random() * 100;
    const duration = 7 + Math.random() * 6;
    const sizeMultiplier = 0.8 + Math.random() * 0.8;
    const finalSize = type.size * sizeMultiplier;

    p.style.left = `${left}%`;
    p.style.width = `${finalSize}px`;
    p.style.height = `${finalSize}px`;
    p.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, duration * 1000);
  }

  // Continuous gentle particle fall
  setInterval(spawnFallingParticle, 1200);

  // --------------------------------------------------------
  // 3. INTERACTIVE CLICK POP EFFECT (HEARTS & SPARKLES)
  // --------------------------------------------------------
  document.addEventListener('click', (e) => {
    // Avoid double spawning on buttons with custom actions
    spawnClickHeart(e.clientX, e.clientY);
  });

  function spawnClickHeart(x, y) {
    const burstCount = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < burstCount; i++) {
      const heart = document.createElement('img');
      const isRose = Math.random() > 0.65;
      heart.src = isRose ? 'images/rose.svg' : 'images/heart.svg';
      heart.className = 'click-heart';

      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      const size = 16 + Math.random() * 14;

      heart.style.left = `${x + offsetX}px`;
      heart.style.top = `${y + offsetY}px`;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 800);
    }
  }

  // --------------------------------------------------------
  // 4. RETRO 8-BIT AUDIO SYNTHESIZER (WEB AUDIO API)
  // --------------------------------------------------------
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play a retro blip/chime SFX
  function playTone(freq, duration, type = 'square', gainVal = 0.08) {
    if (!sfxEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function playSuccessSfx() {
    playTone(523.25, 0.1, 'triangle', 0.1); // C5
    setTimeout(() => playTone(659.25, 0.1, 'triangle', 0.1), 80); // E5
    setTimeout(() => playTone(783.99, 0.18, 'triangle', 0.12), 160); // G5
    setTimeout(() => playTone(1046.50, 0.25, 'triangle', 0.14), 240); // C6
  }

  function playHeartSfx() {
    playTone(659.25, 0.08, 'square', 0.05); // E5
    setTimeout(() => playTone(880, 0.15, 'square', 0.07), 60); // A5
  }

  // Romantic 8-Bit Chiptune Melody (Nostalgic Love Theme)
  const melodyNotes = [
    // Note, Duration(s)
    { f: 523.25, d: 0.3 }, // C5
    { f: 659.25, d: 0.3 }, // E5
    { f: 783.99, d: 0.4 }, // G5
    { f: 659.25, d: 0.3 }, // E5
    { f: 880.00, d: 0.5 }, // A5
    { f: 783.99, d: 0.5 }, // G5
    { f: 698.46, d: 0.4 }, // F5
    { f: 659.25, d: 0.4 }, // E5
    { f: 587.33, d: 0.6 }, // D5
    { f: 523.25, d: 0.3 }, // C5
    { f: 587.33, d: 0.3 }, // D5
    { f: 659.25, d: 0.5 }, // E5
    { f: 523.25, d: 0.7 }  // C5
  ];

  let currentNoteIdx = 0;
  function startBgm() {
    initAudio();
    bgmPlaying = true;
    const bgmBtn = document.getElementById('toggleBgmBtn');
    if (bgmBtn) {
      bgmBtn.innerHTML = '🎵 BGM: ON';
      bgmBtn.style.background = '#ffd166';
    }

    function step() {
      if (!bgmPlaying) return;
      const note = melodyNotes[currentNoteIdx];
      playTone(note.f, note.d * 0.9, 'triangle', 0.05);
      currentNoteIdx = (currentNoteIdx + 1) % melodyNotes.length;
      bgmInterval = setTimeout(step, note.d * 1000);
    }
    step();
  }

  function stopBgm() {
    bgmPlaying = false;
    clearTimeout(bgmInterval);
    const bgmBtn = document.getElementById('toggleBgmBtn');
    if (bgmBtn) {
      bgmBtn.innerHTML = '🎵 BGM: OFF';
      bgmBtn.style.background = '#ffffff';
    }
  }

  const toggleBgmBtn = document.getElementById('toggleBgmBtn');
  if (toggleBgmBtn) {
    toggleBgmBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgmPlaying) {
        stopBgm();
      } else {
        startBgm();
      }
    });
  }

  // --------------------------------------------------------
  // 5. SEND LOVE / HEART RAIN COUNTER
  // --------------------------------------------------------
  let loveCount = parseInt(localStorage.getItem('nei_love_count') || '999');
  const loveCounterEl = document.getElementById('loveCounter');
  const sendLoveBtn = document.getElementById('sendLoveBtn');

  if (loveCounterEl) {
    loveCounterEl.textContent = loveCount.toLocaleString();
  }

  if (sendLoveBtn) {
    sendLoveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      loveCount++;
      if (loveCounterEl) {
        loveCounterEl.textContent = loveCount.toLocaleString();
      }
      localStorage.setItem('nei_love_count', loveCount.toString());
      playHeartSfx();

      // Trigger a rain of 15 hearts!
      for (let i = 0; i < 15; i++) {
        setTimeout(spawnFallingParticle, i * 60);
      }

      showToast('Cinta terkirim untuk Nei! 💖✨');
    });
  }

  // --------------------------------------------------------
  // 6. PHOTO GALLERY & LIGHTBOX MODAL
  // --------------------------------------------------------
  const photos = [
    {
      src: 'images/photo_1.jpg',
      caption: '🌸 Senyum Cantik Nei',
      note: 'Setiap senyumanmu selalu berhasil membuat hari menjadi jauh lebih indah dan penuh warna.'
    },
    {
      src: 'images/photo_2.jpg',
      caption: '🌹 Anggun Seperti Bunga Mawar',
      note: 'Kecantikan dan kebaikan hatimu merekah sempurna, tak ada yang bisa menandingi pesonamu.'
    },
    {
      src: 'images/photo_3.jpg',
      caption: '✨ Pesona Tak Terlupakan',
      note: 'Melihatmu selalu membawa ketenangan dan rasa hangat di dalam hati.'
    },
    {
      src: 'images/photo_4.jpg',
      caption: '☁️ Selembut Awan Putih',
      note: 'Hatimu tulus dan lembut, membuat siapapun di dekatmu merasa bersyukur memilikimu.'
    },
    {
      src: 'images/photo_5.jpg',
      caption: '💖 Momen Paling Manis',
      note: 'Kenangan manis yang abadi di dunia pixel yang tak akan pernah pudar.'
    },
    {
      src: 'images/photo_6.jpg',
      caption: '⭐ Bidadari Terindah',
      note: 'Terima kasih telah hadir dan menjadi alasan di balik indahnya dunia ini.'
    }
  ];

  let currentPhotoIdx = 0;
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalNote = document.getElementById('modalNote');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const prevBtn = document.getElementById('prevPhotoBtn');
  const nextBtn = document.getElementById('nextPhotoBtn');

  function openModal(index) {
    currentPhotoIdx = index;
    const photo = photos[currentPhotoIdx];
    modalImg.src = photo.src;
    modalCaption.textContent = photo.caption;
    if (modalNote) modalNote.textContent = photo.note;
    modal.classList.add('active');
    playSuccessSfx();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  function nextPhoto() {
    currentPhotoIdx = (currentPhotoIdx + 1) % photos.length;
    openModal(currentPhotoIdx);
  }

  function prevPhoto() {
    currentPhotoIdx = (currentPhotoIdx - 1 + photos.length) % photos.length;
    openModal(currentPhotoIdx);
  }

  // Attach card event listeners
  document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-idx') || '0');
      openModal(idx);
    });
  });

  document.querySelectorAll('.polaroid-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on like button
      if (e.target.closest('.like-btn')) return;
      const idx = parseInt(card.getAttribute('data-idx') || '0');
      openModal(idx);
    });
  });

  document.querySelectorAll('.like-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const countSpan = btn.querySelector('.like-count');
      let count = parseInt(countSpan.textContent || '0');
      count++;
      countSpan.textContent = count;
      btn.style.color = '#c9184a';
      playHeartSfx();
      spawnClickHeart(e.clientX, e.clientY);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevPhoto(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextPhoto(); });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // --------------------------------------------------------
  // 7. INTERACTIVE ROSE GARDEN
  // --------------------------------------------------------
  const roseQuotes = [
    '🌹 Bunga mawar ini mekar khusus untuk Nei yang selalu mempesona!',
    '💖 Senyum kamu adalah hal paling berharga di dunia ini!',
    '✨ Tetap jadi Nei yang selalu ceria dan penuh cinta ya!',
    '🌸 Keindahan mawar masih kalah jauh dibandingkan anggunnya kamu!',
    '☁️ Semoga hari-harimu selalu selembut dan secerah awan bahagia!',
    '💌 Hatiku selalu dipenuhi doa dan cinta terbaik untukmu, Nei!'
  ];

  const gardenBanner = document.getElementById('gardenBanner');
  document.querySelectorAll('.garden-pot').forEach((pot, index) => {
    pot.addEventListener('click', (e) => {
      e.stopPropagation();
      playSuccessSfx();
      spawnClickHeart(e.clientX, e.clientY);

      const quote = roseQuotes[index % roseQuotes.length];
      if (gardenBanner) {
        gardenBanner.textContent = quote;
        gardenBanner.style.animation = 'none';
        setTimeout(() => {
          gardenBanner.style.animation = 'popFloat 0.3s ease-out';
        }, 10);
      }

      pot.classList.add('bloomed');
      showToast('Bunga mawar berhasil disiram & mekar! 🌹✨');
    });
  });

  // --------------------------------------------------------
  // 8. QR CODE LINK COPY & TOAST
  // --------------------------------------------------------
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const siteUrl = 'https://zakiyullah603-sys.github.io/foto-nei/';

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(siteUrl).then(() => {
        playSuccessSfx();
        showToast('Link website berhasil disalin! 📋✨');
      }).catch(() => {
        showToast('Website: ' + siteUrl);
      });
    });
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }
});

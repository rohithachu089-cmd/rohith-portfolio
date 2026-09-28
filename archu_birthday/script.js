/**
 * ARCHU'S BIRTHDAY WEBSITE — CORE ENGINE
 * Interactive Memory Book, Web Audio Synth, Lightbox & Visualizers
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize State & Configurations
  const config = window.ARCHU_CONFIG || {};
  let isPlayingAudio = false;
  let audioContext = null;
  let synthGainNode = null;
  let synthInterval = null;
  let currentLightboxIndex = 0;
  let allGalleryItems = [];

  // DOM Elements
  const preloader = document.getElementById("preloader");
  const preloaderBar = document.getElementById("preloader-bar");
  const enterBtn = document.getElementById("enter-btn");
  const topNav = document.querySelector(".top-nav");
  const timelineProgress = document.getElementById("timeline-progress");
  const memoryCardsContainer = document.getElementById("memory-cards-container");
  const galleryGrid = document.getElementById("gallery-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Audio Player Elements
  const audioPlayer = document.getElementById("audio-player");
  const audioToggleBtn = document.getElementById("audio-toggle-btn");
  const audioStatusLabel = document.getElementById("audio-status-label");
  const audioVolume = document.getElementById("audio-volume");
  const bgAudio = document.getElementById("bg-audio");
  const audioTrackTitle = document.getElementById("audio-track-title");
  const audioTrackSub = document.getElementById("audio-track-sub");

  // Lightbox Elements
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  // Secret Modal Elements
  const secretModal = document.getElementById("secret-modal");
  const secretStarBtn = document.getElementById("secret-star-btn");
  const secretClose = document.getElementById("secret-close");
  const letterWaxSeal = document.getElementById("letter-wax-seal");
  const secretTitle = document.getElementById("secret-title");
  const secretMessage = document.getElementById("secret-message");

  // Letter & Replay
  const letterFontBtn = document.getElementById("letter-font-btn");
  const letterBody = document.getElementById("letter-body");
  const replayBtn = document.getElementById("replay-btn");

  // Sunrise Interactive Widget Elements
  const sunriseSlider = document.getElementById("sunrise-slider");
  const skyNight = document.getElementById("sky-night");
  const skyDawn = document.getElementById("sky-dawn");
  const sunriseSun = document.getElementById("sunrise-sun");
  const sunriseStatusText = document.getElementById("sunrise-status-text");

  /* ==========================================================================
     1. PRELOADER & CINEMATIC INTRO
     ========================================================================== */
  let progress = 0;
  let hasInteracted = false;
  const preloaderHint = document.getElementById("preloader-hint");

  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 12;
    if (progress > 100) progress = 100;
    if (preloaderBar) preloaderBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(loadInterval);
      if (enterBtn) {
        enterBtn.classList.add("visible");
        if (preloaderHint) preloaderHint.style.opacity = "1";
      }

      // Auto-unlock smoothly after 3.5s if not clicked
      setTimeout(() => {
        if (preloader && !preloader.classList.contains("fade-out")) {
          finishPreloader();
        }
      }, 3500);
    }
  }, 80);

  function finishPreloader() {
    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
      document.body.classList.remove("is-loading");
      triggerScrollReveals();

      if (hasInteracted && !isPlayingAudio && config.audio && config.audio.enabled) {
        playAudio();
      }
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      hasInteracted = true;
      finishPreloader();
      playAudio();
    });
  }

  // Tap anywhere on the preloader screen to enter and start song
  if (preloader) {
    preloader.addEventListener("click", () => {
      hasInteracted = true;
      finishPreloader();
      playAudio();
    });
  }

  // Seamless unlock on first user gesture anywhere on the page
  function triggerAudioOnFirstGesture(e) {
    if (e && e.target && e.target.closest && e.target.closest("#audio-player")) {
      return; // Handled directly by the player toggle button
    }
    hasInteracted = true;
    window.removeEventListener("pointerdown", triggerAudioOnFirstGesture);
    window.removeEventListener("keydown", triggerAudioOnFirstGesture);

    if (!isPlayingAudio && config.audio && config.audio.enabled) {
      playAudio();
    }
  }
  window.addEventListener("pointerdown", triggerAudioOnFirstGesture);
  window.addEventListener("keydown", triggerAudioOnFirstGesture);

  /* ==========================================================================
     2. DYNAMIC CONTENT RENDERING
     ========================================================================== */

  // Render "Things I Remember" Sensory Cards
  if (memoryCardsContainer && config.rememberCards) {
    const iconMap = {
      bike: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 9l3-3h3l2 4"/></svg>`,
      chat: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      road: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19L9 5M20 19L15 5M12 5v2m0 5v2m0 5v2"/></svg>`,
      sunrise: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>`,
      mountain: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/><path d="M4.15 18h15.7M9 10l2.5 3.5"/></svg>`,
      waves: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
      sparkles: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l1.9 4.8L19 9.7l-3.8 3.5 1.1 5.1-4.3-2.5-4.3 2.5 1.1-5.1L5 9.7l5.1-1.9L12 3z"/></svg>`,
      heart: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      bus: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="15" rx="3"/><path d="M3 10h18M7 18v3M17 18v3M7 14h.01M17 14h.01"/></svg>`
    };

    memoryCardsContainer.innerHTML = config.rememberCards.map((card, idx) => `
      <div class="memory-card reveal-fade-up" style="transition-delay: ${idx * 0.08}s">
        <div class="card-top-row">
          <div class="memory-icon-wrap">
            ${iconMap[card.icon] || '✦'}
          </div>
          <span class="memory-num">0${idx + 1}</span>
        </div>
        <h3 class="memory-card-title">${card.title}</h3>
        <p class="memory-card-sub">${card.subtitle}</p>
        <p class="memory-card-details">${card.details}</p>
      </div>
    `).join("");
  }

  // Render Photo Gallery
  if (galleryGrid && config.gallery) {
    allGalleryItems = config.gallery;
    renderGallery(allGalleryItems);
  }

  function renderGallery(items) {
    if (!galleryGrid) return;

    // Random slight rotation for polaroid items
    const rotations = [-2.5, 1.8, -1.5, 2.2, -2.0, 1.5, -1.8, 2.0, -1.2, 1.6, -2.2];

    galleryGrid.innerHTML = items.map((item, index) => {
      const rot = rotations[index % rotations.length];
      if (item.type === "cinematic") {
        const isVideo = item.src.endsWith(".mp4") || item.src.includes("video");
        return `
          <div class="gallery-item cinematic-card ${index % 4 === 1 ? 'wide-card' : ''} ${isVideo ? 'video-card' : ''} reveal-fade-up" 
               data-type="cinematic" 
               data-src="${item.src}" 
               data-caption="${item.caption}">
            <div class="cinematic-img-wrap">
              ${isVideo ? `
                <video src="${item.src}" poster="${item.poster || ''}" autoplay loop muted playsinline></video>
                <div class="video-play-hint">
                  <div class="play-circle-icon">▶</div>
                </div>
              ` : `
                <img src="${item.src}" alt="${item.caption}" loading="lazy">
              `}
            </div>
            <div class="cinematic-overlay">
              <span class="cinematic-tag">${item.tag || (isVideo ? 'Video Memory' : 'Memory')}</span>
              <p class="cinematic-caption">${item.caption}</p>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="gallery-item polaroid-card reveal-fade-up" 
               style="transform: rotate(${rot}deg);" 
               data-type="polaroid" 
               data-src="${item.src}" 
               data-caption="${item.caption}">
            <div class="polaroid-tape"></div>
            <div class="polaroid-img-wrap">
              <img src="${item.src}" alt="${item.caption}" loading="lazy">
            </div>
            <div class="polaroid-footer">
              <p class="polaroid-caption">${item.caption}</p>
              <p class="polaroid-date">${item.date}</p>
            </div>
          </div>
        `;
      }
    }).join("");

    // Attach click listeners to all gallery items
    attachLightboxListeners();
    triggerScrollReveals();
  }

  // Gallery Filter Tabs
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      if (filter === "all") {
        renderGallery(allGalleryItems);
      } else {
        const filtered = allGalleryItems.filter(item => item.type === filter);
        renderGallery(filtered);
      }
    });
  });

  /* ==========================================================================
     3. AUDIO SYSTEM & AMBIENT PIANO SYNTHESIZER
     ========================================================================== */

  // If user provides a real mp3 path, use HTML5 audio; otherwise use Web Audio Synth!
  if (config.audio) {
    if (audioTrackTitle && config.audio.title) audioTrackTitle.textContent = config.audio.title;
    if (audioTrackSub && config.audio.artist) audioTrackSub.textContent = config.audio.artist;
    if (audioVolume && config.audio.defaultVolume) audioVolume.value = config.audio.defaultVolume;
  }

  // Synchronize audio element state with UI indicators
  if (bgAudio) {
    bgAudio.addEventListener("play", () => {
      isPlayingAudio = true;
      if (audioPlayer) audioPlayer.classList.add("playing");
      if (audioStatusLabel) audioStatusLabel.textContent = "Playing";
      stopAmbientPianoSynth();
    });

    bgAudio.addEventListener("pause", () => {
      isPlayingAudio = false;
      if (audioPlayer) audioPlayer.classList.remove("playing");
      if (audioStatusLabel) audioStatusLabel.textContent = "Play Music";
    });

    bgAudio.addEventListener("ended", () => {
      bgAudio.currentTime = 0;
      bgAudio.play().catch(() => {});
    });

    bgAudio.addEventListener("error", () => {
      console.warn("Background audio element error:", bgAudio.error);
    });
  }

  let isAudioActionPending = false;

  audioToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hasInteracted = true;
    if (isPlayingAudio || (bgAudio && !bgAudio.paused)) {
      pauseAudio();
    } else {
      playAudio();
    }
  });

  if (audioVolume) {
    audioVolume.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      if (bgAudio) bgAudio.volume = vol;
      if (synthGainNode && audioContext) synthGainNode.gain.setValueAtTime(vol * 0.15, audioContext.currentTime);
    });
  }

  function playAudio() {
    if (!bgAudio) return;
    if (isAudioActionPending) return;

    const audioSrc = config.audio?.src || "assets/audio/oorum_blood_reprise.mp3";
    if (!bgAudio.src || (!bgAudio.src.includes("oorum_blood_reprise") && !bgAudio.src.includes(".mp3"))) {
      bgAudio.src = audioSrc;
    }

    const vol = audioVolume ? parseFloat(audioVolume.value) : (config.audio?.defaultVolume || 0.6);
    bgAudio.volume = vol;

    isAudioActionPending = true;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioActionPending = false;
        isPlayingAudio = true;
        if (audioPlayer) audioPlayer.classList.add("playing");
        if (audioStatusLabel) audioStatusLabel.textContent = "Playing";
        stopAmbientPianoSynth();
      }).catch(err => {
        isAudioActionPending = false;
        console.warn("Audio play blocked by browser policy until user interaction:", err);
        isPlayingAudio = false;
        if (audioPlayer) audioPlayer.classList.remove("playing");
        if (audioStatusLabel) audioStatusLabel.textContent = "Play Music";
      });
    } else {
      isAudioActionPending = false;
    }
  }

  function pauseAudio() {
    isPlayingAudio = false;
    if (audioPlayer) audioPlayer.classList.remove("playing");
    if (audioStatusLabel) audioStatusLabel.textContent = "Play Music";

    if (bgAudio) {
      try {
        bgAudio.pause();
      } catch (err) {}
    }
    stopAmbientPianoSynth();
  }

  // Soothing Web Audio Piano / Twilight Pad Synthesizer
  function startAmbientPianoSynth() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // Master gain
      synthGainNode = audioContext.createGain();
      const vol = audioVolume ? parseFloat(audioVolume.value) : 0.5;
      synthGainNode.gain.setValueAtTime(vol * 0.12, audioContext.currentTime);
      synthGainNode.connect(audioContext.destination);

      // Reverb / Delay simulation
      const delay = audioContext.createDelay();
      delay.delayTime.value = 0.45;
      const feedback = audioContext.createGain();
      feedback.gain.value = 0.35;
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(synthGainNode);

      // Sincere, melancholic & beautiful chord progression in Eb / C Minor / Ab Major
      const notesProgression = [
        [261.63, 329.63, 392.00], // C major / C, E, G
        [220.00, 261.63, 329.63], // A minor / A, C, E
        [174.61, 220.00, 261.63], // F major / F, A, C
        [196.00, 246.94, 293.66], // G major / G, B, D
        [220.00, 261.63, 349.23], // Dm / A, C, F
        [261.63, 329.63, 440.00]  // Am inversion
      ];

      let chordIndex = 0;

      function playNextChord() {
        if (!isPlayingAudio || !audioContext) return;
        const chord = notesProgression[chordIndex % notesProgression.length];
        chordIndex++;

        chord.forEach((freq, i) => {
          setTimeout(() => {
            if (!isPlayingAudio || !audioContext) return;
            const osc = audioContext.createOscillator();
            const noteGain = audioContext.createGain();

            osc.type = i === 0 ? "sine" : "triangle";
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);

            // Envelope: gentle attack and long decay
            const now = audioContext.currentTime;
            noteGain.gain.setValueAtTime(0.001, now);
            noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.6);
            noteGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

            osc.connect(noteGain);
            noteGain.connect(synthGainNode);
            noteGain.connect(delay);

            osc.start(now);
            osc.stop(now + 4.6);
          }, i * 350);
        });
      }

      playNextChord();
      synthInterval = setInterval(playNextChord, 4200);

    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  function stopAmbientPianoSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  /* ==========================================================================
     3.5 INTERACTIVE 4:45 PM RAIN ATMOSPHERE SYNTHESIZER
     ========================================================================== */
  const rainAudioToggleBtn = document.getElementById("rain-audio-toggle");
  const rainKissCard = document.querySelector(".rain-kiss-card");
  let isPlayingRainAudio = false;
  let rainAudioCtx = null;
  let rainNoiseNode = null;
  let rainGainNode = null;
  let rainDropletInterval = null;

  function initRainAudio() {
    if (!rainAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      rainAudioCtx = new AudioCtx();
    }
    if (rainAudioCtx.state === "suspended") {
      rainAudioCtx.resume();
    }
  }

  function startRainSound() {
    try {
      initRainAudio();
      
      // Create white/pink noise buffer for continuous soothing rain
      const bufferSize = rainAudioCtx.sampleRate * 2;
      const noiseBuffer = rainAudioCtx.createBuffer(1, bufferSize, rainAudioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      rainNoiseNode = rainAudioCtx.createBufferSource();
      rainNoiseNode.buffer = noiseBuffer;
      rainNoiseNode.loop = true;

      // Bandpass filter to sculpt into warm outdoor monsoon sound
      const filter = rainAudioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1100;

      rainGainNode = rainAudioCtx.createGain();
      rainGainNode.gain.setValueAtTime(0.001, rainAudioCtx.currentTime);
      rainGainNode.gain.exponentialRampToValueAtTime(0.18, rainAudioCtx.currentTime + 1.2);

      rainNoiseNode.connect(filter);
      filter.connect(rainGainNode);
      rainGainNode.connect(rainAudioCtx.destination);
      rainNoiseNode.start();

      // Random gentle raindrop pings
      rainDropletInterval = setInterval(() => {
        if (!isPlayingRainAudio || !rainAudioCtx) return;
        const dropOsc = rainAudioCtx.createOscillator();
        const dropGain = rainAudioCtx.createGain();
        const freq = 1200 + Math.random() * 800;
        
        dropOsc.type = "sine";
        dropOsc.frequency.setValueAtTime(freq, rainAudioCtx.currentTime);
        dropOsc.frequency.exponentialRampToValueAtTime(freq * 0.4, rainAudioCtx.currentTime + 0.12);
        
        dropGain.gain.setValueAtTime(0.025, rainAudioCtx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, rainAudioCtx.currentTime + 0.12);
        
        dropOsc.connect(dropGain);
        dropGain.connect(rainAudioCtx.destination);
        
        dropOsc.start(rainAudioCtx.currentTime);
        dropOsc.stop(rainAudioCtx.currentTime + 0.13);
      }, 450);

      isPlayingRainAudio = true;
      if (rainAudioToggleBtn) {
        rainAudioToggleBtn.classList.add("playing");
        rainAudioToggleBtn.querySelector(".rain-btn-label").textContent = "Rain Sound Playing 🌧️";
      }
      if (rainKissCard) {
        rainKissCard.classList.add("rain-active");
      }
    } catch (e) {
      console.warn("Rain audio error", e);
    }
  }

  function stopRainSound() {
    isPlayingRainAudio = false;
    if (rainGainNode && rainAudioCtx) {
      try {
        rainGainNode.gain.exponentialRampToValueAtTime(0.0001, rainAudioCtx.currentTime + 0.5);
      } catch (e) {}
    }
    setTimeout(() => {
      if (rainNoiseNode) {
        try { rainNoiseNode.stop(); } catch (e) {}
        rainNoiseNode = null;
      }
    }, 550);
    if (rainDropletInterval) {
      clearInterval(rainDropletInterval);
      rainDropletInterval = null;
    }
    if (rainAudioToggleBtn) {
      rainAudioToggleBtn.classList.remove("playing");
      rainAudioToggleBtn.querySelector(".rain-btn-label").textContent = "Rain Atmosphere Sound";
    }
    if (rainKissCard) {
      rainKissCard.classList.remove("rain-active");
    }
  }

  if (rainAudioToggleBtn) {
    rainAudioToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isPlayingRainAudio) {
        stopRainSound();
      } else {
        startRainSound();
      }
    });
  }

  /* ==========================================================================
     4. INTERACTIVE SNEHATHEERAM DAWN SLIDER
     ========================================================================== */
  if (sunriseSlider) {
    function updateSunriseScene(val) {
      const percentage = val / 100;
      
      // Sky layers
      if (skyNight) skyNight.style.opacity = (1 - percentage).toFixed(2);
      if (skyDawn) skyDawn.style.opacity = (percentage * 0.9).toFixed(2);

      // Sun position & glow
      if (sunriseSun) {
        // Move from below horizon (35%) to up in sky (65%)
        const bottomPos = 20 + percentage * 45;
        sunriseSun.style.bottom = `${bottomPos}%`;
        sunriseSun.style.opacity = (0.2 + percentage * 0.8).toFixed(2);
        sunriseSun.style.transform = `translate(-50%, 50%) scale(${0.7 + percentage * 0.6})`;
      }

      // Time and text updates
      if (sunriseStatusText) {
        if (percentage < 0.25) {
          sunriseStatusText.textContent = "02:30 AM • Midnight Highway & Stars";
        } else if (percentage < 0.55) {
          sunriseStatusText.textContent = "04:45 AM • Cool Dawn Breeze on the Shore";
        } else if (percentage < 0.85) {
          sunriseStatusText.textContent = "05:50 AM • Golden Horizon Over Snehatheeram";
        } else {
          sunriseStatusText.textContent = "06:15 AM • Sunrise Across the Ocean Waves";
        }
      }
    }

    sunriseSlider.addEventListener("input", (e) => {
      updateSunriseScene(parseFloat(e.target.value));
    });

    // Initial setup
    updateSunriseScene(parseFloat(sunriseSlider.value));
  }

  /* ==========================================================================
     5. LIGHTBOX MODAL FUNCTIONALITY
     ========================================================================== */
  let lightboxItems = [];

  function attachLightboxListeners() {
    const triggerElements = document.querySelectorAll("[data-lightbox], .gallery-item");
    lightboxItems = [];

    triggerElements.forEach((el) => {
      const src = el.getAttribute("data-lightbox") || el.getAttribute("data-src");
      const caption = el.getAttribute("data-caption") || "";
      if (src) {
        const itemIdx = lightboxItems.length;
        lightboxItems.push({ src, caption });

        el.style.cursor = "pointer";
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          openLightbox(itemIdx);
        });
      }
    });
  }

  attachLightboxListeners();

  function openLightbox(index) {
    if (lightboxItems.length === 0) return;
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = "";
      lightboxVideo.style.display = "none";
    }
    if (lightboxImg) {
      lightboxImg.style.display = "block";
    }
  }

  function updateLightboxContent() {
    const item = lightboxItems[currentLightboxIndex];
    if (!item) return;

    const isVideo = item.src.endsWith(".mp4") || item.src.includes("video");

    if (isVideo) {
      if (lightboxImg) lightboxImg.style.display = "none";
      if (lightboxVideo) {
        lightboxVideo.style.display = "block";
        lightboxVideo.src = item.src;
        lightboxVideo.play().catch(() => {});
      }
    } else {
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = "";
        lightboxVideo.style.display = "none";
      }
      if (lightboxImg) {
        lightboxImg.style.display = "block";
        lightboxImg.src = item.src;
        lightboxImg.alt = item.caption || "Archu Memory";
      }
    }

    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxItems.length}`;
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      updateLightboxContent();
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
      updateLightboxContent();
    });
  }

  // Close lightbox on backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("lightbox-backdrop") || e.target.classList.contains("lightbox-modal")) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && lightboxPrev) lightboxPrev.click();
    if (e.key === "ArrowRight" && lightboxNext) lightboxNext.click();
  });

  /* ==========================================================================
     6. SECRET SURPRISE / EASTER EGG MODAL
     ========================================================================== */
  function openSecretModal() {
    if (config.secretSurprise) {
      if (secretTitle) secretTitle.textContent = config.secretSurprise.title;
      if (secretMessage) secretMessage.textContent = config.secretSurprise.message;
    }
    if (secretModal) {
      secretModal.classList.add("active");
      secretModal.setAttribute("aria-hidden", "false");
    }
  }

  function closeSecretModal() {
    if (secretModal) {
      secretModal.classList.remove("active");
      secretModal.setAttribute("aria-hidden", "true");
    }
  }

  if (secretStarBtn) secretStarBtn.addEventListener("click", openSecretModal);
  if (letterWaxSeal) letterWaxSeal.addEventListener("click", openSecretModal);
  if (secretClose) secretClose.addEventListener("click", closeSecretModal);
  if (secretModal) {
    secretModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("secret-backdrop") || e.target.classList.contains("secret-modal")) {
        closeSecretModal();
      }
    });
  }

  /* ==========================================================================
     7. LETTER TYPOGRAPHY TOGGLE
     ========================================================================== */
  if (letterFontBtn && letterBody) {
    let isHandwritten = true;
    letterFontBtn.addEventListener("click", () => {
      isHandwritten = !isHandwritten;
      if (isHandwritten) {
        letterBody.classList.remove("clean-mode");
        letterBody.classList.add("handwritten-mode");
        letterFontBtn.textContent = "Switch to Clean Type";
      } else {
        letterBody.classList.remove("handwritten-mode");
        letterBody.classList.add("clean-mode");
        letterFontBtn.textContent = "Switch to Handwritten";
      }
    });
  }

  /* ==========================================================================
     8. REPLAY OUR STORY BUTTON
     ========================================================================== */
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      // Gentle pulse on hero
      const heroTitle = document.querySelector(".hero-title");
      if (heroTitle) {
        heroTitle.style.transform = "scale(1.05)";
        setTimeout(() => {
          heroTitle.style.transform = "";
        }, 800);
      }
    });
  }

  /* ==========================================================================
     9. SCROLL REVEAL & PROGRESS BAR (INTERSECTION OBSERVER)
     ========================================================================== */
  function triggerScrollReveals() {
    const revealElements = document.querySelectorAll(".reveal-fade, .reveal-fade-up, .reveal-scale");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // Top Nav & Timeline Progress on Scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    
    // Top Nav Scrolled State
    if (topNav) {
      if (scrollY > 50) {
        topNav.classList.add("scrolled");
      } else {
        topNav.classList.remove("scrolled");
      }
    }

    // Timeline line progress update
    const storySec = document.getElementById("story");
    if (storySec && timelineProgress) {
      const rect = storySec.getBoundingClientRect();
      const secHeight = storySec.offsetHeight;
      const windowH = window.innerHeight;

      if (rect.top <= windowH && rect.bottom >= 0) {
        const scrolledInside = windowH - rect.top;
        const percent = Math.min(100, Math.max(0, (scrolledInside / secHeight) * 100));
        timelineProgress.style.height = `${percent}%`;
      }
    }
  }, { passive: true });

  /* ==========================================================================
     10. AMBIENT CANVAS BACKGROUND (STARS & FLOATING SILVER DUST)
     ========================================================================== */
  const canvas = document.getElementById("ambient-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(80, Math.floor(width / 18));
    const colors = [
      { r: 244, g: 114, b: 182 }, // Soft Rose Gold
      { r: 253, g: 164, b: 175 }, // Romantic Blush
      { r: 254, g: 215, b: 170 }, // Warm Champagne
      { r: 248, g: 250, b: 252 }  // Platinum Silver
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.65 + 0.25,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.35 - 0.05, // Gentle romantic upward drift
        pulseSpeed: Math.random() * 0.02 + 0.006,
        pulseVal: Math.random() * Math.PI,
        color: col
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseVal += p.pulseSpeed;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
        ctx.fill();

        // Subtle warm glow for larger particles
        if (p.radius > 1.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.25})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }

  // Trigger initial reveals in case already loaded
  setTimeout(triggerScrollReveals, 300);
});

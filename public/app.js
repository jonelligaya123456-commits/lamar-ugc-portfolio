const AVAILABLE_PHOTOS = [
  { file: '/media/1U6A5935.JPG', label: '1U6A5935 — Black Tee & Sunglasses (Concrete Wall)' },
  { file: '/media/1U6A5921.JPG', label: '1U6A5921 — Full Studio Black-on-Black Fit' },
  { file: '/media/talking-head-thumb.jpg', label: 'Talking Head — Studio Interview Frame' },
  { file: '/media/1U6A9648.JPG', label: '1U6A9648 — Brown Corduroy Jacket & Star Pants' },
  { file: '/media/1U6A9653.JPG', label: '1U6A9653 — Outdoor Street Walk (Corduroy Fit)' },
  { file: '/media/3G1A9870.JPG', label: '3G1A9870 — Studio Red Cap Portrait' },
  { file: '/media/3G1A9873.JPG', label: '3G1A9873 — Studio Behind-The-Scenes Camera' },
  { file: '/media/3G1A0001.JPG', label: '3G1A0001 — Studio Profile & Softbox Light' },
  { file: '/media/1U6A5938.JPG', label: '1U6A5938 — Side Profile Concrete Wall' },
  { file: '/media/1U6A8760.JPG', label: '1U6A8760 — Pulling Camo Jacket off Rack' },
  { file: '/media/1U6A8752.JPG', label: '1U6A8752 — LA Fatherhood Tee & Cream Beanie' },
  { file: '/media/1U6A8754.JPG', label: '1U6A8754 — Spread Fatherhood Back Print' },
  { file: '/media/1U6A5941.JPG', label: '1U6A5941 — Black Crossbody Bag Showcase' },
  { file: '/media/1U6A5910.JPG', label: '1U6A5910 — Adjusting Black Beanie & Chains' }
];

const DEFAULT_REELS = [
  {
    id: 'styling-tutorial',
    titleHtml: 'STYLING<br />TUTORIAL',
    titlePlain: 'STYLING TUTORIAL',
    subtitle: 'Placeholder',
    thumb: '/media/1U6A8760.JPG',
    videoUrl: ''
  },
  {
    id: 'thrift-flip',
    titleHtml: 'THRIFT FLIP',
    titlePlain: 'THRIFT FLIP',
    subtitle: 'Placeholder',
    thumb: '/media/1U6A8752.JPG',
    videoUrl: ''
  },
  {
    id: 'product-demo',
    titleHtml: 'PRODUCT DEMO',
    titlePlain: 'PRODUCT DEMO',
    subtitle: 'Placeholder',
    thumb: '/media/1U6A5941.JPG',
    videoUrl: ''
  },
  {
    id: 'talking-head',
    titleHtml: 'TALKING HEAD',
    titlePlain: 'TALKING HEAD',
    subtitle: '0:32',
    thumb: '/media/talking-head-thumb.jpg',
    videoUrl: '/media/talking-head.mp4',
    startOffset: 3.4
  },
  {
    id: 'outfit-breakdown',
    titleHtml: 'OUTFIT<br />BREAKDOWN',
    titlePlain: 'OUTFIT BREAKDOWN',
    subtitle: 'Placeholder',
    thumb: '/media/1U6A9648.JPG',
    videoUrl: ''
  },
  {
    id: 'lifestyle-content',
    titleHtml: 'LIFESTYLE<br />CONTENT',
    titlePlain: 'LIFESTYLE CONTENT',
    subtitle: 'Placeholder',
    thumb: '/media/1U6A9653.JPG',
    videoUrl: ''
  },
  {
    id: 'monochrome-styling',
    titleHtml: 'MONOCHROME<br />STYLING',
    titlePlain: 'MONOCHROME STYLING',
    subtitle: 'Placeholder',
    thumb: '/media/1U6A5910.JPG',
    videoUrl: '',
    offscreen: true
  },
  {
    id: 'studio-lookbook',
    titleHtml: 'STUDIO<br />LOOKBOOK',
    titlePlain: 'STUDIO LOOKBOOK',
    subtitle: 'Placeholder',
    thumb: '/media/3G1A9870.JPG',
    videoUrl: '',
    offscreen: true
  }
];

const CASE_STUDIES = [
  {
    thumb: '/media/1U6A8754.JPG',
    brand: 'BRAND NAME',
    desc: 'Add a brief description of the campaign and your role.',
    m1Val: '+X%',
    m1Large: true,
    m2Val: 'ANOTHER<br />METRIC',
    m3Val: 'A THIRD<br />METRIC'
  },
  {
    thumb: '/media/3G1A0001.JPG',
    brand: 'BRAND NAME',
    desc: 'Add a brief description of the campaign and your role.',
    m1Val: '+X%',
    m1Large: true,
    m2Val: 'ANOTHER<br />METRIC',
    m3Val: 'A THIRD<br />METRIC'
  },
  {
    thumb: '/media/3G1A9873.JPG',
    brand: 'BRAND NAME',
    desc: 'Add a brief description of the campaign and your role.',
    m1Val: '+X%',
    m1Large: true,
    m2Val: 'ANOTHER<br />METRIC',
    m3Val: 'A THIRD<br />METRIC'
  }
];

let reelsState = structuredClone(DEFAULT_REELS);
let activeReelIndex = 0;
let isEditMode = new URLSearchParams(window.location.search).has('edit');

let mainPortraitsState = {
  hero: '/media/1U6A5935.JPG',
  about: '/media/1U6A5921.JPG',
  contact: '/media/1U6A5938.JPG'
};

function revokeIfBlob(url) {
  if (typeof url === 'string' && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

function updateEditModeUI() {
  const openStudioBtn = document.getElementById('openStudioBtn');
  const footerStudioBtn = document.getElementById('footerStudioBtn');
  const reelEditFooter = document.getElementById('reelModalEditFooter');
  if (openStudioBtn) {
    openStudioBtn.classList.toggle('is-hidden', !isEditMode);
  }
  if (footerStudioBtn) {
    footerStudioBtn.classList.toggle('is-hidden', !isEditMode);
  }
  if (reelEditFooter) {
    reelEditFooter.classList.toggle('is-hidden', !isEditMode);
  }
}

// Top-layer exit animation feature detection & helper (animate-to-from-top-layer)
let _canTransitionDisplay;
function canTransitionDisplay() {
  if (_canTransitionDisplay === undefined) {
    if (!CSS.supports('transition-behavior', 'allow-discrete')) {
      _canTransitionDisplay = false;
    } else {
      const el = document.createElement('div');
      document.body.appendChild(el);
      el.style.cssText =
        'display: block; transition: display 1s allow-discrete; transition-Delay: 999s;';
      el.offsetHeight;
      el.style.display = 'none';
      _canTransitionDisplay = getComputedStyle(el).display === 'block';
      el.remove();
    }
  }
  return _canTransitionDisplay;
}

const supportsTopLayerExit = () =>
  CSS.supports('overlay', 'auto') && canTransitionDisplay();

function closeTopLayer(el) {
  if (!el || !el.open) return;
  if (supportsTopLayerExit()) {
    el.close();
    return;
  }

  if (el.hasAttribute('data-closing')) return;
  el.setAttribute('data-closing', '');

  const animations = el.getAnimations();
  if (animations.length > 0) {
    Promise.allSettled(animations.map((a) => a.finished)).then(() => {
      if (el.hasAttribute('data-closing')) {
        el.removeAttribute('data-closing');
        el.close();
      }
    });
  } else {
    el.removeAttribute('data-closing');
    el.close();
  }
}

// Setup light-dismiss fallback & animated close for <dialog closedby="any">
function setupDialogLightDismissFallbacks() {
  const dialogs = document.querySelectorAll('dialog[closedby="any"]');

  // Wire all [data-close-dialog] buttons to closeTopLayer()
  document.querySelectorAll('[data-close-dialog]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dialog = btn.closest('dialog');
      if (dialog) closeTopLayer(dialog);
    });
  });

  dialogs.forEach((dialog) => {
    // Intercept Escape key when fallback exit animation is needed
    dialog.addEventListener('cancel', (e) => {
      if (!supportsTopLayerExit()) {
        e.preventDefault();
        closeTopLayer(dialog);
      }
    });

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (isDialogContent) return;
        closeTopLayer(dialog);
      });
    }
  });
}

function renderReelsCarousel() {
  const track = document.getElementById('workCarouselTrack');
  if (!track) return;

  track.innerHTML = reelsState
    .map((item, idx) => {
      const priorityAttrs = item.offscreen
        ? 'fetchpriority="low" loading="lazy"'
        : 'fetchpriority="high"';
      const badgeHtml = item.videoUrl
        ? '<span class="reel-badge-live">Hover / Click to Play</span>'
        : '';
      const inlineVideoHtml = item.videoUrl
        ? `
          <video
            src="${item.videoUrl}"
            data-start-offset="${item.startOffset || 0}"
            class="reel-inline-video"
            muted
            loop
            playsinline
            preload="none"
          ></video>
          <div class="reel-hover-progress" aria-hidden="true">
            <span class="reel-hover-progress-bar"></span>
          </div>
        `
        : '';

      return `
        <article
          class="reel-card"
          data-index="${idx}"
          data-has-video="${item.videoUrl ? 'true' : 'false'}"
          style="--stagger-idx: ${idx}"
          role="button"
          tabindex="0"
          aria-label="Preview ${item.titlePlain}"
        >
          <img src="${item.thumb}" alt="${item.titlePlain}" ${priorityAttrs} width="450" height="800" class="reel-thumb" />
          ${inlineVideoHtml}
          <div class="reel-overlay">
            ${badgeHtml}
            <span class="reel-play-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"></polygon></svg>
            </span>
            <div class="reel-meta">
              <h3 class="reel-title">${item.titleHtml}</h3>
              <span class="reel-duration">${item.subtitle}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  const cursorPill = document.getElementById('reelCursorPill');
  const cursorPillText =
    document.getElementById('reelCursorText') ||
    document.getElementById('reelCursorPillText');
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  track.querySelectorAll('.reel-card').forEach((card) => {
    const inlineVid = card.querySelector('.reel-inline-video');
    const progressBar = card.querySelector('.reel-hover-progress-bar');

    if (inlineVid && progressBar) {
      const startOffset = Number(inlineVid.getAttribute('data-start-offset') || 0);
      inlineVid.addEventListener('loadedmetadata', () => {
        if (startOffset > 0 && inlineVid.currentTime < startOffset) {
          inlineVid.currentTime = startOffset;
        }
      });
      inlineVid.addEventListener('timeupdate', () => {
        if (startOffset > 0 && inlineVid.currentTime < startOffset - 0.25) {
          inlineVid.currentTime = startOffset;
        }
        if (inlineVid.duration) {
          const pct = (inlineVid.currentTime / inlineVid.duration) * 100;
          progressBar.style.width = `${pct.toFixed(1)}%`;
        }
      });
    }

    card.addEventListener('mouseenter', (e) => {
      if (cursorPill && cursorPillText && hasFinePointer && !prefersReducedMotion) {
        const hasVid = card.getAttribute('data-has-video') === 'true';
        cursorPillText.textContent = hasVid ? 'PLAY WITH SOUND' : 'VIEW STILL';
        cursorPill.style.setProperty('--cursor-x', `${e.clientX + 16}px`);
        cursorPill.style.setProperty('--cursor-y', `${e.clientY + 16}px`);
        cursorPill.classList.add('is-active');
      }
      if (inlineVid) {
        const startOffset = Number(inlineVid.getAttribute('data-start-offset') || 0);
        if (startOffset > 0 && inlineVid.currentTime < startOffset) {
          try {
            inlineVid.currentTime = startOffset;
          } catch {}
        }
        card.classList.add('is-playing-inline');
        inlineVid.play().catch(() => {});
      }
    });

    card.addEventListener('mousemove', (e) => {
      if (cursorPill && cursorPillText && hasFinePointer && !prefersReducedMotion) {
        const hasVid = card.getAttribute('data-has-video') === 'true';
        cursorPillText.textContent = hasVid ? 'PLAY WITH SOUND' : 'VIEW STILL';
        cursorPill.style.setProperty('--cursor-x', `${e.clientX + 16}px`);
        cursorPill.style.setProperty('--cursor-y', `${e.clientY + 16}px`);
        cursorPill.classList.add('is-active');
      }
      if (inlineVid && !card.classList.contains('is-playing-inline')) {
        const startOffset = Number(inlineVid.getAttribute('data-start-offset') || 0);
        if (startOffset > 0 && inlineVid.currentTime < startOffset) {
          try {
            inlineVid.currentTime = startOffset;
          } catch {}
        }
        card.classList.add('is-playing-inline');
        inlineVid.play().catch(() => {});
      }
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-yPct * 7).toFixed(2);
      const rotateY = (xPct * 7).toFixed(2);
      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
      if (cursorPill) {
        cursorPill.classList.remove('is-active');
      }
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      if (inlineVid) {
        card.classList.remove('is-playing-inline');
        inlineVid.pause();
      }
    });

    card.addEventListener('click', () => {
      const index = Number(card.getAttribute('data-index'));
      openReelModal(index);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = Number(card.getAttribute('data-index'));
        openReelModal(index);
      }
    });
  });

  // Warm inline video metadata after visible card images have decoded so it never blocks image sockets
  const warmInlineVideos = () => {
    track.querySelectorAll('.reel-inline-video').forEach((vid) => {
      if (vid.getAttribute('preload') === 'none') {
        vid.setAttribute('preload', 'metadata');
      }
    });
  };
  if (document.readyState === 'complete') {
    setTimeout(warmInlineVideos, 120);
  } else {
    window.addEventListener('load', () => setTimeout(warmInlineVideos, 120), { once: true });
  }

  updateCarouselProgress();
}

function openReelModal(index) {
  const total = reelsState.length;
  activeReelIndex = ((index % total) + total) % total;
  const item = reelsState[activeReelIndex];
  if (!item) return;

  // Dismiss floating cursor pill & pause any background inline preview videos
  const cursorPill = document.getElementById('reelCursorPill');
  if (cursorPill) {
    cursorPill.classList.remove('is-active');
  }
  const track = document.getElementById('workCarouselTrack');
  track?.querySelectorAll('.reel-card').forEach((c) => {
    c.style.setProperty('--rx', '0deg');
    c.style.setProperty('--ry', '0deg');
    if (c.classList.contains('is-playing-inline')) {
      c.classList.remove('is-playing-inline');
      c.querySelector('.reel-inline-video')?.pause();
    }
  });

  const dialog = document.getElementById('reelPlayerDialog');
  const titleEl = document.getElementById('reelDialogTitle');
  const badgeEl = document.getElementById('reelDialogBadge');
  const counterEl = document.getElementById('reelDialogCounter');
  const segmentsEl = document.getElementById('reelStorySegments');
  const videoEl = document.getElementById('reelModalVideo');
  const posterContainer = document.getElementById('reelPosterContainer');
  const posterEl = document.getElementById('reelModalPoster');

  titleEl.textContent = item.titlePlain;
  badgeEl.textContent = item.videoUrl
    ? `SELECTED WORK • VIDEO PREVIEW`
    : `SELECTED WORK • PLACEHOLDER STILL`;

  if (counterEl) {
    counterEl.textContent = `${activeReelIndex + 1} / ${total}`;
  }

  if (segmentsEl) {
    segmentsEl.innerHTML = reelsState
      .map((_, i) => {
        const cls =
          i < activeReelIndex
            ? 'reel-story-seg is-passed'
            : i === activeReelIndex
              ? 'reel-story-seg is-current'
              : 'reel-story-seg';
        return `<span class="${cls}"></span>`;
      })
      .join('');
  }

  updateEditModeUI();

  if (item.videoUrl) {
    posterContainer.classList.add('is-hidden');
    videoEl.classList.remove('is-hidden');
    if (videoEl.getAttribute('src') !== item.videoUrl) {
      videoEl.src = item.videoUrl;
    }
    videoEl.setAttribute('data-start-offset', String(item.startOffset || 0));
    videoEl.poster = item.thumb;
    videoEl.loop = true;
    videoEl.currentTime = item.startOffset || 0;
    videoEl.play().catch(() => {});
  } else {
    videoEl.pause();
    videoEl.classList.add('is-hidden');
    posterContainer.classList.remove('is-hidden');
    posterEl.src = item.thumb;
    posterEl.alt = item.titlePlain;
  }

  // Keep background carousel card synced horizontally without scrolling the vertical page
  const activeCard = track?.querySelector(`.reel-card[data-index="${activeReelIndex}"]`);
  if (track && activeCard) {
    const cardLeft = activeCard.offsetLeft;
    const cardRight = cardLeft + activeCard.offsetWidth;
    const viewLeft = track.scrollLeft;
    const viewRight = viewLeft + track.clientWidth;
    if (cardLeft < viewLeft) {
      track.scrollTo({ left: cardLeft, behavior: 'smooth' });
    } else if (cardRight > viewRight) {
      track.scrollTo({ left: cardRight - track.clientWidth, behavior: 'smooth' });
    }
  }

  if (!dialog.open) {
    dialog.showModal();
  }
}

function updateCarouselProgress() {
  const track = document.getElementById('workCarouselTrack');
  const fill = document.getElementById('carouselProgressFill');
  if (!track || !fill) return;

  const maxScroll = track.scrollWidth - track.clientWidth;
  if (maxScroll <= 0) {
    fill.style.width = '100%';
    fill.style.transform = 'translateX(0%)';
    return;
  }

  const visibleRatio = Math.max(0.2, Math.min(1, track.clientWidth / track.scrollWidth));
  const scrollRatio = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
  const fillWidthPct = visibleRatio * 100;
  const maxTranslatePct = ((1 - visibleRatio) / visibleRatio) * 100;

  fill.style.width = `${fillWidthPct.toFixed(2)}%`;
  fill.style.transform = `translateX(${(scrollRatio * maxTranslatePct).toFixed(2)}%)`;
}

function renderCaseStudies() {
  const grid = document.getElementById('caseStudiesGrid');
  if (!grid) return;

  grid.innerHTML = CASE_STUDIES.map(
    (item, idx) => `
      <article class="case-card" style="--stagger-idx: ${idx}">
        <div class="case-thumb-wrap">
          <img src="${item.thumb}" alt="Brand Campaign Case Study ${idx + 1}" loading="lazy" width="320" height="400" class="case-thumb" />
        </div>
        <div class="case-body">
          <h3 class="case-brand">${item.brand}</h3>
          <p class="case-desc">${item.desc}</p>
          <div class="case-metrics">
            <div class="metric-item">
              <span class="metric-value ${item.m1Large ? 'is-large' : ''}">${item.m1Val}</span>
              <span class="metric-label">VIEWS</span>
            </div>
            <div class="metric-item">
              <span class="metric-value">${item.m2Val}</span>
              <span class="metric-label">ENGAGEMENT</span>
            </div>
            <div class="metric-item">
              <span class="metric-value">${item.m3Val}</span>
              <span class="metric-label">CONVERSIONS</span>
            </div>
          </div>
        </div>
      </article>
    `
  ).join('');
}

function setupScrollRevealAndSpy() {
  const revealSections = document.querySelectorAll('[data-reveal-section]');
  const navLinks = document.querySelectorAll('.main-nav a[data-nav-section]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
  );

  revealSections.forEach((sec) => revealObserver.observe(sec));

  // Scroll-spy for top navigation
  const spyTargets = ['work', 'services', 'about', 'results', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const updateScrollSpy = () => {
    if (window.scrollY < 260) {
      navLinks.forEach((link) => link.classList.remove('is-active'));
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 40;
    if (nearBottom) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'is-active',
          link.getAttribute('data-nav-section') === 'contact'
        );
      });
      return;
    }
    const readingLine = Math.min(280, window.innerHeight * 0.35);
    let currentId = '';
    for (const sec of spyTargets) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= readingLine && rect.bottom > readingLine) {
        currentId = sec.id;
        break;
      }
    }
    if (!currentId) {
      for (const sec of spyTargets) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= readingLine + 110 && rect.bottom >= 80) {
          currentId = sec.id;
          break;
        }
      }
    }
    navLinks.forEach((link) => {
      link.classList.toggle(
        'is-active',
        link.getAttribute('data-nav-section') === currentId
      );
    });
  };

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();
}

function setupEditorialInteractions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  // 1. Floating "WATCH REEL" cursor pill on carousel — hide immediately on scroll or track leave
  const track = document.getElementById('workCarouselTrack');
  const cursorPill = document.getElementById('reelCursorPill');
  if (track && cursorPill && hasFinePointer && !prefersReducedMotion) {
    const dismissCursorPill = () => {
      cursorPill.classList.remove('is-active');
      track.querySelectorAll('.reel-card').forEach((card) => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        if (card.classList.contains('is-playing-inline')) {
          card.classList.remove('is-playing-inline');
          const vid = card.querySelector('.reel-inline-video');
          if (vid) vid.pause();
        }
      });
    };

    track.addEventListener('mouseleave', dismissCursorPill);
    track.addEventListener('scroll', dismissCursorPill, { passive: true });
    window.addEventListener('scroll', dismissCursorPill, { passive: true });
  }

  // 2. Magnetic CTA buttons
  if (hasFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.setProperty('--mag-x', `${(dx * 0.16).toFixed(1)}px`);
        btn.style.setProperty('--mag-y', `${(dy * 0.22).toFixed(1)}px`);
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mag-x', '0px');
        btn.style.setProperty('--mag-y', '0px');
      });
    });
  }

  // 3. Subtle vertical scroll parallax on Hero & About portraits
  if (!prefersReducedMotion) {
    const heroImg = document.getElementById('heroPortraitImg');
    const aboutImg = document.getElementById('aboutPortraitImg');
    let ticking = false;

    const updateParallax = () => {
      const vh = window.innerHeight || 800;
      if (heroImg) {
        const rect = heroImg.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const offset = ((vh / 2 - (rect.top + rect.height / 2)) / vh) * -18;
          heroImg.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
        }
      }
      if (aboutImg) {
        const rect = aboutImg.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const offset = ((vh / 2 - (rect.top + rect.height / 2)) / vh) * -18;
          aboutImg.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
        }
      }
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateParallax();
  }
}

function renderStudioControls() {
  const switcher = document.getElementById('mainPortraitSwitcher');
  const reelsList = document.getElementById('studioReelsList');
  if (!switcher || !reelsList) return;

  const slots = [
    { key: 'hero', label: 'Hero Portrait (Top Right)', elId: 'heroPortraitImg' },
    { key: 'about', label: 'About Lamar (Middle Left)', elId: 'aboutPortraitImg' },
    { key: 'contact', label: 'Work With Me (Bottom Left)', elId: 'contactPortraitImg' }
  ];

  switcher.innerHTML = slots
    .map((slot) => {
      const options = AVAILABLE_PHOTOS.map(
        (p) =>
          `<option value="${p.file}" ${mainPortraitsState[slot.key] === p.file ? 'selected' : ''}>${p.label}</option>`
      ).join('');
      return `
        <div class="studio-slot-card">
          <label for="select-${slot.key}">${slot.label}</label>
          <select id="select-${slot.key}" data-slot="${slot.key}" data-target="${slot.elId}">
            ${options}
          </select>
        </div>
      `;
    })
    .join('');

  switcher.querySelectorAll('select').forEach((sel) => {
    sel.addEventListener('change', (e) => {
      const slotKey = e.target.getAttribute('data-slot');
      const targetId = e.target.getAttribute('data-target');
      const newSrc = e.target.value;
      mainPortraitsState[slotKey] = newSrc;
      const imgEl = document.getElementById(targetId);
      if (imgEl) imgEl.src = newSrc;
    });
  });

  reelsList.innerHTML = reelsState
    .map(
      (reel, idx) => `
      <div class="studio-reel-item">
        <div class="studio-reel-info">
          <img src="${reel.thumb}" alt="${reel.titlePlain}" class="studio-mini-thumb" loading="lazy" decoding="async" fetchpriority="low" />
          <div>
            <div class="studio-reel-name">${idx + 1}. ${reel.titlePlain}</div>
            <div class="studio-reel-sub">${reel.videoUrl ? 'Video Clip Attached' : 'Placeholder Photo'}</div>
          </div>
        </div>
        <label class="btn-outline-sm">
          <input type="file" data-reel-idx="${idx}" accept="video/mp4,video/quicktime,video/webm,image/*" hidden />
          <span>Upload File</span>
        </label>
      </div>
    `
    )
    .join('');

  reelsList.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const idx = Number(e.target.getAttribute('data-reel-idx'));
      const objectUrl = URL.createObjectURL(file);
      if (file.type.startsWith('video/')) {
        revokeIfBlob(reelsState[idx].videoUrl);
        reelsState[idx].videoUrl = objectUrl;
      } else if (file.type.startsWith('image/')) {
        revokeIfBlob(reelsState[idx].thumb);
        reelsState[idx].thumb = objectUrl;
      }
      renderReelsCarousel();
      renderStudioControls();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDialogLightDismissFallbacks();
  updateEditModeUI();
  renderReelsCarousel();
  renderCaseStudies();
  renderStudioControls();
  setupScrollRevealAndSpy();
  setupEditorialInteractions();

  // Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileNavDrawer.classList.toggle('is-hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
    });
    mobileNavDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.add('is-hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Carousel Previous / Next Buttons & Interactive Progress Scrubber
  const track = document.getElementById('workCarouselTrack');
  const prevBtn = document.getElementById('workPrevBtn');
  const nextBtn = document.getElementById('workNextBtn');
  const progressTrack =
    document.getElementById('carouselProgressTrack') ||
    document.querySelector('.carousel-progress-track');

  if (track && prevBtn && nextBtn) {
    const getScrollStep = () => {
      const firstCard = track.querySelector('.reel-card');
      return firstCard ? (firstCard.offsetWidth + 14) * 2 : 380;
    };

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    if (progressTrack) {
      const scrubCarousel = (clientX, smooth = true) => {
        const rect = progressTrack.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        track.scrollTo({
          left: ratio * maxScroll,
          behavior: smooth ? 'smooth' : 'auto'
        });
      };

      let isScrubbing = false;
      progressTrack.addEventListener('pointerdown', (e) => {
        isScrubbing = true;
        scrubCarousel(e.clientX, true);
        try {
          progressTrack.setPointerCapture?.(e.pointerId);
        } catch {
          // Ignore synthetic pointer events without active hardware pointerId
        }
      });
      progressTrack.addEventListener('pointermove', (e) => {
        if (!isScrubbing) return;
        scrubCarousel(e.clientX, false);
      });
      progressTrack.addEventListener('pointerup', () => {
        isScrubbing = false;
      });
      progressTrack.addEventListener('pointercancel', () => {
        isScrubbing = false;
      });
    }

    track.addEventListener('scroll', updateCarouselProgress, { passive: true });
    window.addEventListener('resize', updateCarouselProgress);
    updateCarouselProgress();
  }

  // Stop video playback when Reel dialog closes & wire Prev / Next / Arrow key navigation
  const reelDialog = document.getElementById('reelPlayerDialog');
  const reelVideo = document.getElementById('reelModalVideo');
  const reelModalPrevBtn = document.getElementById('reelModalPrevBtn');
  const reelModalNextBtn = document.getElementById('reelModalNextBtn');

  if (reelDialog && reelVideo) {
    reelDialog.addEventListener('close', () => {
      reelVideo.pause();
    });
    reelVideo.addEventListener('loadedmetadata', () => {
      const startOffset = Number(reelVideo.getAttribute('data-start-offset') || 0);
      if (startOffset > 0 && reelVideo.currentTime < startOffset) {
        reelVideo.currentTime = startOffset;
      }
    });
    reelVideo.addEventListener('timeupdate', () => {
      const startOffset = Number(reelVideo.getAttribute('data-start-offset') || 0);
      if (startOffset > 0 && reelVideo.currentTime < startOffset - 0.25) {
        reelVideo.currentTime = startOffset;
      }
    });
  }

  // Horizontal touch/pointer swipe on .reel-stage to step between reels (ignoring bottom video controls bar)
  const reelStage = reelDialog?.querySelector('.reel-stage');
  if (reelStage) {
    let swipeStartX = null;
    let swipeStartY = null;
    reelStage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      const stageRect = reelStage.getBoundingClientRect();
      if (reelVideo && !reelVideo.classList.contains('is-hidden') && e.clientY > stageRect.bottom - 68) {
        return;
      }
      swipeStartX = e.clientX;
      swipeStartY = e.clientY;
    });
    reelStage.addEventListener('pointerup', (e) => {
      if (swipeStartX === null || swipeStartY === null) return;
      const dx = e.clientX - swipeStartX;
      const dy = e.clientY - swipeStartY;
      swipeStartX = null;
      swipeStartY = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        openReelModal(dx < 0 ? activeReelIndex + 1 : activeReelIndex - 1);
      }
    });
  }

  if (reelModalPrevBtn) {
    reelModalPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openReelModal(activeReelIndex - 1);
    });
  }

  if (reelModalNextBtn) {
    reelModalNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openReelModal(activeReelIndex + 1);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!reelDialog || !reelDialog.open) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      openReelModal(activeReelIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      openReelModal(activeReelIndex + 1);
    }
  });

  // Inline Video Upload inside Reel Modal
  const inlineUploadInput = document.getElementById('inlineVideoUploadInput');
  if (inlineUploadInput) {
    inlineUploadInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const objectUrl = URL.createObjectURL(file);
      if (file.type.startsWith('video/')) {
        revokeIfBlob(reelsState[activeReelIndex].videoUrl);
        reelsState[activeReelIndex].videoUrl = objectUrl;
      } else {
        revokeIfBlob(reelsState[activeReelIndex].thumb);
        reelsState[activeReelIndex].thumb = objectUrl;
      }
      renderReelsCarousel();
      renderStudioControls();
      openReelModal(activeReelIndex);
    });
  }

  // Open Studio Modal (via Navbar button or Footer "Creator Studio" button)
  const openStudioBtn = document.getElementById('openStudioBtn');
  const footerStudioBtn = document.getElementById('footerStudioBtn');
  const studioDialog = document.getElementById('studioDialog');

  if (openStudioBtn && studioDialog) {
    openStudioBtn.addEventListener('click', () => {
      renderStudioControls();
      studioDialog.showModal();
    });
  }

  if (footerStudioBtn && studioDialog) {
    footerStudioBtn.addEventListener('click', () => {
      isEditMode = true;
      updateEditModeUI();
      renderStudioControls();
      studioDialog.showModal();
    });
  }

  // Reset Studio Defaults
  const resetBtn = document.getElementById('resetStudioDefaultsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      reelsState.forEach((r) => {
        revokeIfBlob(r.videoUrl);
        revokeIfBlob(r.thumb);
      });
      reelsState = structuredClone(DEFAULT_REELS);
      mainPortraitsState = {
        hero: '/media/1U6A5935.JPG',
        about: '/media/1U6A5921.JPG',
        contact: '/media/1U6A5938.JPG'
      };
      document.getElementById('heroPortraitImg').src = mainPortraitsState.hero;
      document.getElementById('aboutPortraitImg').src = mainPortraitsState.about;
      document.getElementById('contactPortraitImg').src = mainPortraitsState.contact;
      renderReelsCarousel();
      renderStudioControls();
    });
  }

  // Request Rates Modal (also triggered by clicking the email placeholder)
  const requestRatesBtn = document.getElementById('requestRatesBtn');
  const emailContactLink = document.getElementById('emailContactLink');
  const ratesDialog = document.getElementById('ratesDialog');
  const ratesForm = document.getElementById('ratesForm');

  if (requestRatesBtn && ratesDialog) {
    requestRatesBtn.addEventListener('click', () => {
      ratesDialog.showModal();
    });
  }

  if (emailContactLink && ratesDialog) {
    emailContactLink.addEventListener('click', (e) => {
      e.preventDefault();
      ratesDialog.showModal();
    });
  }

  if (ratesForm && ratesDialog) {
    ratesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const brand = document.getElementById('brandNameInput').value;
      const email = document.getElementById('brandEmailInput').value;
      const pkg = document.getElementById('deliverableSelect').value;
      const notes = document.getElementById('projectNotesInput').value;

      const subject = encodeURIComponent(`UGC Partnership Inquiry — ${brand}`);
      const body = encodeURIComponent(
        `Hi LaMar,\n\nBrand: ${brand}\nContact Email: ${email}\nPackage: ${pkg}\n\nCampaign Details:\n${notes}`
      );
      closeTopLayer(ratesDialog);
      window.location.href = `mailto:lamarjoevell@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});

// Forge Landing — Interactions
document.addEventListener('DOMContentLoaded', () => {

  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Accordion for barriers
  document.querySelectorAll('.barrier-q').forEach(q => {
    q.addEventListener('click', () => {
      const barrier = q.parentElement;
      const wasOpen = barrier.classList.contains('open');
      document.querySelectorAll('.barrier.open').forEach(b => b.classList.remove('open'));
      if (!wasOpen) barrier.classList.add('open');
    });
  });

  const firstBarrier = document.querySelector('.barrier');
  if (firstBarrier) firstBarrier.classList.add('open');

  // Marquee drag-to-scroll (seamless)
  const strip = document.querySelector('.marquee-strip');
  const track = document.querySelector('.marquee-track');
  if (strip && track) {
    let isDragging = false;
    let startX;
    let offset = 0;
    let rafId = null;
    const speed = 1; // px per frame (~60fps = ~60px/sec)

    // Stop CSS animation, use JS animation instead for seamless control
    track.style.animation = 'none';

    // Half width = one full set of logos (duplicate wraps)
    function getHalfWidth() {
      return track.scrollWidth / 2;
    }

    function animate() {
      if (!isDragging) {
        offset -= speed;
      }
      const half = getHalfWidth();
      // Wrap seamlessly
      if (offset <= -half) offset += half;
      if (offset > 0) offset -= half;
      track.style.transform = `translateX(${offset}px)`;
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    // Mouse drag
    strip.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      strip.style.cursor = 'grabbing';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      offset += dx;
      startX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      strip.style.cursor = 'grab';
    });

    strip.style.cursor = 'grab';

    // Touch drag
    strip.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    strip.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      offset += dx;
      startX = e.touches[0].clientX;
    }, { passive: true });

    strip.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
});

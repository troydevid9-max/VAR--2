/* ========================
   PAGE TRANSITIONS
======================== */

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'page-transition';
overlay.innerHTML = '<div class="page-transition-logo">V.A.R</div>';
document.body.appendChild(overlay);

// Exit animation on page load
window.addEventListener('DOMContentLoaded', () => {
  overlay.classList.add('enter');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.remove('enter');
      overlay.classList.add('exit');
      setTimeout(() => {
        overlay.classList.remove('exit');
      }, 500);
    });
  });
});

// Enter animation on link click
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || link.target === '_blank') return;

  e.preventDefault();
  overlay.classList.remove('exit');
  overlay.classList.add('enter');

  setTimeout(() => {
    window.location.href = href;
  }, 420);
});

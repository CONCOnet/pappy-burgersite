/* =========================================================
   PAPPY BURGER — script.js
   Funzionalità:
   - Navbar sticky con cambio stile on scroll
   - Mobile menu (hamburger)
   - Smooth scroll
   - Filtro categorie menu
   - Scroll reveal con IntersectionObserver
   - Link attivo nella navbar
   - Bottone "torna su"
   - Anno corrente nel footer
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR: cambia stile al scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNavbar = () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScrollNavbar();
  window.addEventListener('scroll', onScrollNavbar, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Chiudi mobile menu al click su un link
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---------- FILTRO MENU ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuBlocks = document.querySelectorAll('.menu-block');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      menuBlocks.forEach(block => {
        const show = (filter === 'all') || (block.dataset.cat === filter);
        block.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ---------- LINK ATTIVO IN NAVBAR ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const linkMap = {};
  document.querySelectorAll('.nav-link').forEach(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (id) linkMap[id] = link;
  });

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = linkMap[id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.values(linkMap).forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => spy.observe(s));

  /* ---------- BOTTONE TORNA SU ---------- */
  const toTop = document.getElementById('toTop');
  const onScrollToTop = () => {
    toTop.classList.toggle('visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScrollToTop, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- ANNO CORRENTE ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

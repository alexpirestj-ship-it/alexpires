/**
 * portifolioHUB – Alex Pires
 * main.js  |  UI interactions
 */

'use strict';

(function () {

  /* =========================================================
     Hamburger / Mobile Navigation
     ========================================================= */
  var hamburger = document.getElementById('hamburger');
  var mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is clicked
    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  /* =========================================================
     Header scroll shadow
     ========================================================= */
  var header = document.getElementById('site-header');

  if (header) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* =========================================================
     Smooth reveal on scroll (IntersectionObserver)
     ========================================================= */
  var revealTargets = document.querySelectorAll(
    '.section-heading, .bio-text, .profile-img, .contact-card, .embed-wrapper'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    var style = document.createElement('style');
    style.textContent = [
      '.reveal-hidden {',
      '  opacity: 0;',
      '  transform: translateY(28px);',
      '  transition: opacity 0.55s ease, transform 0.55s ease;',
      '}',
      '.reveal-visible {',
      '  opacity: 1;',
      '  transform: none;',
      '}'
    ].join('\n');
    document.head.appendChild(style);

    revealTargets.forEach(function (el) {
      el.classList.add('reveal-hidden');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* =========================================================
     Active nav link highlight (based on current page)
     ========================================================= */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

})();

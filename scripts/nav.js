// nav.js - loads the shared header include and wires up mobile toggle behavior
(function () {
  function fetchHeader() {
    return fetch('/includes/header.html')
      .then(function (r) { if (!r.ok) throw new Error('Failed to load header'); return r.text(); });
  }

  function setActiveLink(container) {
    try {
      var links = container.querySelectorAll('.nav-link');
      var path = window.location.pathname.replace(/\/+$|^\//g, ''); // trim slashes
      links.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var normalized = href.replace(/\/+$|^\//g, '');
        if (normalized === path || (normalized === '' && path === '')) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    } catch (e) { console.warn(e); }
  }

  function wireToggle(container) {
    var toggle = container.querySelector('#nav-toggle');
    var nav = container.querySelector('.nav-list');
    if (!toggle || !nav) return;
    // initialize aria state
    try { toggle.setAttribute('aria-expanded', 'false'); } catch (e) {}

    toggle.addEventListener('click', function (e) {
      // toggle menu open state
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
      // reflect state for accessibility
      try { toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false'); } catch (e) {}
      // prevent background scroll when open
      try {
        if (nav.classList.contains('open')) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
      } catch (e) {}
    });

    // Close nav when a link is clicked (useful on mobile)
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.classList.remove('open');
          try { toggle.setAttribute('aria-expanded', 'false'); } catch (e) {}
          try { document.body.classList.remove('menu-open'); } catch (e) {}
        }
      });
    });

    // Close on outside click and allow clicking on nav overlay background to close
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open')) {
        if (!container.contains(e.target) || e.target === nav) {
          nav.classList.remove('open');
          toggle.classList.remove('open');
          try { toggle.setAttribute('aria-expanded', 'false'); } catch (e) {}
          try { document.body.classList.remove('menu-open'); } catch (e) {}
        }
      }
    });
  }

  // Find placeholder(s) and inject header
  document.addEventListener('DOMContentLoaded', function () {
    var placeholders = document.querySelectorAll('[data-include="header"]');
    if (!placeholders.length) return;
    fetchHeader().then(function (html) {
      placeholders.forEach(function (ph) {
        ph.innerHTML = html;
        var headerEl = ph.querySelector('header') || ph.querySelector('.main-header');
        if (!headerEl) headerEl = ph;
        setActiveLink(headerEl);
        wireToggle(headerEl);
      });
    }).catch(function (err) {
      console.error('Could not load header include:', err);
    });
  });
})();

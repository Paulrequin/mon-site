/* Paul Defais — interactions légères (sans dépendance).
   · Apparitions au défilement (.reveal → .in)
   · Barre de progression de lecture (.art-progress, page article)
   · Inscription newsletter (remplace le formulaire par un remerciement) */
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (el) { io.observe(el); });
      // le hero apparaît immédiatement
      var hb = document.querySelector('.hero-bg');
      if (hb) requestAnimationFrame(function () { hb.classList.add('in'); });
    }

    // Barre de progression de lecture (page article)
    var bar = document.querySelector('.art-progress');
    if (bar) {
      var update = function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
        bar.style.width = Math.min(100, Math.max(0, pct * 100)) + '%';
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    }

    // Newsletter
    var form = document.querySelector('.news-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var box = form.parentNode;
        var msg = document.createElement('p');
        msg.className = 'lede';
        msg.style.fontSize = '18px';
        msg.style.color = 'var(--ink)';
        msg.textContent = 'Merci — à très vite dans les vignes.';
        form.replaceWith(msg);
      });
    }
  });
})();

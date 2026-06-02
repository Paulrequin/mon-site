document.addEventListener('DOMContentLoaded', function () {

  // Newsletter
  // ⚠️  Remplacer l'endpoint Formspree : aller sur formspree.io, créer un formulaire,
  //     et remplacer FORMSPREE_ENDPOINT ci-dessous par l'URL obtenue (ex: https://formspree.io/f/xabc1234)
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/VOTRE_ID_ICI';

  document.querySelectorAll('.nl-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('.nl-btn');
      if (!input || !input.value) return;

      // Fallback mailto si endpoint non configuré
      if (FORMSPREE_ENDPOINT.includes('VOTRE_ID')) {
        window.location.href = 'mailto:paul@pauldefais.fr?subject=Newsletter%20Tastodisso%E2%84%A2&body=' + encodeURIComponent(input.value);
        return;
      }

      btn.disabled = true;
      btn.textContent = '…';
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: input.value, _subject: 'Newsletter Tastodisso™' })
      })
        .then(function (r) {
          if (r.ok) {
            form.innerHTML = '<p style="font-family:\'EB Garamond\',serif;font-style:italic;font-size:17px;color:var(--ink,#1A0E00)">Merci — à bientôt dans votre boîte.</p>';
          } else {
            btn.disabled = false;
            btn.textContent = 'S\'inscrire';
          }
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = 'S\'inscrire';
        });
    });
  });

});

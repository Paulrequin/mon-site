document.addEventListener('DOMContentLoaded', function () {

  // Newsletter — toutes les pages
  document.querySelectorAll('.nl-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('.nl-btn');
      if (!input || !input.value) return;
      btn.disabled = true;
      btn.textContent = '…';
      fetch('https://formspree.io/paul@pauldefais.fr', {
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

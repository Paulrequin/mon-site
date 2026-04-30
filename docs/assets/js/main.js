/* ── Filtre articles (blog.html) ──────────────────────── */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.article-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.textContent.trim();
      cards.forEach(card => {
        const cat = card.querySelector('.article-card-cat').textContent.trim();
        card.style.display = (filter === 'Tout' || cat === filter) ? 'flex' : 'none';
      });
    });
  });
})();

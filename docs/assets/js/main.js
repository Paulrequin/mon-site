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

/* ── Navigation journal (journal.html) ────────────────── */
(function () {
  const dateItems = document.querySelectorAll('.date-item');
  const entries = document.querySelectorAll('.journal-entry');
  if (!dateItems.length) return;

  dateItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      dateItems.forEach(d => d.classList.remove('active'));
      item.classList.add('active');
      if (entries[i]) {
        entries[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

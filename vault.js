/**
 * vault.js
 * Milestone 5: render EVERY entry (no slice) as full-width rows.
 * Extra: search box, edit link and delete button on each row.
 */

document.addEventListener('DOMContentLoaded', () => {
  const ledger = document.getElementById('ledger');
  const search = document.getElementById('search');
  const countLabel = document.getElementById('vault-count');

  function render() {
    const all = getEntries();
    const term = search.value.trim().toLowerCase();
    const shown = all.filter((e) => (e.title + ' ' + e.body).toLowerCase().includes(term));

    countLabel.textContent = all.length === 0
      ? 'Every entry you write will appear here.'
      : term
        ? shown.length + ' of ' + all.length + ' entries match.'
        : all.length + (all.length === 1 ? ' entry' : ' entries') + ', newest first.';

    ledger.innerHTML = '';

    if (all.length === 0) {
      ledger.innerHTML = `
        <div class="empty-state">
          <p>No entries yet.</p>
          <a href="new-entry.html" class="btn btn-primary">Write your first page</a>
        </div>`;
      return;
    }

    if (shown.length === 0) {
      ledger.innerHTML = '<div class="empty-state"><p>No entries match that search.</p></div>';
      return;
    }

    shown.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'ledger-row';
      row.innerHTML = `
        <span class="ledger-date">${formatDate(entry.date)}</span>
        <div>
          <h2 class="ledger-title"><a href="entry.html?id=${entry.id}">${escapeHtml(entry.title)}</a></h2>
          <p class="ledger-body">${escapeHtml(entry.body)}</p>
          <div class="row-actions">
            <a href="new-entry.html?edit=${entry.id}" class="link-action">Edit</a>
            <button type="button" class="link-action link-danger" data-delete="${entry.id}">Delete</button>
          </div>
        </div>
      `;
      ledger.appendChild(row);
    });
  }

  // One listener on the whole list handles every Delete button.
  ledger.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-delete');
    if (!id) return;
    const entry = findEntry(id);
    if (entry && confirm('Delete "' + entry.title + '"? This cannot be undone.')) {
      deleteEntry(id);
      render();
    }
  });

  search.addEventListener('input', render);
  render();
});

/**
 * entry.js
 * Shows one entry in full. The id comes from the URL: entry.html?id=<id>
 * Extra: Edit and Delete buttons.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#reading');
  const id = new URLSearchParams(window.location.search).get('id');
  const entry = findEntry(id);

  if (!entry) {
    container.innerHTML = `
      <div class="empty-state">
        <p>That entry could not be found. It may have been deleted.</p>
        <a href="vault.html" class="btn btn-primary">Back to the vault</a>
      </div>`;
    return;
  }

  document.title = 'Marginalia — ' + entry.title;

  container.innerHTML = `
    <p class="entry-card-date">${formatDate(entry.date)}</p>
    <h1 class="page-title">${escapeHtml(entry.title)}</h1>
    <div class="reading-body">${escapeHtml(entry.body)}</div>
    <div class="action-row">
      <a href="new-entry.html?edit=${entry.id}" class="btn btn-primary">Edit entry</a>
      <button type="button" class="btn btn-danger" id="delete-btn">Delete entry</button>
    </div>
    <p class="reading-footer"><a href="vault.html">&larr; Back to the vault</a></p>
  `;

  document.querySelector('#delete-btn').addEventListener('click', () => {
    if (confirm('Delete "' + entry.title + '"? This cannot be undone.')) {
      deleteEntry(entry.id);
      window.location.href = 'vault.html';
    }
  });
});

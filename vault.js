document.addEventListener('DOMContentLoaded', () => {
    const ledger = document.getElementById('ledger');
    const entries = getEntries(); // newest-first
  
    if (entries.length === 0) {
      ledger.innerHTML = `
        <div class="empty-state">
          <p>No entries yet.</p>
          <a href="new-entry.html" class="btn btn-primary">Write your first page</a>
        </div>
      `;
      return;
    }
  
    ledger.innerHTML = ''; // clear the hardcoded placeholder rows
  
    entries.forEach((entry) => {
      const row = document.createElement('div');
      row.className = 'ledger-row';
      row.innerHTML = `
        <span class="ledger-date">${formatDate(entry.date)}</span>
        <div>
          <h2 class="ledger-title">${escapeHtml(entry.title)}</h2>
          <p class="ledger-body">${escapeHtml(entry.body)}</p>
        </div>
      `;
      ledger.appendChild(row);
    });
  });
  
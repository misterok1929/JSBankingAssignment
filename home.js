/**
 * home.js
 * Milestone 4: replace the hardcoded cards with the 5 most recent
 * entries pulled from localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('entry-grid');
    const entries = getEntries(); // already newest-first, see storage.js -> addEntry()
  
    if (entries.length === 0) {
      // Nothing saved yet — leave the hardcoded placeholder cards in place
      // so the layout still has something to show on a first visit.
      return;
    }
  
    // "5 most recent": entries are stored newest-first (unshift on save),
    // so the first 5 items in the array ARE the 5 most recent — .slice(0, 5)
    // grabs them without mutating the underlying array.
    const recent = entries.slice(0, 5);
  
    grid.innerHTML = ''; // clear the hardcoded placeholder cards
  
    recent.forEach((entry) => {
      const card = document.createElement('article');
      card.className = 'entry-card';
      card.innerHTML = `
        <p class="entry-card-date">${formatDate(entry.date)}</p>
        <h2 class="entry-card-title">${escapeHtml(entry.title)}</h2>
        <p class="entry-card-snippet">${escapeHtml(entry.body)}</p>
      `;
      grid.appendChild(card);
    });
  });
  
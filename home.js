/**
 * home.js
 * Milestone 4: replace the hardcoded cards with the 5 most recent entries.
 */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('entry-grid');
  const entries = getEntries(); // sorted newest first by date, see storage.js

  // The welcome section is for visitors who aren't logged in.
  const user = currentUser();
  if (user) {
    document.querySelector('#hero').hidden = true;
    document.querySelector('.page-title').textContent = 'Welcome back, ' + user;
  }

  grid.innerHTML = ''; // clear the hardcoded placeholder cards

  if (entries.length === 0) {
    grid.classList.remove('entry-grid');
    grid.innerHTML = `
      <div class="empty-state">
        <p>Nothing here yet. Your five newest entries will show up on this page.</p>
        <a href="new-entry.html" class="btn btn-primary">Write your first page</a>
      </div>
    `;
    return;
  }

  // "5 most recent": the array is sorted newest-first, so the first 5 items
  // are the 5 most recent. slice(0, 5) copies them without changing the array.
  const recent = entries.slice(0, 5);

  recent.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'entry-card';
    card.innerHTML = `
      <p class="entry-card-date">${formatDate(entry.date)}</p>
      <h2 class="entry-card-title"><a href="entry.html?id=${entry.id}">${escapeHtml(entry.title)}</a></h2>
      <p class="entry-card-snippet">${escapeHtml(entry.body)}</p>
    `;
    grid.appendChild(card);
  });
});

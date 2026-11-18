/**
 * profile.js
 * Summary stats, backup download and "delete all" for the current diary.
 */

document.addEventListener('DOMContentLoaded', () => {
  const entries = getEntries();
  const message = document.querySelector('#profile-message');
  const user = currentUser();

  document.querySelector('#who').textContent = user
    ? 'Signed in as ' + user + '. These entries belong to this account.'
    : 'Browsing as a guest. Log in or register to keep a separate diary.';

  document.querySelector('#stat-count').textContent = entries.length;

  const words = entries.reduce((total, e) => {
    const trimmed = e.body.trim();
    return total + (trimmed ? trimmed.split(/\s+/).length : 0);
  }, 0);
  document.querySelector('#stat-words').textContent = words;

  // Entries are sorted newest-first, so the last one is the oldest.
  if (entries.length > 0) {
    document.querySelector('#stat-first').textContent = formatDate(entries[entries.length - 1].date);
  }

  document.querySelector('#export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'marginalia-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    message.textContent = 'Backup downloaded.';
    message.classList.add('show');
  });

  document.querySelector('#clear-btn').addEventListener('click', () => {
    if (entries.length === 0) {
      message.textContent = 'There are no entries to delete.';
      message.classList.add('show');
      return;
    }
    if (confirm('Delete all ' + entries.length + ' entries? This cannot be undone.')) {
      localStorage.removeItem(entriesKey());
      location.reload();
    }
  });
});

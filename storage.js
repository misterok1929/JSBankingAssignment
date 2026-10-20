const ENTRIES_KEY = 'entries';

/** Returns the array of saved entries (or an empty array if none exist yet). */
function getEntries() {
  const raw = localStorage.getItem(ENTRIES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Could not parse saved entries, resetting.', err);
    return [];
  }
}

/** Saves the full entries array back to localStorage as a JSON string. */
function saveEntries(entries) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

/** Adds one new entry object to the front of the array and persists it. */
function addEntry(entry) {
  const entries = getEntries();
  entries.unshift(entry); // newest first
  saveEntries(entries);
  return entries;
}

/** Formats an ISO date string like "2026-03-14" as "Mar 14, 2026". */
function formatDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Escapes user text before dropping it into innerHTML, to avoid injecting markup. */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


/**
 * storage.js
 * Shared helpers for reading/writing diary entries in localStorage.
 *
 * localStorage only stores strings, so we JSON.stringify on the way in and
 * JSON.parse on the way out. localStorage is shared by every page on the
 * same site, so all the HTML files read the same data.
 *
 * Guests save to the key "entries". A logged-in user saves to
 * "entries_<username>", so each account has its own diary.
 */

const GUEST_KEY = 'entries';
const SESSION_KEY = 'marginalia_session';

/** The logged-in username, or null when browsing as a guest. */
function currentUser() {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch (err) {
    return null;
  }
}

/** Which localStorage key holds the current diary. */
function entriesKey() {
  const user = currentUser();
  return user ? 'entries_' + user.toLowerCase() : GUEST_KEY;
}

/** Newest date first. Entries on the same day: the one written last comes first. */
function sortEntries(list) {
  return list.slice().sort((a, b) => {
    return b.date.localeCompare(a.date) || Number(b.id) - Number(a.id);
  });
}

/** Returns all saved entries, newest first (empty array if there are none). */
function getEntries(key) {
  const raw = localStorage.getItem(key || entriesKey());
  if (!raw) return [];
  try {
    return sortEntries(JSON.parse(raw));
  } catch (err) {
    console.error('Could not read saved entries.', err);
    return [];
  }
}

/** Writes the whole entries array back to localStorage as a JSON string. */
function saveEntries(entries, key) {
  localStorage.setItem(key || entriesKey(), JSON.stringify(entries));
}

/** Adds one new entry and saves. */
function addEntry(entry) {
  const entries = getEntries();
  entries.push(entry);
  saveEntries(entries);
}

/** Finds one entry by its id (or undefined). */
function findEntry(id) {
  return getEntries().find((e) => e.id === id);
}

/** Changes fields on an existing entry, e.g. updateEntry(id, { title: 'New' }). */
function updateEntry(id, changes) {
  const entries = getEntries().map((e) => (e.id === id ? Object.assign({}, e, changes) : e));
  saveEntries(entries);
}

/** Removes one entry by id. */
function deleteEntry(id) {
  saveEntries(getEntries().filter((e) => e.id !== id));
}

/** Today's date as "YYYY-MM-DD" in the person's own time zone. */
function todayIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

/** Formats "2026-03-14" as "14 Mar 2026". */
function formatDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Escapes user text before putting it into innerHTML, so it can't inject markup. */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

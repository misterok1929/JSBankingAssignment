# Marginalia — a digital diary

A multi-page diary app. Write entries in the browser and they persist across
reloads and pages using the Web Storage API (`localStorage`). There is no backend.

![Marginalia home page](screenshot.png)

**Live site:** https://misterok1929.github.io/JSBankingAssignment/

## What you can do

- **Write** an entry with a title, a reflection and a date of your choice
- **Edit** or **delete** any entry (deleting asks for confirmation)
- **Search** the vault by title or text
- **Read** one entry on its own page
- **Register / log in** (optional) so each account keeps its own separate diary
- **Download a backup** of your entries as a JSON file, or delete them all, from the profile page

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: the 5 most recent entries in a card grid |
| `new-entry.html` | Editor: form for a new entry (also used for editing) |
| `vault.html` | Vault: every entry in full-width rows, with search, edit and delete |
| `entry.html` | Reading view for a single entry |
| `profile.html` | Entry and word counts, backup download, delete all |
| `login.html` | Log in or register |

## How the "5 most recent entries" logic works

All entries live in one JSON array in `localStorage`. Every entry has a `date`
(`"2026-11-12"`) that the writer can choose, so the array is **sorted newest-first by
date** every time it is read (`getEntries()` in `storage.js`). Entries on the same day
are ordered by when they were written.

Because the array is already sorted, the home page (`home.js`) only needs:

```js
const entries = getEntries();       // sorted newest-first
const recent = entries.slice(0, 5); // the first 5 are the 5 most recent
```

`slice(0, 5)` returns a new array with the first five items and leaves the saved
data untouched. The vault page (`vault.js`) runs the same code without `.slice()`, so
it shows every entry.

Each entry is a plain object:

```js
{ id: "1737051234567", date: "2026-03-14", title: "A slow Sunday", body: "..." }
```

## How storage works

- `localStorage` only stores strings, so entries are saved with
  `localStorage.setItem('entries', JSON.stringify(entries))` and read back with
  `JSON.parse(localStorage.getItem('entries'))`.
- `localStorage` is shared by every page on the same site, which is why all the pages
  see the same entries.
- Guests save under the key `entries`. A logged-in user saves under `entries_<username>`.

Reference: [MDN Docs — Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

## About the login

The accounts are a practice feature. Everything is stored in the browser, and passwords
are salted and hashed with SHA-256 (the Web Crypto API) rather than saved as plain text.
There is no server, so it is **not real security**: anyone using the same browser can
inspect the stored data. Don't use a password from anywhere else.

## Run it locally

No build step. Open `index.html`, or serve the folder:

```bash
python3 -m http.server
```

then visit http://localhost:8000.

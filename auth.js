/**
 * auth.js
 * Optional accounts, stored in this browser only.
 *
 * IMPORTANT: this is a learning project. There is no server, so this is
 * NOT real security. Passwords are salted and hashed (never stored as plain
 * text), but anyone with access to this browser can open the dev tools and
 * see or delete the data. Don't reuse a real password here.
 */

const USERS_KEY = 'marginalia_users';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (err) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeSalt() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** SHA-256 of salt + password, as a hex string. */
async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + password);
  if (window.crypto && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Very old browsers only: a simple fallback hash.
  let h = 5381;
  for (const byte of data) h = ((h << 5) + h + byte) >>> 0;
  return 'f' + h.toString(16);
}

/** Creates an account and logs in. Returns { ok: true } or { ok: false, error }. */
async function registerUser(username, password) {
  username = username.trim();
  if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
    return { ok: false, error: 'Username must be 3 to 20 letters, numbers or underscores.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }
  const users = getUsers();
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return { ok: false, error: 'That username is already taken.' };
  }
  const salt = makeSalt();
  users.push({ username, salt, hash: await hashPassword(password, salt) });
  saveUsers(users);

  // Offer to bring across anything written as a guest.
  const guestEntries = getEntries(GUEST_KEY);
  localStorage.setItem(SESSION_KEY, username);
  if (guestEntries.length > 0) {
    const move = confirm('Move the ' + guestEntries.length + ' entries you wrote as a guest into this account?');
    if (move) {
      saveEntries(guestEntries);
      localStorage.removeItem(GUEST_KEY);
    }
  }
  return { ok: true };
}

/** Checks the password and logs in. Returns { ok: true } or { ok: false, error }. */
async function loginUser(username, password) {
  const user = getUsers().find((u) => u.username.toLowerCase() === username.trim().toLowerCase());
  if (!user || (await hashPassword(password, user.salt)) !== user.hash) {
    return { ok: false, error: 'Username or password is incorrect.' };
  }
  localStorage.setItem(SESSION_KEY, user.username);
  return { ok: true };
}

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

/** Adds "Log in" (or "username · Log out") to the top bar of every page. */
function renderAuthNav() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;
  const avatar = nav.querySelector('.avatar');
  const user = currentUser();

  if (user) {
    const out = document.createElement('a');
    out.href = '#';
    out.className = 'nav-link';
    out.textContent = 'Log out (' + user + ')';
    out.addEventListener('click', (event) => {
      event.preventDefault();
      logoutUser();
      window.location.href = 'index.html';
    });
    nav.insertBefore(out, avatar);
  } else {
    const login = document.createElement('a');
    login.href = 'login.html';
    login.className = 'nav-link';
    login.textContent = 'Log in';
    nav.insertBefore(login, avatar);
  }
}

document.addEventListener('DOMContentLoaded', renderAuthNav);

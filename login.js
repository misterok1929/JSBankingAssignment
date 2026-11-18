/**
 * login.js
 * Log in / register forms for the optional local accounts.
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');
  const registerForm = document.querySelector('#register-form');
  const tabLogin = document.querySelector('#tab-login');
  const tabRegister = document.querySelector('#tab-register');
  const message = document.querySelector('#auth-message');

  function showTab(which) {
    const isLogin = which === 'login';
    loginForm.hidden = !isLogin;
    registerForm.hidden = isLogin;
    tabLogin.classList.toggle('active', isLogin);
    tabRegister.classList.toggle('active', !isLogin);
    tabLogin.setAttribute('aria-selected', isLogin);
    tabRegister.setAttribute('aria-selected', !isLogin);
    message.textContent = '';
  }

  tabLogin.addEventListener('click', () => showTab('login'));
  tabRegister.addEventListener('click', () => showTab('register'));

  // Already logged in? Say so instead of showing the forms.
  if (currentUser()) {
    document.querySelector('.tabs').hidden = true;
    loginForm.hidden = true;
    message.textContent = 'You are logged in as ' + currentUser() + '. Use "Log out" in the top bar to switch account.';
    message.classList.add('ok');
    return;
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const result = await loginUser(
      document.querySelector('#login-user').value,
      document.querySelector('#login-pass').value
    );
    if (result.ok) {
      window.location.href = 'index.html';
    } else {
      message.classList.remove('ok');
      message.textContent = result.error;
    }
  });

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const result = await registerUser(
      document.querySelector('#reg-user').value,
      document.querySelector('#reg-pass').value
    );
    if (result.ok) {
      window.location.href = 'index.html';
    } else {
      message.classList.remove('ok');
      message.textContent = result.error;
    }
  });
});

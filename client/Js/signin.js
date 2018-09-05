
const loginForm = document.querySelector('form');
const footer = document.querySelector('#footer');
const formContainer = document.querySelector('#form-container');
const errorContent = document.querySelector('#login-error-container p');
const errorContainer = document.querySelector('#login-error-container');
const successContent = document.querySelector('#login-success-container p');
const successContainer = document.querySelector('#login-success-container');

loginForm.addEventListener('submit', (event) => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const userDetails = {
    username,
    password,
  };
  event.preventDefault();
  fetch(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(res => res.json()).then((res) => {
    if (res.status !== 'success') {
      errorContent.textContent = res.data.message;
      errorContainer.style.display = 'block';
    } else {
      localStorage.setItem('token', res.data.token);
      successContent.textContent = `${res.data.message} !`;
      footer.style.cssText = 'position:fixed;bottom:0';
      errorContainer.style.display = 'none';
      formContainer.style.display = 'none';
      successContainer.style.display = 'block';
      setTimeout(() => {
        window.location = '/client/Html/homePage.html';
      }, 2500);
    }
  });
});

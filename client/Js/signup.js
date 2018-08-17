
const signupForm = document.querySelector('form');
const footer = document.querySelector('#footer');
const formContainer = document.querySelector('#form-container');
const errorContent = document.querySelector('#signup-error-container p');
const errorContainer = document.querySelector('#signup-error-container');
const successContent = document.querySelector('#signup-success-container p');
const successContainer = document.querySelector('#signup-success-container');

signupForm.addEventListener('submit', (event) => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const userDetails = {
    username,
    password,
    email,
  };
  event.preventDefault();
  fetch(
    '/api/v1/auth/signup',
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
        document.location = '/client/Html/homePage.html';
      }, 2500);
    }
  });
});


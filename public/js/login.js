const loginAlertEl = document.querySelector('.login-alert');
const signupAlertEl = document.querySelector('.signup-alert');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the home page
      //awaiting loggedIn function saved in db, as observed delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      document.location.replace('/dashboard');
    } else if (response.status===403) {
      loginAlertEl.textContent = "Incorrect email or password";
    } else if (response.status===404) {
      loginAlertEl.textContent = "Login failed.";
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      document.location.replace('/dashboard');
    } else if (response.status === 400 ) {
      signupAlertEl.textContent = "Signup failed. Make sure your user is unique";
    }
    else {
      alert(response.statusText);
    }
  }
};

function showSignupForm() {
  loginAlertEl.textContent="";
  signupAlertEl.textContent="";
  document.getElementById("login-section").style.display = "none";
  document.getElementById("signup-section").style.display = "block";
}  

function showLoginForm() {
  loginAlertEl.textContent="";
  signupAlertEl.textContent="";
  document.getElementById("login-section").style.display = "block";
  document.getElementById("signup-section").style.display = "none";
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

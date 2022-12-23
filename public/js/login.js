const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.getElementById('email-login').value.trim();
  const password = document.getElementById('password-login').value.trim();

  //cleanup fields
  document.getElementById('email-login').value="";
  document.getElementById('password-login').value="";


  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      res.status(400).json("Login error. Check error log.");
    }
  }
};

const switchToSignUpHandler = async(event) => {
  document.location.replace('/signup');
}

document.getElementById('login-form').addEventListener('submit', loginFormHandler);
document.getElementById('signup').addEventListener('submit', switchToSignUpHandler);

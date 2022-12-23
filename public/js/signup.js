const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById('name-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();

  document.getElementById('name-signup').value="";
  document.getElementById('email-signup').value="";
  document.getElementById('password-signup').value="";

  if (username && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      res.status(400).json("Signup error. Check error log.");
    }
  }
};

document.getElementById('signup-form').addEventListener('submit', signupFormHandler);
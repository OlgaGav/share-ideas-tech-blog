const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogpost-title').value.trim();
  const post = document.querySelector('#blogpost-desc').value.trim();

  if (title && post) {
    const response = await fetch(`/api/blogposts`, {
      method: 'POST',
      body: JSON.stringify({ title, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blogpost');
    }
  }
};

function showCreatePost() {
  document.getElementById("new-post-form").style.display = "block";
  document.getElementById("current-posts").style.display = "none";
}

document
  .querySelector('.new-blogpost-form')
  .addEventListener('submit', newFormHandler);


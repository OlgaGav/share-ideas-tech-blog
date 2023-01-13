const delButtonHandler = async (id) => {
    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blogpost');
    }
};

const updateButtonHandler = async (id) => {
  const title = document.getElementById("blogpost-title").value;
  const post = document.getElementById("blogpost-desc").value;
    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(`Failed to update blogpost, status ${response.status}`);
    }

};

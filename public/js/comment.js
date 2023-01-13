const submitComment = async function (post_id) {
  const content = document.getElementById("comment-content").value;
  try {
    const response = await fetch(`/api/blogposts/${post_id}/comment`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.getElementById("comment-content").textContent = "";
      document.location.reload();
    } else {
      console.log(`Failed to submit comment, status ${response.status}`);
    }
  } catch (err) {
    console.log(err);
  }
};

document.getElementById('createPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    axios.post('http://localhost:3000/posts', {
      title: title,
      content: content
    })
    .then(function(response) {
      console.log(response.data);
      fetchPosts();
    })
    .catch(function(error) {
      console.error(error);
    });
  });
  
  function fetchPosts() {
    axios.get('http://localhost:3000/posts')
    .then(function(response) {
      const posts = response.data;
      let postsHTML = '';
      posts.forEach(post => {
        postsHTML += `
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.content}</p>
              <button class="btn btn-warning" onclick="editPost(${post.id})">Edit</button>
              <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
            </div>
          </div>
        `;
      });
      document.getElementById('posts').innerHTML = postsHTML;
    })
    .catch(function(error) {
      console.error(error);
    });
  }
  
  function deletePost(id) {
    axios.delete(`http://localhost:3000/posts/${id}`)
    .then(function(response) {
      console.log(response.data);
      fetchPosts();
    })
    .catch(function(error) {
      console.error(error);
    });
  }
  
 
  fetchPosts();
  
  function editPost(id) {
    axios.get(`http://localhost:3000/posts/${id}`)
    .then(function(response) {
      const post = response.data;
      document.getElementById('editPostId').value = post.id;
      document.getElementById('editTitle').value = post.title;
      document.getElementById('editContent').value = post.content;
      document.getElementById('editPostForm').style.display = 'block';
    })
    .catch(function(error) {
      console.error(error);
    });
  }
  
  document.getElementById('updatePostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('editPostId').value;
    const title = document.getElementById('editTitle').value;
    const content = document.getElementById('editContent').value;
  
    axios.put(`http://localhost:3000/posts/${id}`, {
      title: title,
      content: content
    })
    .then(function(response) {
      console.log(response.data);
      fetchPosts();
      document.getElementById('editPostForm').style.display = 'none';
    })
    .catch(function(error) {
      console.error(error);
    });
  });
  
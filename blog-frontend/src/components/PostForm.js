import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/posts', { title, content })
      .then(response => {
        setTitle('');
        setContent('');
        alert('Post created!');
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Post</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;

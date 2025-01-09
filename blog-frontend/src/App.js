import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<PostForm />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

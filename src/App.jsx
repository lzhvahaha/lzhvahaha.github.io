import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import TagsPage from './pages/TagsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:slug" element={<ArticleDetailPage />} />
      <Route path="/tags" element={<TagsPage />} />
    </Routes>
  );
}

export default App;

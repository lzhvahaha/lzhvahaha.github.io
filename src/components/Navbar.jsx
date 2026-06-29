import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

/**
 * Navbar component - shared across pages
 * Homepage:  About | CV | Research | Publications | 文章
 * Articles: Logo | 文章 | 标签 | 首页
 * Tags:    Logo | 文章 | 标签(高亮) | 首页
 */
export default function Navbar() {
  const location = useLocation();
  const isArticlesPage = location.pathname === '/articles';
  const isTagsPage = location.pathname === '/tags';

  /* ---------- homepage nav ---------- */
  if (!isArticlesPage && !isTagsPage) {
    return (
      <nav
        className="w-full max-w-[1200px] mx-auto h-[71px] bg-white flex items-center justify-between px-5 md:px-12 lg:px-[120px]"
        style={{ borderBottom: '1px solid #E5E2D7' }}
      >
        <span className="font-serif text-[20px] font-semibold text-text-primary">
          Zihao Li
        </span>
        <div className="flex items-center gap-9">
          <a href="#about" className="font-sans text-[15px] font-medium text-text-primary">About</a>
          <a href="#cv" className="font-sans text-[15px] text-text-secondary">CV</a>
          <a href="#research" className="font-sans text-[15px] text-text-secondary">Research</a>
          <a href="#publications" className="font-sans text-[15px] text-text-secondary">Publications</a>
          <Link to="/articles" className="font-sans text-[15px] font-medium text-accent-blue">文章</Link>
        </div>
      </nav>
    );
  }

  /* ---------- articles/tags page nav ---------- */
  return (
    <nav
      className="w-full max-w-[1200px] mx-auto h-[79px] bg-white flex items-center justify-between px-5 md:px-12 lg:px-[120px]"
      style={{ borderBottom: '1px solid #E5E2D7' }}
    >
      <Link to="/" className="font-serif text-[20px] font-semibold text-text-primary">
        Zihao Li
      </Link>

      <div className="flex items-center gap-9">
        <Link
          to="/articles"
          className={`font-sans text-[15px] ${isTagsPage ? 'text-text-secondary' : 'font-medium text-text-primary'}`}
        >
          文章
        </Link>
        <Link
          to="/tags"
          className={`font-sans text-[15px] ${isTagsPage ? 'font-medium text-accent-blue' : 'text-text-secondary'}`}
        >
          标签
        </Link>
        <Link to="/" className="font-sans text-[15px] text-text-secondary">
          首页
        </Link>
      </div>
    </nav>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * 404 NotFoundPage — 页面不存在
 * 提供返回首页和文章列表的链接
 */
export default function NotFoundPage() {
  return (
    <div className="page-container bg-page-bg">
      <Navbar />
      <main className="w-full max-w-[1200px] mx-auto px-5 md:px-12 lg:px-[120px] flex flex-col items-center justify-center" style={{ paddingTop: 120, paddingBottom: 120, gap: 16 }}>
        <h1 className="font-serif font-semibold text-text-primary" style={{ fontSize: '72px', lineHeight: '100%' }}>
          404
        </h1>
        <p className="font-serif text-text-secondary" style={{ fontSize: '20px', lineHeight: '150%' }}>
          页面不存在
        </p>
        <p className="font-serif text-text-tertiary" style={{ fontSize: '16px', lineHeight: '160%', textAlign: 'center', maxWidth: 400 }}>
          你访问的页面可能已被移动或从未存在。
        </p>
        <div className="flex items-center gap-6 mt-4">
          <Link to="/" className="font-sans font-medium text-accent-blue" style={{ fontSize: '15px' }}>
            ← 返回首页
          </Link>
          <Link to="/articles" className="font-sans font-medium text-accent-blue" style={{ fontSize: '15px' }}>
            浏览文章 →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

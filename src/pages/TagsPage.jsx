import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { posts } from '../content/postsMeta';
/**
 * Tags Page — 按标签归档
 *
 * 数据来源：src/content/postsMeta.js（与文章列表页共用同一份数据源）
 *
 * Interaction logic:
 *   - Click a tag pill → archives section shows only articles with that tag
 *   - Default selected tag: 第一个标签（按数量降序）
 *   - Active tag pill is filled blue; others are bordered
 *   - Pagination: max 8 articles per page, with prev/next + page number buttons
 *   - 点击归档列表中的文章标题可跳转到文章详情页
 */

const POSTS_PER_PAGE = 8;

/* ── 从 postsMeta 构建归档用数据（date + tags）── */
const allPosts = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  date: p.date,
  tags: p.tags,
}));

/* ── Build tag list with counts (module-level, no hooks) ── */
const allTags = (() => {
  const tagMap = {};
  allPosts.forEach((post) => {
    post.tags.forEach((t) => {
      tagMap[t] = (tagMap[t] || 0) + 1;
    });
  });
  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
})();

/* ── Tag Pill ── */
function TagPill({ name, count, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center"
      style={{
        height: 34,
        padding: '8px 16px',
        borderRadius: 20,
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        gap: 6,
        backgroundColor: isActive ? '#003A5C' : 'transparent',
        color: isActive ? '#FFFFFF' : '#1A1A1A',
        border: isActive ? 'none' : '1px solid #E5E2D7',
        cursor: isActive ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <span>{name}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: isActive ? '#A0C4D9' : '#7D7D7D' }}>
        {count}
      </span>
    </button>
  );
}

/* ── Archive Row（可点击跳转详情页）── */
function ArchiveRow({ slug, title, date, tags }) {
  return (
    <article
      className="flex flex-col"
      style={{ padding: '16px 24px', gap: 6, borderTop: '1px solid #E5E2D7' }}
    >
      <Link
        to={`/articles/${slug}`}
        className="font-serif font-semibold text-text-primary"
        style={{ fontSize: '19px', lineHeight: '135%' }}
      >
        {title}
      </Link>
      <p className="font-sans font-medium text-meta-brown" style={{ fontSize: '14px', lineHeight: 'normal' }}>
        {date} &nbsp;·&nbsp; {tags.map((t) => `${t}`).join('  ')}
      </p>
    </article>
  );
}

/* ── Pagination Controls ── */
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const btnBase = {
    height: 36,
    minWidth: 36,
    padding: '0 12px',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
  };

  return (
    <nav className="flex items-center justify-center" style={{ gap: 8 }}>
      {/* Prev button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...btnBase,
          backgroundColor: 'transparent',
          color: currentPage === 1 ? '#C0C0C0' : '#444444',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        ‹ 上一页
      </button>

      {/* Page numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onPageChange(num)}
          style={{
            ...btnBase,
            backgroundColor: num === currentPage ? '#003A5C' : 'transparent',
            color: num === currentPage ? '#FFFFFF' : '#444444',
            border: num === currentPage ? 'none' : '1px solid #E5E2D7',
          }}
        >
          {num}
        </button>
      ))}

      {/* Next button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...btnBase,
          backgroundColor: 'transparent',
          color: currentPage === totalPages ? '#C0C0C0' : '#444444',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        下一页 ›
      </button>
    </nav>
  );
}

export default function TagsPage() {
  const [activeTag, setActiveTag] = useState(allTags.length > 0 ? allTags[0].name : '');
  const [currentPage, setCurrentPage] = useState(1);

  /* ── Filter posts by active tag ── */
  const filteredPosts = allPosts.filter((p) => p.tags.includes(activeTag));

  /* ── Reset to page 1 when tag changes ── */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  /* ── Pagination calculation ── */
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  /* ── Tag click handler: set tag + reset page ── */
  const handleTagClick = (tagName) => {
    setActiveTag(tagName);
    setCurrentPage(1);
  };

  return (
    <div className="page-container bg-page-bg">
      <Navbar />

      <main className="w-full max-w-[1200px] mx-auto">
        {/* ── Hero ── */}
        <section className="flex flex-col px-5 md:px-12 lg:px-[120px]" style={{ paddingTop: 40, paddingBottom: 20, gap: 20 }}>
          <h1 className="font-serif font-semibold text-text-primary" style={{ fontSize: '44px', lineHeight: '120%', maxWidth: 308 }}>
            按标签归档
          </h1>
          <p className="font-serif text-text-secondary" style={{ fontSize: '18px', lineHeight: '170%', maxWidth: 880 }}>
            所有文章按主题标签分类整理。点击任意标签可快速浏览相关内容。
          </p>
        </section>

        {/* ── Tags Cloud ── */}
        <section className="flex flex-col px-5 md:px-12 lg:px-[120px]" style={{ paddingTop: 20, paddingBottom: 20, gap: 18 }}>
          <header className="flex items-baseline justify-between" style={{ height: 54 }}>
            <h2 className="font-serif font-semibold text-text-primary" style={{ fontSize: '28px', lineHeight: 'normal' }}>全部标签</h2>
            <span className="font-sans font-medium text-accent-blue" style={{ fontSize: '14px', lineHeight: 'normal' }}>
              共 {allPosts.length} 篇文章 · {allTags.length} 个标签
            </span>
          </header>

          {/* tag pills */}
          <div className="flex flex-wrap items-center" style={{ gap: 14 }}>
            {allTags.map((t) => (
              <TagPill
                key={t.name}
                {...t}
                isActive={t.name === activeTag}
                onClick={() => handleTagClick(t.name)}
              />
            ))}
          </div>
        </section>

        {/* ── Archives — paginated, max 8 per page ── */}
        <section className="flex flex-col px-5 md:px-12 lg:px-[120px]" style={{ paddingTop: 20, paddingBottom: 40, gap: 24 }}>
          {/* selected tag heading */}
          <h2
            className="font-serif font-semibold text-accent-blue"
            style={{ fontSize: '28px', lineHeight: '120%' }}
          >
            {activeTag} &nbsp;·&nbsp; {filteredPosts.length} 篇文章
          </h2>

          {/* paper rows (current page only) */}
          <div className="flex flex-col" style={{ gap: 0 }}>
            {paginatedPosts.map((p, i) => (
              <ArchiveRow key={`${activeTag}-${currentPage}-${i}`} {...p} />
            ))}
            {filteredPosts.length === 0 && (
              <p className="font-serif text-text-secondary" style={{ fontSize: '16px', padding: '24px 0' }}>
                暂无文章
              </p>
            )}
          </div>

          {/* Pagination controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

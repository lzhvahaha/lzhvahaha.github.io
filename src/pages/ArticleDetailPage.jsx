import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPostBySlug } from '../content/postsMeta';

// 用 Vite 的 import.meta.glob 一次性加载所有 markdown 原文（?raw 表示以字符串形式导入）
const postFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const meta = getPostBySlug(slug);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 滚动到顶部
    window.scrollTo(0, 0);

    const filePath = `../content/posts/${slug}.md`;
    const loader = postFiles[filePath];

    if (loader) {
      loader()
        .then((raw) => {
          setContent(raw);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }, [slug]);

  /* ── 文章不存在 ── */
  if (!meta) {
    return (
      <div className="page-container bg-page-bg">
        <Navbar />
        <main className="w-full max-w-[1200px] mx-auto px-5 md:px-12 lg:px-[120px]" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <p className="font-serif text-text-secondary" style={{ fontSize: '20px' }}>
            文章不存在。
          </p>
          <Link to="/articles" className="font-sans font-medium text-accent-blue" style={{ fontSize: '15px' }}>
            ← 返回文章列表
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container bg-page-bg">
      <Navbar />

      <main className="w-full max-w-[1200px] mx-auto">
        {/* ── 文章头部 ── */}
        <section
          className="flex flex-col px-5 md:px-12 lg:px-[120px]"
          style={{ paddingTop: 48, paddingBottom: 24, gap: 16 }}
        >
          {/* 返回链接 */}
          <Link
            to="/articles"
            className="font-sans font-medium text-accent-blue"
            style={{ fontSize: '14px', lineHeight: 'normal' }}
          >
            ← 返回文章列表
          </Link>

          {/* 标题 */}
          <h1
            className="font-serif font-semibold text-text-primary"
            style={{ fontSize: '38px', lineHeight: '125%', maxWidth: 900 }}
          >
            {meta.title}
          </h1>

          {/* 元信息 */}
          <p
            className="font-sans font-medium text-meta-brown"
            style={{ fontSize: '14px', lineHeight: 'normal' }}
          >
            {meta.date} &nbsp;·&nbsp; {meta.tags.map((t) => `#${t}`).join('  ')}
          </p>
        </section>

        {/* ── 分隔线 ── */}
        <div className="mx-5 md:mx-12 lg:mx-[120px]" style={{ borderTop: '1px solid #E5E2D7' }} />

        {/* ── 正文 ── */}
        <section
          className="px-5 md:px-12 lg:px-[120px]"
          style={{ paddingTop: 32, paddingBottom: 60 }}
        >
          {loading ? (
            <p className="font-serif text-text-secondary" style={{ fontSize: '16px' }}>
              加载中…
            </p>
          ) : error ? (
            <div className="flex flex-col" style={{ gap: 12 }}>
              <p className="font-serif text-text-secondary" style={{ fontSize: '16px' }}>
                文章加载失败，请稍后重试。
              </p>
              <Link to="/articles" className="font-sans font-medium text-accent-blue" style={{ fontSize: '15px' }}>
                ← 返回文章列表
              </Link>
            </div>
          ) : (
            <article className="article-body" style={{ maxWidth: 880 }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {content}
              </ReactMarkdown>
            </article>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

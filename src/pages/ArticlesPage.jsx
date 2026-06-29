import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { posts as realPosts, getPostsSorted } from '../content/postsMeta';

/**
 * Articles Page — 文章列表
 *
 * Structure:
 *   Header     (Logo | 文章 | 标签 | 首页)
 *   Hero       "关于学习和生活的记忆。"
 *   Posts      最新文章（来自 src/content/posts/，点击跳转详情页）
 *   Life-Essays 生活随笔
 *   Footer
 */

const lifeEssays = [
  {
    title: '雨季的京都：一场没有计划的旅行',
    date: '2026 年 6 月 15 日',
    tags: '#旅行  #随笔',
    desc: '梅雨季去京都，本想看寺院的青苔，却被雨困在咖啡店。后来发现，等待本身也是一种风景——这大概是一次「不抵达」的旅行。'
  },
  {
    title: '凌晨四点的实验室',
    date: '2026 年 5 月 30 日',
    tags: '#科研  #生活',
    desc: '模型不收敛的第三个夜晚，我坐在空无一人的实验室里，忽然想起导师说过的话：「研究不是赶路，是等。」那一夜我没有再调参，只是看窗外的天慢慢亮起来。'
  },
  {
    title: '读书：项飙《把自己作为方法》',
    date: '2026 年 5 月 20 日',
    tags: '#读书  #随笔',
    desc: '「附近」的消失，是当代人最隐秘的失去。重读项飙，思考研究者自身位置与学术生产的关系——以及如何在宏大叙事之外，重新建立与具体生活的连接。'
  },
  {
    title: '黄昏的未名湖',
    date: '2026 年 5 月 8 日',
    tags: '#日常  #随笔',
    desc: '下班后绕到未名湖边，夕阳把水面染成一块一块的蜂蜜色。几个学生在背书，声音忽远忽近。这样的黄昏在论文里是写不出来的，但它比任何一次实验都更真实。'
  }
];

/**
 * 可点击的文章卡片（用于最新文章，跳转详情页）
 */
function ClickablePostCard({ slug, title, date, tags, excerpt }) {
  return (
    <Link
      to={`/articles/${slug}`}
      className="flex flex-col"
      style={{
        padding: '18px 10px',
        gap: '8px',
        borderTop: '1px solid #E5E2D7',
        borderLeft: '1px solid #E5E2D7',
        borderRight: '1px solid #E5E2D7',
        transition: 'background-color 0.2s ease',
      }}
    >
      <h3
        className="font-serif font-semibold text-text-primary"
        style={{ fontSize: '21px', lineHeight: '135%' }}
      >
        {title}
      </h3>
      <p
        className="font-sans font-medium text-meta-brown"
        style={{ fontSize: '14px', lineHeight: 'normal' }}
      >
        {date} &nbsp;·&nbsp; {tags.map((t) => `#${t}`).join('  ')}
      </p>
      <p
        className="font-serif text-text-secondary"
        style={{ fontSize: '16px', lineHeight: '170%' }}
      >
        {excerpt}
      </p>
    </Link>
  );
}

/**
 * 静态文章卡片（用于生活随笔，暂无详情页）
 */
function PostCard({ title, date, tags, desc }) {
  return (
    <article
      className="flex flex-col"
      style={{
        padding: '18px 10px',
        gap: '8px',
        borderTop: '1px solid #E5E2D7',
        borderLeft: '1px solid #E5E2D7',
        borderRight: '1px solid #E5E2D7',
      }}
    >
      <h3
        className="font-serif font-semibold text-text-primary"
        style={{ fontSize: '21px', lineHeight: '135%' }}
      >
        {title}
      </h3>
      <p
        className="font-sans font-medium text-meta-brown"
        style={{ fontSize: '14px', lineHeight: 'normal' }}
      >
        {date} &nbsp;·&nbsp; {tags}
      </p>
      <p
        className="font-serif text-text-secondary"
        style={{ fontSize: '16px', lineHeight: '170%' }}
      >
        {desc}
      </p>
    </article>
  );
}

/**
 * Section header
 */
function SectionHeader({ title, moreHref }) {
  return (
    <header
      className="flex items-baseline justify-between"
      style={{ height: 54 }}
    >
      <h2
        className="font-serif font-semibold text-text-primary"
        style={{ fontSize: '28px', lineHeight: 'normal' }}
      >
        {title}
      </h2>
      {moreHref && (
        <Link
          to={moreHref}
          className="font-sans font-medium text-accent-blue"
          style={{ fontSize: '14px', lineHeight: 'normal' }}
        >
          查看全部 →
        </Link>
      )}
    </header>
  );
}

export default function ArticlesPage() {
  return (
    <div className="page-container bg-page-bg">
      <Navbar />

      <main style={{ width: 1440 }}>
        {/* ── Hero ── */}
        <section
          className="flex flex-col"
          style={{ paddingLeft: 120, paddingRight: 120, paddingTop: 60, paddingBottom: 20, gap: 20 }}
        >
          <h1
            className="font-serif font-semibold text-text-primary"
            style={{ fontSize: '44px', lineHeight: '120%', maxWidth: 308 }}
          >
            关于学习和生活
            <br />
            的记忆。
          </h1>
          <p
            className="font-serif text-text-secondary"
            style={{ fontSize: '18px', lineHeight: '170%', maxWidth: 880 }}
          >
            不定期记录学习中的思考与生活里的片段。技术与人文交织，长文与短笔记交替，
            偶有旅行与读书的摘录。
          </p>
        </section>

        {/* ── 最新文章（真实文章，可点击跳转） ── */}
        <section
          className="flex flex-col"
          style={{ paddingLeft: 120, paddingRight: 120, paddingTop: 20, paddingBottom: 20, gap: 0 }}
        >
          <SectionHeader title="最新文章" moreHref="/tags" />
          <div className="flex flex-col" style={{ gap: 0 }}>
            {getPostsSorted().map((post) => (
              <ClickablePostCard key={post.slug} {...post} />
            ))}
            <div style={{ borderTop: '1px solid #E5E2D7' }} />
          </div>
        </section>

        {/* ── 生活随笔 ── */}
        <section
          className="flex flex-col"
          style={{ paddingLeft: 120, paddingRight: 120, paddingTop: 20, paddingBottom: 40, gap: 0 }}
        >
          <SectionHeader title="生活随笔" moreHref="/tags" />
          <div className="flex flex-col" style={{ gap: 0 }}>
            {lifeEssays.map((essay, i) => (
              <PostCard key={`life-${i}`} {...essay} />
            ))}
            <div style={{ borderTop: '1px solid #E5E2D7' }} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

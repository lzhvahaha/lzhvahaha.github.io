import React from 'react';

/**
 * Footer — matches node "Footer" (2:45 / 3:last)
 * Design spec:
 *   - height: 70px, border-top: 1px solid #E5E2D7
 *   - Footer-Bottom: padding-top 28, padding-bottom 24
 *   - HORIZONTAL, space-between, baseline aligned
 *   - Copyright / Motto: 13px Source Serif 4 Regular, color #444444
 */
export default function Footer() {
  return (
    <footer
      className="w-full bg-page-bg"
      style={{
        borderTop: '1px solid #E5E2D7',
      }}
    >
      <div
        className="mx-auto flex items-baseline justify-between"
        style={{
          width: 1440,
          paddingLeft: 120,
          paddingRight: 120,
          paddingTop: 28,
          paddingBottom: 24,
        }}
      >
        <span
          className="font-serif text-text-secondary"
          style={{ fontSize: '13px', lineHeight: 'normal' }}
        >
          © 2026 李子豪. All rights reserved.
        </span>
        <span
          className="font-serif text-text-secondary"
          style={{ fontSize: '13px', lineHeight: 'normal' }}
        >
          Hosted on GitHub Pages &nbsp;·&nbsp; Last updated June 2026
        </span>
      </div>
    </footer>
  );
}

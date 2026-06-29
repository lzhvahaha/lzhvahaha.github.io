import React, { useState, useEffect } from 'react';

/**
 * Publications Section — 在学期间成果
 *
 * Two groups: 期刊论文 (Journal Papers) + 授权专利 (Patents)
 * Paper row: title / authors / venue(期刊 or 专利状态)
 */

const publicationsByYear = [
  {
    year: '期刊论文',
    perPage: 6,
    papers: [
      {
        title: 'Isolated scan unit and scanning tunneling microscope for stable imaging in ultra-high magnetic fields',
        authors: 'Jihao Wang*, Zihao Li*, ..., Qingyou Lu',
        venue: 'Ultramicroscopy',
        pdf: '/pdfs/01-isolated-scan-stm.pdf'
      },
      {
        title: 'A Compact Piezo-Drive Rotatable Scanning Tunneling Microscope in a 12T Cryogen-Free Magnet',
        authors: 'JunWei Liu, Zihao Li, ..., Qingyou Lu',
        venue: 'Microscopy Research and Technique',
        pdf: '/pdfs/02-compact-rotatable-stm.pdf'
      },
      {
        title: 'Stabilization of nanoscale magnetic bubbles in zero magnetic field by rotatable magnetic force microscopy',
        authors: 'Min Zhang, Zihao Li, ..., Qingyou Lu',
        venue: 'Micron',
        pdf: '/pdfs/03-magnetic-bubbles-mfm.pdf'
      },
      {
        title: 'An ultra-compact piezoelectric motor with self-satisfied symmetry for enhanced performance',
        authors: 'Yalong Yang, Shengxin Cheng, Qingyou Lu, Zihao Li, ...',
        venue: 'Review of Scientific Instruments',
        pdf: '/pdfs/04-ultra-compact-piezo-motor.pdf'
      },
      {
        title: 'Compact Design, Construction, and Evaluation of an in Situ ±90° Rotatable Magnetic Force Microscope in a 12 T Superconducting Magnet',
        authors: 'Min Zhang, Shuai Dong, Zihao Li, ..., Qingyou Lu',
        venue: 'Ultramicroscopy',
        pdf: '/pdfs/05-rotatable-mfm-12t.pdf'
      },
      {
        title: 'Optimized Fabrication and Characterization of W Tips for High-Performance Atomic-Resolution Scanning Tunneling Microscope',
        authors: 'Esmaeilzadeh Behnam, Minghao Chen, Zihao Li, ..., Qingyou Lu',
        venue: 'Chinese Journal of Chemical Physics',
        pdf: '/pdfs/06-w-tips-stm.pdf'
      },
      {
        title: '35 T water-cooled magnet scanning tunneling microscope for in-plane magnetic field measurement',
        authors: 'Dan Wu, Jihao Wang, Shuai Dong, Zihao Li, ..., Qingyou Lu',
        venue: 'Review of Scientific Instruments',
        pdf: '/pdfs/07-35t-water-cooled-stm.pdf'
      },
      {
        title: 'Lattice-Driven Topological Spin Textures in Cr₂Ge₂Te₆ Single Crystals',
        authors: 'Shuai Dong, Caihong Xie, Yuying Bai, Aile Wang, Zihao Li, ..., Qingyou Lu, Qiyuan Feng',
        venue: 'Advanced Functional Materials',
        pdf: '/pdfs/08-cr2ge2te6-spin-textures.pdf'
      },
      {
        title: 'Cryogenic magnetic force microscopy at 35 T and Sub-3 K in a water-cooled magnet',
        authors: 'Shuai Dong*, Kesen Zhao*, Min Zhang*, Zihao Li, ..., Qingyou Lu, Wenjie Meng',
        venue: 'Review of Scientific Instruments',
        pdf: '/pdfs/09-cryogenic-mfm-35t.pdf'
      }
    ]
  },
  {
    year: '授权专利',
    perPage: 3,
    papers: [
      {
        title: '一种基于相向运动减小摩擦力原理的二维压电马达及其使用方法',
        authors: '李子豪, …, 陆轻铀',
        venue: '已授权',
        pdf: '/pdfs/P01-opposing-motion-piezo-motor.pdf'
      },
      {
        title: '一种通孔冷壁矢量磁体结构及强磁场太赫兹近场测量系统',
        authors: '李子豪, …, 陆轻铀, 陆亚林',
        venue: '实质审查',
        pdf: '/pdfs/P02-vector-magnet-thz-nearfield.pdf'
      },
      {
        title: '扫描探针显微镜的探针步进扫描一体组件及步进扫描方法',
        authors: '李子豪, …, 陆轻铀',
        venue: '已授权',
        pdf: '/pdfs/P03-probe-step-scan-integrated.pdf'
      },
      {
        title: '一种针尖对针尖成像的扫描探针测量装置及控制方法',
        authors: '李子豪, …, 陆轻铀',
        venue: '实质审查',
        pdf: '/pdfs/P04-tip-to-tip-spm.pdf'
      },
      {
        title: '压电弯曲形变惯性步进器、步进扫描器及扫描探针显微镜',
        authors: '陆轻铀, 杨奥翔, 李子豪, …',
        venue: '已授权',
        pdf: '/pdfs/P05-piezo-bending-inertia-stepper.pdf'
      },
      {
        title: '四 XYZ 压电管并排驱动的多维压电马达及控制方法',
        authors: 'Syed Asad Maqbool, 陆轻铀, 李子豪, …',
        venue: '实质审查',
        pdf: '/pdfs/P06-xyz-piezo-tube-multi-axis-motor.pdf'
      }
    ]
  }
];

function PaperRow({ title, authors, venue, pdf }) {
  return (
    <article
      className="flex flex-col"
      style={{
        padding: '16px 24px',
        gap: '6px',
        borderTop: '1px solid #E5E2D7',
      }}
    >
      <h4
        className="font-serif font-semibold text-text-primary"
        style={{ fontSize: '19px', lineHeight: '135%' }}
      >
        {pdf ? (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent-blue"
            style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h4>
      {/* Authors and venue on the same line, venue shifted right a bit */}
      <div className="flex items-baseline" style={{ gap: 16 }}>
        <p
          className="font-serif text-text-secondary"
          style={{ fontSize: '15px', lineHeight: '150%' }}
        >
          {authors}
        </p>
        <span
          className="font-sans font-medium text-accent-blue"
          style={{ fontSize: '15px', lineHeight: '150%', marginLeft: 8 }}
        >
          {venue}
        </span>
      </div>
    </article>
  );
}

/* ── Pagination Controls (matches TagsPage style) ── */
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
    <nav className="flex items-center justify-center" style={{ gap: 8, marginTop: 10 }}>
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

export default function PublicationsSection() {
  const [pageStates, setPageStates] = useState(
    publicationsByYear.map(() => 1)
  );

  return (
    <section
      id="publications"
      className="w-full bg-page-bg flex flex-col"
      style={{
        borderTop: '1px solid #E5E2D7',
        paddingTop: 20,
        paddingBottom: 20,
        gap: 12,
      }}
    >
      <div className="mx-auto max-w-[1200px] w-full px-5 md:px-12 lg:px-[120px] flex flex-col" style={{ gap: 12 }}>
      {/* Section title */}
      <h2
        className="font-serif font-semibold text-text-primary"
        style={{ fontSize: '32px', lineHeight: '120%' }}
      >
        Publications &amp; Patents
      </h2>

      {/* Body: groups with 14px gap between groups */}
      <div className="flex flex-col" style={{ gap: 14 }}>
        {publicationsByYear.map(({ year, papers, perPage }, gIdx) => {
          const totalPages = Math.max(1, Math.ceil(papers.length / perPage));
          const currentPage = Math.min(pageStates[gIdx], totalPages);
          const paginated = papers.slice(
            (currentPage - 1) * perPage,
            currentPage * perPage
          );

          return (
            <div key={year} className="flex flex-col" style={{ gap: 0 }}>
              {/* Group heading */}
              <h3
                className="font-serif font-semibold text-accent-blue"
                style={{ fontSize: '28px', lineHeight: '120%' }}
              >
                {year}
              </h3>
              {/* Items stacked, shared top borders as dividers */}
              <div className="flex flex-col" style={{ gap: 0 }}>
                {paginated.map((paper, i) => (
                  <PaperRow key={`${year}-${currentPage}-${i}`} {...paper} />
                ))}
              </div>
              {/* Pagination (only when more than 1 page) */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(num) => {
                    const next = [...pageStates];
                    next[gIdx] = num;
                    setPageStates(next);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

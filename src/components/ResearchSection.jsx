import React from 'react';
import icon1Url from '../../assets/svg/spm-probe.svg';
import icon2Url from '../../assets/svg/cryo-snowflake.svg';
import icon3Url from '../../assets/svg/thz-wave.svg';
import icon4Url from '../../assets/svg/magnet-field.svg';

/**
 * Research Section — 研究方向
 * Title: "Research Directions" 32px
 * Grid: 2×2 cards (560px wide each), gap 24px
 */

const researchCards = [
  {
    icon: icon1Url,
    title: '扫描探针显微镜研制',
    desc: '扫描隧道显微镜（STM）与磁力显微镜（MFM）的设计、制作与搭建，包括压电马达、扫描单元、探针步进扫描组件等核心部件的研制，涵盖系统级工程实践。'
  },
  {
    icon: icon2Url,
    title: '低温强磁场 STM',
    desc: '面向极端环境的低温、强磁场扫描隧道显微镜系统，在 35T 水冷磁体、16T 干式磁体及极低温条件下实现原子级分辨成像与磁结构表征。'
  },
  {
    icon: icon3Url,
    title: '太赫兹近场成像',
    desc: '多场集成条件下的太赫兹近场扫描隧道显微镜（THz-STM）系统开发，突破低温真空限制，实现室温大气及低温强磁场下的原子分辨太赫兹隧道电流成像。'
  },
  {
    icon: icon4Url,
    title: '强磁场技术',
    desc: '大口径超导矢量磁体、通孔冷壁矢量磁体结构设计，以及 35T 水冷磁体联合干式磁体低温原位成像平台的搭建，服务于高通量物性测试。'
  }
];

function ResearchCard({ icon, title, desc }) {
  return (
    <article
      className="bg-white rounded-sm"
      style={{
        border: '1px solid #E5E2D7',
        width: 560,
        padding: '14px 18px',
      }}
    >
      {/* icon */}
      <img src={icon} alt="" className="w-8 h-8 mb-[6px]" />

      {/* title */}
      <h3 className="font-serif text-[22px] leading-[130%] font-semibold text-text-primary mb-[5px]">
        {title}
      </h3>

      {/* description */}
      <p className="font-serif text-[16px] leading-[165%] text-text-secondary">
        {desc}
      </p>
    </article>
  );
}

export default function ResearchSection() {
  return (
    <section id="research" className="w-full bg-page-bg pt-2 pb-4" style={{ borderTop: '1px solid #E5E2D7' }}>
      {/* heading */}
      <div style={{ width: 1440, paddingLeft: 120, paddingRight: 120 }}>
        <h2 className="font-serif text-[32px] leading-[120%] font-semibold text-text-primary mb-3 mt-3">
          Research Directions
        </h2>

        {/* grid */}
        <div className="flex flex-wrap gap-4">
          {researchCards.map((card, i) => (
            <ResearchCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

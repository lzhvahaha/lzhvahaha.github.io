import React from 'react';
import avatarUrl from '../../assets/images/3_13.png';

/**
 * About Section — 李子豪个人简介
 * Layout: Avatar(200×200 circle) + right side (name / title / contact links / bio)
 */
export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-page-bg pt-7 pb-6">
      <div className="mx-auto flex gap-14" style={{ width: 1440, paddingLeft: 120, paddingRight: 120 }}>
        {/* avatar */}
        <img
          src={avatarUrl}
          alt="李子豪"
          className="w-[200px] h-[200px] rounded-full object-cover shrink-0"
          style={{ clipPath: 'circle(50%)' }}
        />

        {/* right content */}
        <div className="flex-1 flex flex-col gap-[18px] max-w-[944px]">
          <h1 className="font-serif text-[50px] leading-[115%] font-semibold text-text-primary">
            Zihao Li&nbsp;&nbsp;李子豪
          </h1>

          <p className="font-serif text-[19px] leading-[140%] text-text-secondary">
            博士研究生  ·  中国科学技术大学  ·  凝聚态物理
          </p>

          {/* contact row */}
          <div className="flex items-center gap-7 mt-1">
            {[
              { label: 'Email', href: 'mailto:lizihao@mail.ustc.edu.cn' },
              { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Zihao-Li-94?ev=hdr_xprf' },
              { label: 'GitHub', href: 'https://github.com/lzhvahaha' },
              { label: 'ORCID', href: 'https://orcid.org/0009-0007-1095-793X' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-sans text-[15px] font-medium text-accent-blue"
              >
                {label}
              </a>
            ))}
          </div>

          {/* bio */}
          <p className="font-serif text-[18px] leading-[170%] text-text-primary mt-2 max-w-[880px]">
            我是中国科学技术大学凝聚态物理的博士生，在合肥微尺度物质国家研究中心度过博士时光。
            说白了，我是个喜欢"亲手搭仪器"的人——从一颗压电马达、一根探针，到整台能在极低温和强磁场里工作的扫描隧道显微镜（STM），
            都是我日常折腾的对象。最近也在做多场集成条件下的太赫兹近场 STM（THz-STM），试图看清更快的原子世界。
            更多的工作细节可以往下翻，这里就不剧透了。
          </p>
        </div>
      </div>
    </section>
  );
}

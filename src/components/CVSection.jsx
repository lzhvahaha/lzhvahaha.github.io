import React, { useState } from 'react';

/**
 * CV Section — 教育经历 / 项目经历 / 工作经历
 * 切换式展示，点击标签页按钮切换分组。默认展示"教育经历"。
 * Row layout: label (left, 140px) | content (right)
 */
const educationData = [
  {
    period: '2021 — 2026',
    title: '博士研究生  ·  凝聚态物理',
    desc: '中国科学技术大学  ·  合肥微尺度物质国家研究中心  ·  主要研究方向为扫描探针显微镜，在低温、强磁场扫描隧道显微镜系统设计、搭建方面有工程实践经验，从事多场集成条件下的 THz-STM 系统开发'
  },
  {
    period: '2017 — 2021',
    title: '工学学士  ·  材料物理',
    desc: '北京科技大学  ·  材料科学与工程学院  ·  GPA 3.72/4.0，成绩 89/100（排名 9/65）·  第十届全国大学生数学竞赛一等奖、第三十五届大学生物理竞赛 A 组二等奖、优秀毕业生、优秀毕业论文'
  },
  {
    period: '2014 — 2017',
    title: '高中  ·  理科实验班',
    desc: '河北省高碑店第一中学  ·  高考成绩 621（排名 1%）·  全国高中生数学联合竞赛二等奖、全国高中生物理竞赛省一等奖'
  }
];

const projectData = [
  {
    period: '重点研发',
    title: '基于加速器光源的高通量物性与结构原位表征',
    desc: '国家重点研发计划大科学装置前沿研究重点专项  ·  参与低温恒温器的设计、装配和维护；参与光波驱动磁力显微镜对 La₀.₆₇Ca₀.₃₃MnO₃ 的成像测试；主要参与与同步辐射光源 ARPES 联用的大范围 XY 马达的研制'
  },
  {
    period: '中科院专项',
    title: '35T 水冷磁体联合干式磁体低温原位原子成像平台',
    desc: '中国科学院重大科技基础设施维修改造项目  ·  负责 35T 水冷磁体低温扫描隧道显微镜的搭建和 35T 水冷磁体 STM 原子成像和磁结构 MFM 成像；参与 16T 磁体-极低温-超高真空扫描隧道显微镜系统的搭建'
  },
  {
    period: '重大仪器',
    title: '太赫兹近场高通量材料物性测试系统',
    desc: '国家重大仪器设备研制专项（部门推荐）·  突破传统 100K 低温和真空限制，首次获得室温大气环境下的原子分辨太赫兹隧道电流成像；突破多场条件集成技术瓶颈，首次获得低温强磁场下的原子分辨太赫兹近场隧道电流成像；参与国际首个大口径超导矢量磁体的设计'
  },
  {
    period: '十四五',
    title: '"空地一体量子精密测量实验设施"量子材料物性测量分系统',
    desc: '"十四五"国家重大科技基础设施  ·  主要负责太赫兹近场探测平台的调研、设计和建模；基于"太赫兹近场高通量材料物性测试系统"进行科学研究，为分系统建设做充分预研'
  },
  {
    period: '科协青培',
    title: '2025 年中国科协青年科技人才培育工程博士生专项计划',
    desc: '中国科学技术协会资助  ·  依托中国科协智能制造学会联合体，资助 2 万元/年；中国微米纳米技术学会微纳米测量与仪器分会学生志愿者'
  }
];

/* 工作经历（暂无数据，预留分组） */
const workData = [];

/* ── 分组配置 ── */
const groups = [
  { label: '教育经历', data: educationData },
  { label: '项目经历', data: projectData },
  { label: '工作经历', data: workData },
];

function TimelineRow({ period, title, desc }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-[10px] px-2" style={{ borderBottom: '1px solid #E5E2D7' }}>
      <span className="w-[100px] md:w-[140px] shrink-0 font-serif text-[16px] leading-[150%] text-text-secondary">
        {period}
      </span>
      <div className="flex flex-col gap-1">
        <h4 className="font-serif text-[19px] leading-[135%] font-semibold text-text-primary">
          {title}
        </h4>
        <p className="font-serif text-[16px] leading-[160%] text-text-secondary">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function CVSection() {
  const [activeGroup, setActiveGroup] = useState(0);

  const btnBase = {
    height: 36,
    padding: '0 14px',
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

  const current = groups[activeGroup];

  return (
    <section id="cv" className="w-full bg-page-bg pt-2 pb-8" style={{ borderTop: '1px solid #E5E2D7' }}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-12 lg:px-[120px]">
        {/* section title */}
        <h2 className="font-serif text-[32px] leading-[120%] font-semibold text-text-primary mt-5 mb-4">
          Education &amp; Experience
        </h2>

        {/* ── 切换按钮（参考标签归档页分页样式，无上下页按钮）── */}
        <nav className="flex items-center" style={{ gap: 8, marginBottom: 14 }}>
          {groups.map((g, i) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setActiveGroup(i)}
              style={{
                ...btnBase,
                backgroundColor: i === activeGroup ? '#003A5C' : 'transparent',
                color: i === activeGroup ? '#FFFFFF' : '#444444',
                border: i === activeGroup ? 'none' : '1px solid #E5E2D7',
              }}
            >
              {g.label}
            </button>
          ))}
        </nav>

        {/* ── 当前分组的时间线 ── */}
        <div className="flex flex-col">
          {current.data.length > 0 ? (
            current.data.map((item, i) => (
              <TimelineRow key={`${activeGroup}-${i}`} {...item} />
            ))
          ) : (
            <p
              className="font-serif text-text-secondary"
              style={{ fontSize: '16px', padding: '24px 8px' }}
            >
              暂无内容
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * 文章元数据
 * slug 对应 src/content/posts/ 下的 markdown 文件名（不含 .md）
 * dateISO 用于排序（降序：最新在上），date 用于显示
 * 新增文章只需：1) 在 posts/ 下放入 .md 文件  2) 在此数组中添加元数据
 */

export const posts = [
  {
    slug: 'text-to-vectors-embeddings',
    title: '文字如何变成向量：从 One-hot 到嵌入矩阵',
    date: '2026 年 6 月 28 日',
    dateISO: '2026-06-28',
    tags: ['#词嵌入', '#入门'],
    excerpt: '从"为什么需要向量化"讲起，遍历人工定义特征 → One-hot 编码 → Word2Vec 训练 → 现代端到端嵌入矩阵的完整演进。最终的嵌入矩阵只是一个随机的二维数组，但它经历了多少弯路才变回这么简单的模样。',
    category: '最新文章',
  },
  {
    slug: 'transformer-architecture-explained',
    title: 'Transformer 架构详解：从注意力机制到编码器-解码器',
    date: '2026 年 6 月 27 日',
    dateISO: '2026-06-27',
    tags: ['#Transformer', '#入门'],
    excerpt: '从"全连接和 RNN 都不行"的困境出发，一步步推导出注意力机制，再扩展到多头注意力，最终拼出完整的编码器-解码器架构。这篇改变了 AI 格局的论文，核心逻辑确实简单到令人困惑。',
    category: '最新文章',
  },
  {
    slug: 'transformer-translation-walkthrough',
    title: 'Transformer 全流程拆解：用一个翻译任务看懂自注意力',
    date: '2026 年 6 月 26 日',
    dateISO: '2026-06-26',
    tags: ['#Transformer', '#入门'],
    excerpt: '用一个翻译任务贯穿始终，从文字如何变成向量、模型如何让每个词相互"看见"，到逐词生成译文，完整走一遍 Transformer 的全流程。学完你能讲清自注意力在算什么、为什么要多头、编码器和解码器如何分工。',
    category: '最新文章',
  },
  {
    slug: 'from-functions-to-neural-networks',
    title: '从函数到神经网络：一小时走完 AI 二十年的演进',
    date: '2026 年 6 月 25 日',
    dateISO: '2026-06-25',
    tags: ['#神经网络', '#入门'],
    excerpt: '从最朴素的想法"用函数描述世界"，一路走到 Transformer。五节课把二十多年的 AI 演进压缩为一条清晰的推理链——神经网络是什么、怎么训练、为什么有效，以及 CNN / RNN 分别解决了什么问题。',
    category: '最新文章',
  },
];

/** 按 slug 查找文章元数据 */
export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

/** 按日期降序排列（最新的在前），供列表页使用 */
export function getPostsSorted() {
  return [...posts].sort((a, b) => (a.dateISO < b.dateISO ? 1 : a.dateISO > b.dateISO ? -1 : 0));
}

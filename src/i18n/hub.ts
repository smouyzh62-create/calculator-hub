export type HubLocale = 'en' | 'zh';

const hub = {
  en: {
    nav: {
      allTools: 'All Tools',
      finance: 'Finance',
      health: 'Health',
      marketing: 'Marketing',
    },
    hero: {
      badge: 'Free Online Tools',
      titleLine1: 'Smart Calculators',
      titleLine2: 'for Smart Decisions',
      subtitle: 'Free, fast, accurate tools. No sign-up required.',
    },
    home: {
      sectionTitle: 'All Tools',
      toolsCount: 'tools',
      useTool: 'Use Tool',
    },
    tools: {
      helocTitle: 'HELOC Calculator',
      helocDesc: 'Home equity line of credit payments.',
      adTitle: 'Ad ROI Calculator',
      adDesc: 'Ad spend, revenue, and ROI metrics.',
      bmiTitle: 'BMI & TDEE',
      bmiDesc: 'BMI, basal metabolic rate, daily calories.',
      compoundTitle: 'Compound Interest',
      compoundDesc: 'Investment growth projections.',
      seoTitle: 'Social SEO Optimizer',
      seoDesc: 'Viral potential scoring for copy.',
    },
    footer: {
      tagline: 'Smart tools for smart decisions.',
      tools: 'Tools',
      legal: 'Legal',
      company: 'Company',
      privacy: 'Privacy',
      terms: 'Terms',
      about: 'About',
    },
  },
  zh: {
    nav: {
      allTools: '全部工具',
      finance: '金融',
      health: '健康',
      marketing: '营销',
    },
    hero: {
      badge: '免费在线工具',
      titleLine1: '智能计算器',
      titleLine2: '助你做出更好决策',
      subtitle: '免费、快速、准确，无需注册。',
    },
    home: {
      sectionTitle: '全部工具',
      toolsCount: '个工具',
      useTool: '打开工具',
    },
    tools: {
      helocTitle: 'HELOC 房贷额度计算器',
      helocDesc: '计算房屋净值信用额度相关结果。',
      adTitle: '广告 ROI 计算器',
      adDesc: '计算广告花费、收入与 ROI。',
      bmiTitle: 'BMI 与 TDEE 计算器',
      bmiDesc: '计算 BMI、基础代谢与日常热量。',
      compoundTitle: '复利计算器',
      compoundDesc: '估算投资复利增长。',
      seoTitle: '社媒 SEO 优化器',
      seoDesc: '评估文案爆款潜力并给出建议。',
    },
    footer: {
      tagline: '让计算更简单，让决策更高效。',
      tools: '工具',
      legal: '合规',
      company: '公司',
      privacy: '隐私政策',
      terms: '使用条款',
      about: '关于我们',
    },
  },
} as const;

export function hubT(locale: HubLocale, key: string): string {
  const active = locale === 'zh' ? hub.zh : hub.en;
  const fallback = hub.en;
  const path = key.split('.');

  let value: unknown = active;
  for (const segment of path) {
    if (typeof value !== 'object' || value === null || !(segment in value)) {
      value = undefined;
      break;
    }
    value = (value as Record<string, unknown>)[segment];
  }

  if (typeof value === 'string') return value;

  let backup: unknown = fallback;
  for (const segment of path) {
    if (typeof backup !== 'object' || backup === null || !(segment in backup)) {
      backup = undefined;
      break;
    }
    backup = (backup as Record<string, unknown>)[segment];
  }

  return typeof backup === 'string' ? backup : key;
}


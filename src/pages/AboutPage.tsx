import InfoPageLayout from './InfoPageLayout';
import type { HubLocale } from '../i18n/hub';

interface Props {
  locale: HubLocale;
}

export default function AboutPage({ locale }: Props) {
  const content = locale === 'zh'
    ? {
        title: '关于我们',
        summary: 'Calculator Hub 致力于提供简单、可靠、免费的在线计算工具，帮助你在金融、健康和营销场景中更快做出判断。',
        sections: [
          {
            title: '我们的目标',
            paragraphs: [
              '我们希望把复杂的计算变成清晰的结果，让用户在几秒内得到可执行的参考数据。',
              '每个工具都强调易用性、可读性和快速反馈，减少反复试算的时间成本。',
            ],
          },
          {
            title: '我们提供什么',
            paragraphs: [
              '当前网站提供 HELOC、广告 ROI、BMI/TDEE、复利以及社媒 SEO 优化相关工具。',
              '我们会持续改进已有工具，并根据用户反馈增加更多实用计算器。',
            ],
          },
          {
            title: '联系与反馈',
            paragraphs: [
              '如果你发现计算逻辑、文案或界面问题，欢迎通过项目反馈渠道联系我们。',
              '你的建议会直接影响后续迭代优先级。',
            ],
          },
        ],
      }
    : {
        title: 'About Us',
        summary: 'Calculator Hub provides simple, reliable, and free online tools to help people make faster decisions across finance, health, and marketing.',
        sections: [
          {
            title: 'Our Mission',
            paragraphs: [
              'We turn complex calculations into clear outputs that users can act on within seconds.',
              'Each tool is designed for clarity, speed, and practical decision support.',
            ],
          },
          {
            title: 'What We Offer',
            paragraphs: [
              'The current product includes HELOC, Ad ROI, BMI/TDEE, Compound Interest, and Social SEO optimization tools.',
              'We continuously improve existing calculators and expand based on user feedback.',
            ],
          },
          {
            title: 'Contact and Feedback',
            paragraphs: [
              'If you find a logic issue, copy problem, or UI bug, please contact us through the project feedback channel.',
              'Your feedback directly informs our roadmap and priority fixes.',
            ],
          },
        ],
      };

  return (
    <InfoPageLayout
      locale={locale}
      title={content.title}
      summary={content.summary}
      sections={content.sections}
      updatedAt='June 3, 2026'
    />
  );
}


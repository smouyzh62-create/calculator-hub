import InfoPageLayout from './InfoPageLayout';
import type { HubLocale } from '../i18n/hub';

interface Props {
  locale: HubLocale;
}

export default function CompliancePage({ locale }: Props) {
  const content = locale === 'zh'
    ? {
        title: '合规声明',
        summary: '本页面说明本网站在信息展示、风险提示和用户使用边界方面的合规原则。',
        sections: [
          {
            title: '信息性质',
            paragraphs: [
              '本网站提供的计算结果仅用于一般信息参考，不构成法律、医疗、税务或投资建议。',
              '在做出重大决策前，请结合你的实际情况并咨询持证专业人士。',
            ],
          },
          {
            title: '风险提示',
            paragraphs: [
              '金融与营销结果受市场、成本、政策和执行等多重因素影响，实际结果可能与计算值存在差异。',
              '健康相关工具仅提供基础估算，不可替代医生诊断和个性化治疗方案。',
            ],
          },
          {
            title: '内容与使用责任',
            paragraphs: [
              '我们会持续维护工具逻辑与文案准确性，但不保证结果在任何场景下绝对适用。',
              '用户对其使用行为及由此产生的业务或个人决策结果承担最终责任。',
            ],
          },
        ],
      }
    : {
        title: 'Compliance Statement',
        summary: 'This page outlines our compliance principles for information display, risk disclosure, and responsible use.',
        sections: [
          {
            title: 'Nature of Information',
            paragraphs: [
              'All outputs on this website are for general informational purposes only and do not constitute legal, medical, tax, or investment advice.',
              'For material decisions, consult qualified professionals based on your specific circumstances.',
            ],
          },
          {
            title: 'Risk Disclosure',
            paragraphs: [
              'Financial and marketing outcomes depend on market conditions, costs, policy changes, and execution quality, so real outcomes may differ.',
              'Health-related tools are basic estimators and are not a substitute for professional diagnosis or treatment.',
            ],
          },
          {
            title: 'Content and User Responsibility',
            paragraphs: [
              'We continuously maintain calculation logic and copy quality, but we cannot guarantee universal applicability for every scenario.',
              'Users remain solely responsible for decisions made using this site.',
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


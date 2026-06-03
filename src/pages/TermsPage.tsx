import InfoPageLayout from './InfoPageLayout';
import type { HubLocale } from '../i18n/hub';

interface Props {
  locale: HubLocale;
}

export default function TermsPage({ locale }: Props) {
  const content = locale === 'zh'
    ? {
        title: '使用条款',
        summary: '访问和使用本网站，即表示你同意遵守以下条款。',
        sections: [
          {
            title: '服务范围',
            paragraphs: [
              '本网站提供在线计算与内容分析工具，服务内容可能在不另行通知的情况下持续迭代。',
              '我们有权在必要时调整、暂停或终止部分功能。',
            ],
          },
          {
            title: '禁止行为',
            paragraphs: [
              '你不得以任何方式滥用服务，包括但不限于干扰网站稳定性、恶意抓取或自动化攻击。',
              '你不得将本网站内容用于违法用途，或侵犯他人合法权益。',
            ],
          },
          {
            title: '责任限制',
            paragraphs: [
              '在法律允许范围内，我们对因使用或无法使用本网站而产生的间接损失不承担责任。',
              '你应自行评估并承担使用本网站结果进行实际决策的风险。',
            ],
          },
        ],
      }
    : {
        title: 'Terms of Use',
        summary: 'By accessing and using this website, you agree to comply with the following terms.',
        sections: [
          {
            title: 'Service Scope',
            paragraphs: [
              'This site provides online calculators and content analysis tools, and features may be updated without prior notice.',
              'We reserve the right to modify, suspend, or discontinue parts of the service when necessary.',
            ],
          },
          {
            title: 'Prohibited Conduct',
            paragraphs: [
              'You may not misuse the service, including attempts to disrupt stability, abuse traffic, scrape maliciously, or perform automated attacks.',
              'You may not use this website for unlawful activities or to violate third-party rights.',
            ],
          },
          {
            title: 'Limitation of Liability',
            paragraphs: [
              'To the extent permitted by law, we are not liable for indirect losses arising from use or inability to use this site.',
              'You are responsible for evaluating risks before using outputs for real-world decisions.',
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


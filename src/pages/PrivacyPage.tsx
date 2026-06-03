import InfoPageLayout from './InfoPageLayout';
import type { HubLocale } from '../i18n/hub';

interface Props {
  locale: HubLocale;
}

export default function PrivacyPage({ locale }: Props) {
  const content = locale === 'zh'
    ? {
        title: '隐私政策',
        summary: '我们重视你的隐私。本页面说明网站收集、使用和保护数据的方式。',
        sections: [
          {
            title: '我们收集的数据',
            paragraphs: [
              '本网站主要在你的浏览器本地保存设置项（例如主题和语言偏好），用于提升使用体验。',
              '我们不要求注册，不在前端表单中主动收集姓名、电话或身份证明信息。',
            ],
          },
          {
            title: '数据用途',
            paragraphs: [
              '本地数据仅用于记住你的界面偏好与交互状态。',
              '托管平台可能会产生必要的访问日志与安全日志，用于运维和故障排查。',
            ],
          },
          {
            title: '第三方与安全',
            paragraphs: [
              '除网站托管和基础技术服务外，我们不会无故向第三方出售或共享你的个人信息。',
              '如隐私政策发生变更，我们会在本页面更新并注明更新时间。',
            ],
          },
        ],
      }
    : {
        title: 'Privacy Policy',
        summary: 'We respect your privacy. This page explains how data is stored, used, and protected on this website.',
        sections: [
          {
            title: 'Data We Collect',
            paragraphs: [
              'This site primarily stores local browser preferences (such as theme and language) to improve user experience.',
              'We do not require account registration and do not intentionally collect personal identity details through calculator inputs.',
            ],
          },
          {
            title: 'How Data Is Used',
            paragraphs: [
              'Local data is used only to remember interface and interaction preferences.',
              'Our hosting provider may process essential access and security logs for operations and troubleshooting.',
            ],
          },
          {
            title: 'Third Parties and Security',
            paragraphs: [
              'We do not sell or unnecessarily share personal data with third parties beyond essential hosting and infrastructure services.',
              'If this policy changes, updates will be posted on this page with a revised date.',
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


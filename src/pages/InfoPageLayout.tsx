import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { hubT, type HubLocale } from '../i18n/hub';

interface InfoSection {
  title: string;
  paragraphs: string[];
}

interface Props {
  locale: HubLocale;
  title: string;
  summary: string;
  sections: InfoSection[];
  updatedAt: string;
}

export default function InfoPageLayout({ locale, title, summary, sections, updatedAt }: Props) {
  const t = (key: string) => hubT(locale, key);

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 py-10'>
      <Link to='/' className='inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors'>
        <ArrowLeft className='w-4 h-4' />
        {t('info.back')}
      </Link>

      <div className='mt-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-lg p-6 sm:p-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>{title}</h1>
        <p className='mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed'>{summary}</p>
        <p className='mt-3 text-xs text-gray-400'>{t('info.updated')}: {updatedAt}</p>

        <div className='mt-8 space-y-7'>
          {sections.map(section => (
            <section key={section.title}>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>{section.title}</h2>
              <div className='mt-2 space-y-3'>
                {section.paragraphs.map(paragraph => (
                  <p key={paragraph} className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}


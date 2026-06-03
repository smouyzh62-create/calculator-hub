import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { hubT, type HubLocale } from '../i18n/hub';

interface Props {
  locale: HubLocale;
}

export default function Footer({ locale }: Props) {
  const t = (key: string) => hubT(locale, key);

  return (
    <footer className='border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center'>
                <Calculator className='w-4 h-4 text-white' />
              </div>
              <span className='font-bold text-gray-900 dark:text-white'>CalcHub</span>
            </div>
            <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3'>{t('footer.tools')}</h4>
            <div className='space-y-2'>
              <Link to='/ad-calculator' className='block text-sm text-gray-600 hover:text-indigo-600'>Ad ROI</Link>
              <Link to='/bmi' className='block text-sm text-gray-600 hover:text-indigo-600'>BMI</Link>
              <Link to='/compound' className='block text-sm text-gray-600 hover:text-indigo-600'>Compound</Link>
              <Link to='/heloc' className='block text-sm text-gray-600 hover:text-indigo-600'>HELOC</Link>
              <Link to='/seo' className='block text-sm text-gray-600 hover:text-indigo-600'>SEO</Link>
            </div>
          </div>

          <div>
            <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>{t('footer.legal')}</h4>
            <div className='space-y-2'>
              <Link to='/compliance' className='block text-sm text-gray-600 hover:text-indigo-600'>{t('footer.compliance')}</Link>
              <Link to='/privacy' className='block text-sm text-gray-600 hover:text-indigo-600'>{t('footer.privacy')}</Link>
              <Link to='/terms' className='block text-sm text-gray-600 hover:text-indigo-600'>{t('footer.terms')}</Link>
            </div>
          </div>

          <div>
            <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>{t('footer.company')}</h4>
            <div className='space-y-2'>
              <Link to='/about' className='block text-sm text-gray-600 hover:text-indigo-600'>{t('footer.about')}</Link>
            </div>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/50 text-center text-xs text-gray-400'>&copy; 2026 CalcHub</div>
      </div>
    </footer>
  );
}

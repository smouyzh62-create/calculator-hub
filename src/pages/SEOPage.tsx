import SEOApp from '../tools/seo/App';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function SEOPage() {
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2'>
        <Link to='/' className='inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition-colors'>
          <ArrowLeft className='w-3.5 h-3.5' /> Back to All Tools
        </Link>
      </div>
      <SEOApp />
    </div>
  );
}
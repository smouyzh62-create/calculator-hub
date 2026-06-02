import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const toolRoutes: Record<string, string> = {
  'ad': '/ad-calculator','adsense': '/ad-calculator','roi': '/ad-calculator','advertising': '/ad-calculator',
  'bmi': '/bmi','body mass': '/bmi','weight': '/bmi','health': '/bmi',
  'compound': '/compound','interest': '/compound','investment': '/compound','savings': '/compound',
  'heloc': '/heloc','mortgage': '/heloc','home equity': '/heloc','loan': '/heloc',
  'seo': '/seo','content': '/seo','optimizer': '/seo','social media': '/seo','hashtag': '/seo',
};

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase().trim();
    for (const [keyword, route] of Object.entries(toolRoutes)) {
      if (q.includes(keyword)) { navigate(route); return; }
    }
    // Default: navigate to first tool
    navigate('/ad-calculator');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100/50 dark:bg-purple-900/20 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Free Online Tools
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Smart Calculators<br/>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">for Smart Decisions</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Free, fast, and accurate tools — from financial calculators to content optimizers. No sign-up required.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search tools (e.g., BMI, SEO, compound interest...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg shadow-indigo-200/10"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

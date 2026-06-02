import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ToolCard from '../components/ToolCard';

const tools = [
  { title: 'HELOC Calculator', desc: 'Home equity line of credit payments.', icon: '🏠', path: '/heloc', gradient: 'bg-gradient-to-r from-cyan-400 to-cyan-500', badge: 'Finance' },
  { title: 'Ad ROI Calculator', desc: 'Ad spend, revenue, and ROI metrics.', icon: '📈', path: '/ad-calculator', gradient: 'bg-gradient-to-r from-indigo-400 to-indigo-500', badge: 'Marketing' },
  { title: 'BMI & TDEE', desc: 'BMI, basal metabolic rate, daily calories.', icon: '💪', path: '/bmi', gradient: 'bg-gradient-to-r from-green-400 to-green-500', badge: 'Health' },
  { title: 'Compound Interest', desc: 'Investment growth projections.', icon: '📈', path: '/compound', gradient: 'bg-gradient-to-r from-amber-400 to-amber-500', badge: 'Finance' },
  { title: 'Social SEO Optimizer', desc: 'Viral potential scoring for copy.', icon: '✨', path: '/seo', gradient: 'bg-gradient-to-r from-rose-400 to-rose-500', badge: 'Marketing' },
];

export default function Home() {
  return (
    <div>
      <div className='relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
        <div className='relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center'>
          <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 text-xs font-semibold mb-6'><span className='w-2 h-2 rounded-full bg-indigo-500 animate-pulse' />Free Online Tools</div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight'>Smart Calculators<br/><span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>for Smart Decisions</span></h1>
          <p className='text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>Free, fast, accurate tools. No sign-up required.</p>
        </div>
      </div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 -mt-8 pb-16'>
        <div className='bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-6 md:p-8'>
          <div className='flex items-center gap-2 mb-6'><Sparkles className='w-5 h-5 text-indigo-500' /><h2 className='text-lg font-bold text-gray-900 dark:text-white'>All Tools</h2><span className='text-xs text-gray-400 ml-auto'>{tools.length} tools</span></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tools.map((tool, i) => (<ToolCard key={tool.path} {...tool} index={i} />))}
          </div>
        </div>
      </div>
    </div>
  );
}
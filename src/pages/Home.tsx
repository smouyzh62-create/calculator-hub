import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ToolCard from '../components/ToolCard';
import { Sparkles } from 'lucide-react';

const tools = [
  { title: 'HELOC Calculator', desc: 'Calculate home equity line of credit payments, interest costs, and draw periods.', icon: '\uD83C\uDFE0', path: '/heloc', color: '#06b6d4', gradient: 'bg-gradient-to-r from-cyan-400 to-cyan-500', badge: 'Finance' },
  { title: 'Ad ROI Calculator', desc: 'Analyze ad spend, revenue, and ROI metrics across campaigns and platforms.', icon: '\uD83D\uDCC8', path: '/ad-calculator', color: '#6366f1', gradient: 'bg-gradient-to-r from-indigo-400 to-indigo-500', badge: 'Marketing' },
  { title: 'BMI & TDEE Calculator', desc: 'Calculate BMI, basal metabolic rate, and daily caloric needs with activity levels.', icon: '\uD83D\uDCAA', path: '/bmi', color: '#22c55e', gradient: 'bg-gradient-to-r from-green-400 to-green-500', badge: 'Health' },
  { title: 'Compound Interest', desc: 'Project investment growth with compound interest, contribution schedules, and charts.', icon: '\uD83D\uDCC8', path: '/compound', color: '#f59e0b', gradient: 'bg-gradient-to-r from-amber-400 to-amber-500', badge: 'Finance' },
  { title: 'Social SEO Optimizer', desc: 'Score your social media copy \u2019s viral potential with AI-powered analysis and suggestions.', icon: '\u2728', path: '/seo', color: '#f43f5e', gradient: 'bg-gradient-to-r from-rose-400 to-rose-500', badge: 'Marketing' },
];

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      {/* Tools Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 -mt-8 pb-16">
        <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">All Tools</h2>
            <span className="text-xs text-gray-400 ml-auto">{tools.length} tools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <ToolCard key={tool.path} {...tool} index={i} />
            ))}
          </div>
        </div>

        {/* Ad Slot */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-750 border border-gray-200 dark:border-gray-700/50 h-24 flex items-center justify-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Advertisement Space</p>
        </div>
      </div>
    </div>
  );
}

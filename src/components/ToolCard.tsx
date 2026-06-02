import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props { title: string; desc: string; icon: string; path: string; gradient: string; badge?: string; index: number; }

export default function ToolCard({ title, desc, icon, path, gradient, badge, index }: Props) {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:index*0.1}}>
      <Link to={path} className='group block'>
        <div className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700/50 h-full'>
          <div className={'h-1.5 w-full ' + gradient} />
          <div className='p-5'>
            <div className='flex items-start justify-between mb-3'>
              <div className={'w-12 h-12 rounded-xl ' + gradient + ' flex items-center justify-center text-2xl shadow-lg'}>{icon}</div>
              {badge && <span className='text-[10px] font-semibold px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 uppercase tracking-wider'>{badge}</span>}
            </div>
            <h3 className='text-base font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-indigo-600 transition-colors'>{title}</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4'>{desc}</p>
            <div className='flex items-center gap-1 text-xs font-medium text-indigo-600 group-hover:gap-2 transition-all'><span>Use Tool</span><ArrowRight className='w-3.5 h-3.5' /></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
import { motion } from 'framer-motion';
import type { BMIResults } from '../types';

interface Props { label: string; desc: string; calories: number; color: string; t: (key: string) => string; }

export default function CalorieCard({ label, desc, calories, color, t }: Props) {
  return (
    <div className="rounded-xl border p-4 flex flex-col items-center text-center" style={{ borderColor: color + '30', backgroundColor: color + '08' }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color }}>{label}</p>
      <motion.p key={calories} initial={{opacity:0.5,y:-4}} animate={{opacity:1,y:0}} transition={{duration:0.3,ease:'easeOut'}}
        className="text-2xl md:text-3xl font-bold tabular-nums" style={{ color }}>{calories.toLocaleString()}</motion.p>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{desc}</p>
    </div>
  );
}

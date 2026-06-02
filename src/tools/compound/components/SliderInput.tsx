import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Theme } from '../types';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  formatValue?: (v: number) => string;
  onChange: (v: number) => void;
  theme: Theme;
}

export default function SliderInput({ label, value, min, max, step, suffix, formatValue, onChange, theme }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const trackPercent = ((value - min) / (max - min)) * 100;
  const display = formatValue ? formatValue(value) : value.toLocaleString() + (suffix || '');

  const handleStartEdit = () => {
    setEditText(String(value));
    setIsEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  };

  const handleCommit = () => {
    const raw = editText.replace(/[^0-9.\-]/g, '');
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max);
      const stepped = Math.round(clamped / step) * step;
      onChange(Math.round(stepped * 100) / 100);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCommit();
    if (e.key === 'Escape') setIsEditing(false);
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="relative">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onBlur={handleCommit}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-28 text-right text-lg font-semibold bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-blue-400 dark:border-blue-500 rounded-lg px-2 py-0.5 outline-none tabular-nums"
            />
          ) : (
            <motion.button
              type="button"
              onClick={handleStartEdit}
              key={value}
              initial={{ opacity: 0.5, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums cursor-text hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-2 py-0.5 -mr-2 transition-colors"
            >
              {display}
            </motion.button>
          )}
        </div>
      </div>
      <div className="relative">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 rounded-full"
          style={{ backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 rounded-full transition-all duration-150"
          style={{ width: `${trackPercent}%`, backgroundColor: 'var(--color-primary-light)' }}
        />
        <input
          type="range" value={value} min={min} max={max} step={step}
          onChange={e => onChange(Number(e.target.value))}
          className="relative w-full bg-transparent cursor-pointer z-10"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1 px-0.5">
        <span>{formatValue ? formatValue(min) : min + (suffix || '')}</span>
        <span>{formatValue ? formatValue(max) : max + (suffix || '')}</span>
      </div>
    </div>
  );
}

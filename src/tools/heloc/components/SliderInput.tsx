import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Theme } from '../types';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formatValue: (v: number) => string;
  onChange: (v: number) => void;
  theme: Theme;
}

export default function SliderInput({ label, value, min, max, step, formatValue, onChange, theme }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const trackPercent = ((value - min) / (max - min)) * 100;

  const handleStartEdit = useCallback(() => {
    setEditValue(String(value));
    setEditing(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [value]);

  const handleCommit = useCallback(() => {
    let newVal = parseFloat(editValue);
    if (isNaN(newVal)) newVal = value;
    newVal = Math.max(min, Math.min(max, newVal));
    newVal = Math.round(newVal / step) * step;
    onChange(newVal);
    setEditing(false);
  }, [editValue, min, max, step, value, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCommit();
    if (e.key === 'Escape') setEditing(false);
  }, [handleCommit]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums bg-transparent border-b-2 border-blue-500 outline-none w-36 text-right"
          />
        ) : (
          <motion.button
            key={value}
            initial={{ opacity: 0.5, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={handleStartEdit}
            type="button"
            className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b-2 border-transparent hover:border-blue-300"
          >
            {formatValue(value)}
          </motion.button>
        )}
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
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(Number(e.target.value))}
          className="relative w-full bg-transparent cursor-pointer z-10"
          style={{ background: 'transparent' }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1 px-0.5">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

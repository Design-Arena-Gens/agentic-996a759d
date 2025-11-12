'use client';

import { twMerge } from 'tailwind-merge';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={twMerge('rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl', className)}>
      {children}
    </div>
  );
}

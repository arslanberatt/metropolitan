import { cn } from '@/lib/utils';
import { useRef } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  durationOnHover?: number; // kept for API compat, unused
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const trackRef = useRef<HTMLDivElement>(null);
  const isHorizontal = direction === 'horizontal';
  const size = isHorizontal ? width : height;

  const keyframeName = `infinite-slide-${isHorizontal ? 'x' : 'y'}${reverse ? '-r' : ''}`;

  return (
    <div className={cn('overflow-hidden', className)}>
      <style>{`
        @keyframes ${keyframeName} {
          from { transform: translate${isHorizontal ? 'X' : 'Y'}(${reverse ? '-50%' : '0%'}); }
          to   { transform: translate${isHorizontal ? 'X' : 'Y'}(${reverse ? '0%' : '-50%'}); }
        }
      `}</style>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          gap: `${gap}px`,
          width: isHorizontal ? 'max-content' : undefined,
          willChange: 'transform',
          animation: size > 0
            ? `${keyframeName} ${duration}s linear infinite`
            : undefined,
        }}
      >
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            gap: `${gap}px`,
          }}
        >
          {children}
        </div>
        <div
          aria-hidden
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            gap: `${gap}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

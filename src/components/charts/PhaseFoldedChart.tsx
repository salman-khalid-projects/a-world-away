import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PhaseFoldedData } from '../../types';
import { chartColors } from '../../theme/tokens';

export interface PhaseFoldedChartProps {
  data: PhaseFoldedData[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
  domain?: [number, number];
}

/**
 * PhaseFoldedChart component for displaying phase-folded transit data
 * Shows the stacked transit signal at the best period
 */
export const PhaseFoldedChart: React.FC<PhaseFoldedChartProps> = ({
  data,
  title,
  subtitle,
  className,
  color = chartColors.primary,
  domain = [0.97, 1.03],
}) => {
  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <h3 className="text-sm md:text-base font-semibold text-white/90">{title}</h3>}
          {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
        </div>
      )}
      <div className="h-56 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid stroke={chartColors.grid} />
            <XAxis 
              dataKey="phase" 
              tick={{ fill: "#99a" }} 
              domain={[0, 1]}
            />
            <YAxis 
              tick={{ fill: "#99a" }} 
              domain={domain}
            />
            <Tooltip 
              contentStyle={chartColors.tooltip}
            />
            <Line 
              type="monotone" 
              dataKey="flux" 
              dot={false} 
              stroke={color} 
              strokeWidth={1} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


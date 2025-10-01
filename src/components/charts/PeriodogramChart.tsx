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
import { PeriodogramData } from '../../types';
import { chartColors } from '../../theme/tokens';

export interface PeriodogramChartProps {
  data: PeriodogramData[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
}

/**
 * PeriodogramChart component for displaying BLS periodogram data
 * Shows the power spectrum with peak marking candidate period
 */
export const PeriodogramChart: React.FC<PeriodogramChartProps> = ({
  data,
  title,
  subtitle,
  className,
  color = chartColors.success,
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
              dataKey="period" 
              tick={{ fill: "#99a" }} 
            />
            <YAxis 
              tick={{ fill: "#99a" }} 
            />
            <Tooltip 
              contentStyle={chartColors.tooltip}
            />
            <Line 
              type="monotone" 
              dataKey="power" 
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


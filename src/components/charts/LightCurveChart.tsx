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
import { LightCurveData } from '../../types';
import { chartColors } from '../../theme/tokens';

export interface LightCurveChartProps {
  data: LightCurveData[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
  domain?: [number, number];
}

/**
 * LightCurveChart component for displaying light curve data
 * Renders a responsive line chart with proper styling
 */
export const LightCurveChart: React.FC<LightCurveChartProps> = ({
  data,
  title,
  subtitle,
  className,
  color = chartColors.primary,
  domain = [0.96, 1.04],
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
              dataKey="t" 
              tick={{ fill: "#99a" }} 
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


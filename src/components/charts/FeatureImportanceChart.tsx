import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FeatureImportance } from '../../types';
import { chartColors } from '../../theme/tokens';

export interface FeatureImportanceChartProps {
  data: FeatureImportance[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
  domain?: [number, number];
}

/**
 * FeatureImportanceChart component for displaying AI feature importance
 * Shows horizontal bar chart of feature contributions
 */
export const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({
  data,
  title,
  subtitle,
  className,
  color = "#22d3ee",
  domain = [0, 0.5],
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
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ left: 60, right: 10, top: 10, bottom: 0 }}
          >
            <CartesianGrid stroke={chartColors.grid} />
            <XAxis 
              type="number" 
              tick={{ fill: "#99a" }} 
              domain={domain}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fill: "#99a" }} 
            />
            <Tooltip 
              contentStyle={chartColors.tooltip}
            />
            <Bar 
              dataKey="value" 
              fill={color} 
              radius={[6, 6, 6, 6]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


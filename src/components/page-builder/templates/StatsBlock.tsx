
import React from 'react';

interface StatsBlockProps {
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  valueColor: string;
}

export const StatsBlockTemplate: React.FC<StatsBlockProps> = ({
  title,
  value,
  subtitle,
  bgColor,
  textColor,
  valueColor
}) => {
  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4">
        <div 
          style={{ backgroundColor: bgColor, color: textColor }} 
          className="rounded-lg p-6 text-center shadow-md"
        >
          <h4 className="text-sm font-medium mb-2 opacity-80">{title}</h4>
          <div style={{ color: valueColor }} className="text-3xl font-bold mb-1">
            {value}
          </div>
          <p className="text-xs opacity-60">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

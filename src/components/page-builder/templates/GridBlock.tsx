
import React from 'react';

interface GridBlockProps {
  columns: string;
  gap: string;
  maxWidth: string;
  padding: string;
  bgColor: string;
  children?: React.ReactNode;
}

export const GridBlockTemplate: React.FC<GridBlockProps> = ({
  columns,
  gap,
  maxWidth,
  padding,
  bgColor
}) => {
  const getGridClass = (cols: string) => {
    const colMap: Record<string, string> = {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '6': 'grid-cols-6',
      '12': 'grid-cols-12'
    };
    return colMap[cols] || 'grid-cols-3';
  };

  const getGapClass = (gapSize: string) => {
    const gapMap: Record<string, string> = {
      '2': 'gap-2',
      '4': 'gap-4',
      '6': 'gap-6',
      '8': 'gap-8'
    };
    return gapMap[gapSize] || 'gap-4';
  };

  return (
    <div style={{ backgroundColor: bgColor }} className={`w-full ${padding}`}>
      <div className={`${maxWidth} mx-auto`}>
        <div className={`grid ${getGridClass(columns)} ${getGapClass(gap)}`}>
          {/* Placeholder content for grid items */}
          {Array.from({ length: parseInt(columns) }, (_, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg min-h-32 flex items-center justify-center">
              <span className="text-gray-500">Grid Item {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

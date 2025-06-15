
import React from 'react';

interface RowBlockProps {
  gap: string;
  justifyContent: string;
  alignItems: string;
  bgColor: string;
  padding: string;
  wrap: string;
}

export const RowBlockTemplate: React.FC<RowBlockProps> = ({
  gap,
  justifyContent,
  alignItems,
  bgColor,
  padding,
  wrap
}) => {
  return (
    <div 
      style={{ backgroundColor: bgColor }} 
      className={`flex ${wrap} ${justifyContent} ${alignItems} ${gap} ${padding} w-full`}
    >
      <div className="flex-1 bg-gray-100 p-4 rounded min-h-16 flex items-center justify-center text-gray-500">
        Column 1
      </div>
      <div className="flex-1 bg-gray-100 p-4 rounded min-h-16 flex items-center justify-center text-gray-500">
        Column 2
      </div>
      <div className="flex-1 bg-gray-100 p-4 rounded min-h-16 flex items-center justify-center text-gray-500">
        Column 3
      </div>
    </div>
  );
};

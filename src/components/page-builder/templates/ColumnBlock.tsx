
import React from 'react';

interface ColumnBlockProps {
  width: string;
  bgColor: string;
  padding: string;
  textAlign: string;
  content: string;
  textColor: string;
}

export const ColumnBlockTemplate: React.FC<ColumnBlockProps> = ({
  width,
  bgColor,
  padding,
  textAlign,
  content,
  textColor
}) => {
  return (
    <div 
      style={{ 
        backgroundColor: bgColor,
        color: textColor,
        textAlign: textAlign as any
      }} 
      className={`${width} ${padding} min-h-16`}
    >
      <div className="prose max-w-none" style={{ color: textColor }}>
        {content || 'Column content'}
      </div>
    </div>
  );
};

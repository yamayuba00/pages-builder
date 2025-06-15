
import React from 'react';

interface SpacerBlockProps {
  height: string;
  bgColor: string;
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
}

export const SpacerBlockTemplate: React.FC<SpacerBlockProps> = ({
  height,
  bgColor,
  borderStyle,
  borderColor,
  borderWidth
}) => {
  return (
    <div 
      style={{ 
        height: height,
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: borderWidth
      }} 
      className={`w-full ${borderStyle === 'none' ? '' : `border-${borderStyle}`}`}
    />
  );
};

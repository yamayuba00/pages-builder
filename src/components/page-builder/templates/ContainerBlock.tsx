
import React from 'react';

interface ContainerBlockProps {
  bgColor: string;
  padding: string;
  margin: string;
  maxWidth: string;
  borderRadius: string;
  borderColor: string;
  borderWidth: string;
  shadow: string;
  content: string;
}

export const ContainerBlockTemplate: React.FC<ContainerBlockProps> = ({
  bgColor,
  padding,
  margin,
  maxWidth,
  borderRadius,
  borderColor,
  borderWidth,
  shadow,
  content
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  return (
    <div 
      style={{ 
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: borderWidth
      }} 
      className={`${padding} ${margin} ${maxWidth} mx-auto ${borderRadius} border ${shadowClasses[shadow as keyof typeof shadowClasses] || 'shadow-md'}`}
    >
      <div className="prose max-w-none">
        {content || 'Container content goes here'}
      </div>
    </div>
  );
};

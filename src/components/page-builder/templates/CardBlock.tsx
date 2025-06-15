
import React from 'react';

interface CardBlockProps {
  title: string;
  content: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  shadow: string;
}

export const CardBlockTemplate: React.FC<CardBlockProps> = ({
  title,
  content,
  bgColor,
  textColor,
  borderColor,
  shadow
}) => {
  const getShadowClass = (shadowSize: string) => {
    const shadowMap: Record<string, string> = {
      'none': 'shadow-none',
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'lg': 'shadow-lg',
      'xl': 'shadow-xl'
    };
    return shadowMap[shadowSize] || 'shadow-md';
  };

  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4">
        <div 
          style={{ 
            backgroundColor: bgColor, 
            color: textColor,
            borderColor: borderColor
          }} 
          className={`border rounded-lg p-6 ${getShadowClass(shadow)}`}
        >
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm opacity-80">{content}</p>
        </div>
      </div>
    </div>
  );
};

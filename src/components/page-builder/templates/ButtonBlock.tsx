
import React from 'react';

interface ButtonBlockProps {
  text: string;
  bgColor: string;
  textColor: string;
  size: string;
  alignment: string;
  link: string;
}

export const ButtonBlockTemplate: React.FC<ButtonBlockProps> = ({
  text,
  bgColor,
  textColor,
  size,
  alignment,
  link
}) => {
  const getSizeClass = (buttonSize: string) => {
    const sizeMap: Record<string, string> = {
      'sm': 'px-3 py-1 text-sm',
      'md': 'px-4 py-2 text-base',
      'lg': 'px-6 py-3 text-lg',
      'xl': 'px-8 py-4 text-xl'
    };
    return sizeMap[buttonSize] || 'px-4 py-2 text-base';
  };

  const getAlignmentClass = (align: string) => {
    const alignMap: Record<string, string> = {
      'left': 'justify-start',
      'center': 'justify-center',
      'right': 'justify-end'
    };
    return alignMap[align] || 'justify-center';
  };

  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4">
        <div className={`flex ${getAlignmentClass(alignment)}`}>
          <a
            href={link}
            style={{ backgroundColor: bgColor, color: textColor }}
            className={`${getSizeClass(size)} rounded-md font-medium hover:opacity-90 transition-all duration-200 inline-block`}
          >
            {text}
          </a>
        </div>
      </div>
    </div>
  );
};

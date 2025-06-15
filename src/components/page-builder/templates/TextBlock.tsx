
import React from 'react';

interface TextBlockProps {
  content: string;
  fontSize: string;
  textColor: string;
  bgColor: string;
}

export const TextBlockTemplate: React.FC<TextBlockProps> = ({
  content,
  fontSize,
  textColor,
  bgColor
}) => {
  return (
    <div 
      style={{ 
        backgroundColor: bgColor,
        color: textColor,
        fontSize: `${fontSize}px`
      }} 
      className="w-full py-8 px-4"
    >
      <div className="container mx-auto">
        <div 
          className="prose max-w-none"
          style={{ color: textColor }}
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
        />
      </div>
    </div>
  );
};

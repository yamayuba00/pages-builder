
import React from 'react';

interface TextBlockProps {
  content: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
  textColor: string;
  bgColor: string;
  maxWidth: string;
  padding: string;
}

export const TextBlockTemplate: React.FC<TextBlockProps> = ({
  content,
  fontSize,
  fontFamily,
  fontWeight,
  textAlign,
  textColor,
  bgColor,
  maxWidth,
  padding
}) => {
  return (
    <div 
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }} 
      className={`w-full ${padding}`}
    >
      <div className={`${maxWidth} mx-auto`}>
        <div 
          className="prose max-w-none"
          style={{ 
            color: textColor,
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            textAlign: textAlign as any
          }}
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
        />
      </div>
    </div>
  );
};

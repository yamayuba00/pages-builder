
import React from 'react';

interface ParagraphBlockProps {
  text: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  textAlign: string;
  fontFamily: string;
  lineHeight: string;
  bgColor: string;
  padding: string;
  margin: string;
}

export const ParagraphBlockTemplate: React.FC<ParagraphBlockProps> = ({
  text,
  textColor,
  fontSize,
  fontWeight,
  textAlign,
  fontFamily,
  lineHeight,
  bgColor,
  padding,
  margin
}) => {
  return (
    <div style={{ backgroundColor: bgColor }} className={`${padding} ${margin}`}>
      <p
        style={{
          color: textColor,
          fontSize: fontSize + 'px',
          fontWeight: fontWeight,
          textAlign: textAlign as any,
          fontFamily: fontFamily,
          lineHeight: lineHeight
        }}
        className="m-0"
      >
        {text}
      </p>
    </div>
  );
};

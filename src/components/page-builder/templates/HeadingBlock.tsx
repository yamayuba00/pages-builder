
import React from 'react';

interface HeadingBlockProps {
  level: string;
  text: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  textAlign: string;
  fontFamily: string;
  bgColor: string;
  padding: string;
  margin: string;
}

export const HeadingBlockTemplate: React.FC<HeadingBlockProps> = ({
  level,
  text,
  textColor,
  fontSize,
  fontWeight,
  textAlign,
  fontFamily,
  bgColor,
  padding,
  margin
}) => {
  const HeadingTag = level as keyof JSX.IntrinsicElements;

  return (
    <div style={{ backgroundColor: bgColor }} className={`${padding} ${margin}`}>
      <HeadingTag
        style={{
          color: textColor,
          fontSize: fontSize + 'px',
          fontWeight: fontWeight,
          textAlign: textAlign as any,
          fontFamily: fontFamily
        }}
        className="m-0"
      >
        {text}
      </HeadingTag>
    </div>
  );
};

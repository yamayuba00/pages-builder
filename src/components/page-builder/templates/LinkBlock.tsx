
import React from 'react';

interface LinkBlockProps {
  text: string;
  url: string;
  target: string;
  textColor: string;
  hoverColor: string;
  fontSize: string;
  fontWeight: string;
  textDecoration: string;
  bgColor: string;
  padding: string;
  margin: string;
  textAlign: string;
}

export const LinkBlockTemplate: React.FC<LinkBlockProps> = ({
  text,
  url,
  target,
  textColor,
  hoverColor,
  fontSize,
  fontWeight,
  textDecoration,
  bgColor,
  padding,
  margin,
  textAlign
}) => {
  return (
    <div style={{ backgroundColor: bgColor, textAlign: textAlign as any }} className={`${padding} ${margin}`}>
      <a
        href={url}
        target={target}
        style={{
          color: textColor,
          fontSize: fontSize + 'px',
          fontWeight: fontWeight,
          textDecoration: textDecoration
        }}
        className="transition-colors hover:opacity-80"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
        }}
      >
        {text}
      </a>
    </div>
  );
};

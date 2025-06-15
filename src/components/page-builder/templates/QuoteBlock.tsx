
import React from 'react';

interface QuoteBlockProps {
  quote: string;
  author: string;
  textColor: string;
  authorColor: string;
  fontSize: string;
  fontStyle: string;
  textAlign: string;
  bgColor: string;
  borderColor: string;
  padding: string;
  margin: string;
}

export const QuoteBlockTemplate: React.FC<QuoteBlockProps> = ({
  quote,
  author,
  textColor,
  authorColor,
  fontSize,
  fontStyle,
  textAlign,
  bgColor,
  borderColor,
  padding,
  margin
}) => {
  return (
    <div style={{ backgroundColor: bgColor }} className={`${padding} ${margin}`}>
      <blockquote
        style={{
          borderLeftColor: borderColor,
          textAlign: textAlign as any
        }}
        className="border-l-4 pl-4"
      >
        <p
          style={{
            color: textColor,
            fontSize: fontSize + 'px',
            fontStyle: fontStyle
          }}
          className="mb-2"
        >
          "{quote}"
        </p>
        {author && (
          <cite
            style={{
              color: authorColor,
              fontSize: (parseInt(fontSize) - 2) + 'px'
            }}
            className="block"
          >
            — {author}
          </cite>
        )}
      </blockquote>
    </div>
  );
};

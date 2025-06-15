
import React from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  bgColor: string;
  textColor: string;
  fontSize: string;
  fontFamily: string;
  padding: string;
  margin: string;
  borderRadius: string;
}

export const CodeBlockTemplate: React.FC<CodeBlockProps> = ({
  code,
  language,
  bgColor,
  textColor,
  fontSize,
  fontFamily,
  padding,
  margin,
  borderRadius
}) => {
  return (
    <div className={`${margin}`}>
      <div className={`${padding} ${borderRadius} overflow-x-auto`} style={{ backgroundColor: bgColor }}>
        <pre className="m-0">
          <code
            style={{
              color: textColor,
              fontSize: fontSize + 'px',
              fontFamily: fontFamily
            }}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

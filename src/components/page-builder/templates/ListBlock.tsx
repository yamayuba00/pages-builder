
import React from 'react';

interface ListBlockProps {
  type: string;
  items: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  bgColor: string;
  padding: string;
  margin: string;
  listStyleType: string;
}

export const ListBlockTemplate: React.FC<ListBlockProps> = ({
  type,
  items,
  textColor,
  fontSize,
  fontWeight,
  fontFamily,
  bgColor,
  padding,
  margin,
  listStyleType
}) => {
  const itemList = items.split('\n').filter(item => item.trim());
  const ListTag = type === 'ordered' ? 'ol' : 'ul';

  return (
    <div style={{ backgroundColor: bgColor }} className={`${padding} ${margin}`}>
      <ListTag
        style={{
          color: textColor,
          fontSize: fontSize + 'px',
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          listStyleType: listStyleType
        }}
        className="m-0 pl-6"
      >
        {itemList.map((item, index) => (
          <li key={index} className="mb-1">
            {item}
          </li>
        ))}
      </ListTag>
    </div>
  );
};

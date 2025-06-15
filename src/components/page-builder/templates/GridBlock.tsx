
import React from 'react';

interface GridBlockProps {
  columns: string;
  gap: string;
  maxWidth: string;
  padding: string;
  bgColor: string;
  mobileColumns: string;
  tabletColumns: string;
  desktopColumns: string;
  breakpoints: string;
  gridItems: string;
  itemBgColor: string;
  itemTextColor: string;
  itemPadding: string;
  itemBorderRadius: string;
}

export const GridBlockTemplate: React.FC<GridBlockProps> = ({
  columns,
  gap,
  maxWidth,
  padding,
  bgColor,
  mobileColumns,
  tabletColumns,
  desktopColumns,
  breakpoints,
  gridItems,
  itemBgColor,
  itemTextColor,
  itemPadding,
  itemBorderRadius
}) => {
  const parseGridItems = (itemsString: string) => {
    try {
      const lines = itemsString.split('\n').filter(line => line.trim());
      const parsedItems = [];
      
      for (let i = 0; i < lines.length; i += 2) {
        const item = {
          title: lines[i]?.trim() || `Item ${Math.floor(i/2) + 1}`,
          description: lines[i + 1]?.trim() || 'Description'
        };
        parsedItems.push(item);
      }
      
      return parsedItems;
    } catch (error) {
      return [
        { title: 'Item 1', description: 'Description for item 1' },
        { title: 'Item 2', description: 'Description for item 2' },
        { title: 'Item 3', description: 'Description for item 3' }
      ];
    }
  };

  const getGridClasses = () => {
    if (breakpoints === 'responsive') {
      const mobileClass = `grid-cols-${mobileColumns}`;
      const tabletClass = `md:grid-cols-${tabletColumns}`;
      const desktopClass = `lg:grid-cols-${desktopColumns}`;
      return `grid ${mobileClass} ${tabletClass} ${desktopClass} gap-${gap}`;
    } else {
      return `grid grid-cols-${columns} gap-${gap}`;
    }
  };

  const items = parseGridItems(gridItems);

  return (
    <div style={{ backgroundColor: bgColor }} className={`w-full ${padding}`}>
      <div className={`${maxWidth} mx-auto`}>
        <div className={getGridClasses()}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{ 
                backgroundColor: itemBgColor,
                color: itemTextColor
              }}
              className={`${itemPadding} ${itemBorderRadius} shadow-sm hover:shadow-md transition-shadow`}
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

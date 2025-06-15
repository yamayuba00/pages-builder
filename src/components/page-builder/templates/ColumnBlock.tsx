
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface ColumnContentItem {
  icon?: string;
  text?: string;
  description?: string;
}

interface ColumnBlockProps {
  width: string;
  bgColor: string;
  padding: string;
  textAlign: string;
  content: string;
  textColor: string;
  itemCount: string;
  items: string;
  iconSize: string;
  iconColor: string;
  textSize: string;
  descriptionSize: string;
  itemSpacing: string;
  itemAlignment: string;
}

export const ColumnBlockTemplate: React.FC<ColumnBlockProps> = ({
  width,
  bgColor,
  padding,
  textAlign,
  content,
  textColor,
  itemCount,
  items,
  iconSize,
  iconColor,
  textSize,
  descriptionSize,
  itemSpacing,
  itemAlignment
}) => {
  const parseItems = (itemsString: string): ColumnContentItem[] => {
    try {
      const lines = itemsString.split('\n').filter(line => line.trim());
      const parsedItems: ColumnContentItem[] = [];
      
      for (let i = 0; i < lines.length; i += 3) {
        const item: ColumnContentItem = {
          icon: lines[i]?.trim() || 'Circle',
          text: lines[i + 1]?.trim() || 'Default Text',
          description: lines[i + 2]?.trim() || 'Default description'
        };
        parsedItems.push(item);
      }
      
      return parsedItems;
    } catch (error) {
      return [
        { icon: 'Circle', text: 'Default Text', description: 'Default description' }
      ];
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Circle;
    return (
      <IconComponent 
        size={parseInt(iconSize)} 
        color={iconColor}
        className="mb-2"
      />
    );
  };

  const parsedItems = parseItems(items);
  const numberOfItems = Math.min(parseInt(itemCount) || 1, 12);
  const itemsToShow = parsedItems.slice(0, numberOfItems);

  // Fill remaining slots if needed
  while (itemsToShow.length < numberOfItems) {
    itemsToShow.push({
      icon: 'Circle',
      text: `Item ${itemsToShow.length + 1}`,
      description: `Description for item ${itemsToShow.length + 1}`
    });
  }

  return (
    <div 
      style={{ 
        backgroundColor: bgColor,
        color: textColor,
        textAlign: textAlign as any
      }} 
      className={`${width} ${padding} min-h-16`}
    >
      <div className="prose max-w-none" style={{ color: textColor }}>
        {content && (
          <div className="mb-4">
            {content}
          </div>
        )}
        
        <div className={`space-y-${itemSpacing}`}>
          {itemsToShow.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${itemAlignment} p-3 rounded-lg`}
              style={{ backgroundColor: `${bgColor}10` }}
            >
              {item.icon && renderIcon(item.icon)}
              
              {item.text && (
                <h4 
                  className="font-semibold mb-1"
                  style={{ 
                    color: textColor,
                    fontSize: `${textSize}px`
                  }}
                >
                  {item.text}
                </h4>
              )}
              
              {item.description && (
                <p 
                  className="opacity-80"
                  style={{ 
                    color: textColor,
                    fontSize: `${descriptionSize}px`
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

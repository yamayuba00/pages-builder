
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionBlockProps {
  items: string;
  bgColor: string;
  textColor: string;
  headerBgColor: string;
  borderColor: string;
  padding: string;
  margin: string;
}

export const AccordionBlockTemplate: React.FC<AccordionBlockProps> = ({
  items,
  bgColor,
  textColor,
  headerBgColor,
  borderColor,
  padding,
  margin
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const itemList = items.split('\n').filter(item => item.trim());

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div style={{ backgroundColor: bgColor }} className={`${padding} ${margin}`}>
      <div className="space-y-2">
        {itemList.map((item, index) => {
          const isOpen = openItems.includes(index);
          return (
            <div key={index} style={{ borderColor: borderColor }} className="border rounded-lg">
              <button
                onClick={() => toggleItem(index)}
                style={{ 
                  backgroundColor: headerBgColor,
                  color: textColor 
                }}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:opacity-80 transition-opacity rounded-t-lg"
              >
                <span className="font-medium">{item}</span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 py-3 border-t" style={{ borderColor: borderColor, color: textColor }}>
                  <p>Content for "{item}"</p>
                  <p className="text-sm opacity-70 mt-2">This is the expanded content area.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

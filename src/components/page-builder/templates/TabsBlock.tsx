
import React, { useState } from 'react';

interface TabsBlockProps {
  tabs: string;
  bgColor: string;
  textColor: string;
  activeTabColor: string;
  activeTabBg: string;
  padding: string;
  margin: string;
}

export const TabsBlockTemplate: React.FC<TabsBlockProps> = ({
  tabs,
  bgColor,
  textColor,
  activeTabColor,
  activeTabBg,
  padding,
  margin
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabList = tabs.split(',').map(tab => tab.trim()).filter(tab => tab);

  return (
    <div style={{ backgroundColor: bgColor }} className={`${padding} ${margin}`}>
      <div className="border-b border-gray-200">
        <div className="flex space-x-1">
          {tabList.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              style={{
                color: activeTab === index ? activeTabColor : textColor,
                backgroundColor: activeTab === index ? activeTabBg : 'transparent'
              }}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                activeTab === index ? 'border-blue-500' : 'border-transparent'
              } hover:opacity-80 transition-all`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4" style={{ color: textColor }}>
        <p>Content for {tabList[activeTab] || 'Tab'}</p>
        <p className="text-sm opacity-70">This is the content area for the selected tab.</p>
      </div>
    </div>
  );
};

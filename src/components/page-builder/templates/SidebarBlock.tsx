
import React from 'react';
import { Home, Users, Settings, BarChart } from 'lucide-react';

interface SidebarBlockProps {
  bgColor: string;
  textColor: string;
  activeColor: string;
  width: string;
}

export const SidebarBlockTemplate: React.FC<SidebarBlockProps> = ({
  bgColor,
  textColor,
  activeColor,
  width
}) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Users', active: false },
    { icon: BarChart, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  return (
    <div 
      style={{ backgroundColor: bgColor, width: width }} 
      className="h-screen p-4 shadow-lg"
    >
      <div className="mb-8">
        <h2 style={{ color: textColor }} className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <a
              key={index}
              href="#"
              style={{
                color: item.active ? activeColor : textColor,
                backgroundColor: item.active ? `${activeColor}20` : 'transparent'
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-all"
            >
              <IconComponent size={18} />
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};


import React from 'react';
import { MountainIcon } from 'lucide-react';

interface NavbarProps {
  bgColor: string;
  linkColor: string;
  maxWidth: string;
  menuItems: string;
  logoText: string;
  height: string;
  fontWeight: string;
  fontSize: string;
}

export const NavbarTemplate: React.FC<NavbarProps> = ({ 
  bgColor, 
  linkColor, 
  maxWidth, 
  menuItems, 
  logoText,
  height,
  fontWeight,
  fontSize 
}) => {
  const menuList = menuItems.split(',').map(item => item.trim()).filter(item => item);
  
  return (
    <nav 
      style={{ 
        backgroundColor: bgColor,
        height: height 
      }} 
      className="w-full px-4 lg:px-6 flex items-center shadow-md transition-colors m-0"
    >
      <div className={`${maxWidth} mx-auto w-full flex items-center justify-between`}>
        <a href="#" className="flex items-center justify-center">
          <MountainIcon className="h-6 w-6 mr-2" style={{ color: linkColor }} />
          {logoText && (
            <span 
              style={{ 
                color: linkColor,
                fontSize: fontSize,
                fontWeight: fontWeight 
              }}
            >
              {logoText}
            </span>
          )}
        </a>
        <div className="flex gap-4 sm:gap-6">
          {menuList.map((item, index) => (
            <a 
              key={index}
              href="#" 
              style={{ 
                color: linkColor,
                fontSize: fontSize,
                fontWeight: fontWeight 
              }} 
              className="hover:underline underline-offset-4 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

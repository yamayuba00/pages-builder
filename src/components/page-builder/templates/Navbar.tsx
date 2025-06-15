
import React from 'react';
import { MountainIcon } from 'lucide-react';

interface NavbarProps {
  bgColor: string;
  linkColor: string;
}

export const NavbarTemplate: React.FC<NavbarProps> = ({ bgColor, linkColor }) => {
  return (
    <nav 
      style={{ backgroundColor: bgColor }} 
      className="w-full px-4 lg:px-6 h-14 flex items-center shadow-md transition-colors m-0"
    >
      <a href="#" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6" style={{ color: linkColor }} />
        <span className="sr-only">Page Builder Inc</span>
      </a>
      <div className="ml-auto flex gap-4 sm:gap-6">
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4 transition-colors">
          Fitur
        </a>
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4 transition-colors">
          Harga
        </a>
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4 transition-colors">
          Tentang
        </a>
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4 transition-colors">
          Kontak
        </a>
      </div>
    </nav>
  );
};

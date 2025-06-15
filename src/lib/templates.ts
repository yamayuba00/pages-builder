
import React from 'react';
import { HeroSectionTemplate } from '@/components/page-builder/templates/HeroSection';
import { NavbarTemplate } from '@/components/page-builder/templates/Navbar';

export interface PropConfig {
  key: string;
  label: string;
  type: 'text' | 'color';
}

export interface Template {
  id: string;
  name: string;
  component: React.FC<any>;
  code: string;
  defaultProps: Record<string, any>;
  propsConfig: PropConfig[];
}

export const templates: Template[] = [
  {
    id: 'navbar',
    name: 'Navbar Standar',
    component: NavbarTemplate,
    defaultProps: {
      bgColor: '#111827',
      linkColor: '#F9FAFB',
    },
    propsConfig: [
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'linkColor', label: 'Warna Tautan', type: 'color' },
    ],
    code: `import React from 'react';
import { MountainIcon } from 'lucide-react';

interface NavbarProps {
  bgColor: string;
  linkColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({ bgColor, linkColor }) => {
  return (
    <nav style={{ backgroundColor: bgColor }} className="px-4 lg:px-6 h-14 flex items-center shadow-md">
      <a href="#" className="flex items-center justify-center">
        <MountainIcon className="h-6 w-6" style={{ color: linkColor }} />
        <span className="sr-only">Page Builder Inc</span>
      </a>
      <div className="ml-auto flex gap-4 sm:gap-6">
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4">Fitur</a>
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4">Harga</a>
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4">Tentang</a>
        <a href="#" style={{ color: linkColor }} className="text-sm font-medium hover:underline underline-offset-4">Kontak</a>
      </div>
    </nav>
  );
};`
  },
  {
    id: 'hero-section',
    name: 'Hero Section',
    component: HeroSectionTemplate,
    defaultProps: {
      title: 'Bangun Web Impian Anda',
      subtitle: 'Dengan Page Builder modern kami, ciptakan halaman web yang menakjubkan tanpa perlu coding.',
      buttonText: 'Mulai Sekarang',
      bgColor: '#030712',
      textColor: '#F9FAFB',
      buttonColor: '#00C2C2',
      buttonTextColor: '#030712',
    },
    propsConfig: [
      { key: 'title', label: 'Judul', type: 'text' },
      { key: 'subtitle', label: 'Subjudul', type: 'text' },
      { key: 'buttonText', label: 'Teks Tombol', type: 'text' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'buttonColor', label: 'Warna Tombol', type: 'color' },
      { key: 'buttonTextColor', label: 'Warna Teks Tombol', type: 'color' },
    ],
    code: `import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

export const HeroSection: React.FC<HeroProps> = ({ title, subtitle, buttonText, bgColor, textColor, buttonColor, buttonTextColor }) => {
  return (
    <section style={{ backgroundColor: bgColor }} className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 style={{ color: textColor }} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {title}
            </h1>
            <p style={{ color: textColor }} className="mx-auto max-w-[700px] text-lg md:text-xl">
              {subtitle}
            </p>
          </div>
          <div className="space-x-4">
            <a href="#" style={{ backgroundColor: buttonColor, color: buttonTextColor }} className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors hover:opacity-90">
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};`
  },
];

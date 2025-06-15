
import React from 'react';
import { ComponentConfig } from './page-builder-types';
import { NavbarTemplate } from '@/components/page-builder/templates/Navbar';
import { HeroSectionTemplate } from '@/components/page-builder/templates/HeroSection';
import { TextBlockTemplate } from '@/components/page-builder/templates/TextBlock';
import { ImageBlockTemplate } from '@/components/page-builder/templates/ImageBlock';
import { GridBlockTemplate } from '@/components/page-builder/templates/GridBlock';
import { CardBlockTemplate } from '@/components/page-builder/templates/CardBlock';
import { ButtonBlockTemplate } from '@/components/page-builder/templates/ButtonBlock';
import { StatsBlockTemplate } from '@/components/page-builder/templates/StatsBlock';
import { TableBlockTemplate } from '@/components/page-builder/templates/TableBlock';
import { SidebarBlockTemplate } from '@/components/page-builder/templates/SidebarBlock';
import { FormBlockTemplate } from '@/components/page-builder/templates/FormBlock';

export const pageComponents: Record<string, ComponentConfig> = {
  // Layout Components
  grid: {
    type: 'grid',
    name: 'Grid Layout',
    category: 'layout',
    component: GridBlockTemplate,
    defaultProps: {
      columns: '3',
      gap: '4',
      maxWidth: 'max-w-6xl',
      padding: 'py-8 px-4',
      bgColor: '#ffffff',
    },
    propsConfig: [
      { key: 'columns', label: 'Kolom', type: 'select', options: ['1', '2', '3', '4', '6', '12'] },
      { key: 'gap', label: 'Jarak', type: 'select', options: ['2', '4', '6', '8'] },
      { key: 'maxWidth', label: 'Lebar Maksimal', type: 'select', options: ['max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-4xl', 'max-w-6xl', 'max-w-full'] },
      { key: 'padding', label: 'Padding', type: 'select', options: ['py-4 px-2', 'py-6 px-4', 'py-8 px-4', 'py-12 px-6'] },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
    ],
  },
  
  sidebar: {
    type: 'sidebar',
    name: 'Sidebar',
    category: 'dashboard',
    component: SidebarBlockTemplate,
    defaultProps: {
      bgColor: '#1f2937',
      textColor: '#f9fafb',
      activeColor: '#3b82f6',
      width: '250px',
    },
    propsConfig: [
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'activeColor', label: 'Warna Aktif', type: 'color' },
      { key: 'width', label: 'Lebar', type: 'select', options: ['200px', '250px', '300px', '350px'] },
    ],
  },

  // Form Components
  form: {
    type: 'form',
    name: 'Form',
    category: 'form',
    component: FormBlockTemplate,
    defaultProps: {
      title: 'Contact Form',
      fields: 'Name, Email, Subject, Message',
      submitText: 'Send Message',
      bgColor: '#ffffff',
      textColor: '#374151',
      inputBgColor: '#ffffff',
      buttonColor: '#3b82f6',
      buttonTextColor: '#ffffff',
      maxWidth: 'max-w-md',
      padding: 'py-8 px-4',
    },
    propsConfig: [
      { key: 'title', label: 'Judul Form', type: 'text' },
      { key: 'fields', label: 'Fields (pisah dengan koma)', type: 'textarea' },
      { key: 'submitText', label: 'Teks Tombol Submit', type: 'text' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'inputBgColor', label: 'Warna Latar Input', type: 'color' },
      { key: 'buttonColor', label: 'Warna Tombol', type: 'color' },
      { key: 'buttonTextColor', label: 'Warna Teks Tombol', type: 'color' },
      { key: 'maxWidth', label: 'Lebar Maksimal', type: 'select', options: ['max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl'] },
      { key: 'padding', label: 'Padding', type: 'select', options: ['py-4 px-2', 'py-6 px-4', 'py-8 px-4', 'py-12 px-6'] },
    ],
  },

  // Dashboard Components
  card: {
    type: 'card',
    name: 'Card',
    category: 'dashboard',
    component: CardBlockTemplate,
    defaultProps: {
      title: 'Card Title',
      content: 'This is card content that can be customized.',
      bgColor: '#ffffff',
      textColor: '#374151',
      borderColor: '#e5e7eb',
      shadow: 'md',
    },
    propsConfig: [
      { key: 'title', label: 'Judul', type: 'text' },
      { key: 'content', label: 'Konten', type: 'textarea' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'borderColor', label: 'Warna Border', type: 'color' },
      { key: 'shadow', label: 'Bayangan', type: 'select', options: ['none', 'sm', 'md', 'lg', 'xl'] },
    ],
  },

  stats: {
    type: 'stats',
    name: 'Statistik',
    category: 'dashboard',
    component: StatsBlockTemplate,
    defaultProps: {
      title: 'Total Users',
      value: '1,234',
      subtitle: '+12% from last month',
      bgColor: '#ffffff',
      textColor: '#374151',
      valueColor: '#059669',
    },
    propsConfig: [
      { key: 'title', label: 'Judul', type: 'text' },
      { key: 'value', label: 'Nilai', type: 'text' },
      { key: 'subtitle', label: 'Subjudul', type: 'text' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'valueColor', label: 'Warna Nilai', type: 'color' },
    ],
  },

  table: {
    type: 'table',
    name: 'Tabel',
    category: 'dashboard',
    component: TableBlockTemplate,
    defaultProps: {
      title: 'Data Table',
      headers: 'Name, Email, Role, Status',
      bgColor: '#ffffff',
      textColor: '#374151',
      borderColor: '#e5e7eb',
    },
    propsConfig: [
      { key: 'title', label: 'Judul', type: 'text' },
      { key: 'headers', label: 'Header (pisah dengan koma)', type: 'text' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'borderColor', label: 'Warna Border', type: 'color' },
    ],
  },

  // Content Components
  button: {
    type: 'button',
    name: 'Button',
    category: 'content',
    component: ButtonBlockTemplate,
    defaultProps: {
      text: 'Click Me',
      bgColor: '#3b82f6',
      textColor: '#ffffff',
      size: 'md',
      alignment: 'center',
      link: '#',
    },
    propsConfig: [
      { key: 'text', label: 'Teks', type: 'text' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'size', label: 'Ukuran', type: 'select', options: ['sm', 'md', 'lg', 'xl'] },
      { key: 'alignment', label: 'Posisi', type: 'select', options: ['left', 'center', 'right'] },
      { key: 'link', label: 'Link', type: 'text' },
    ],
  },

  // Enhanced Layout Components
  navbar: {
    type: 'navbar',
    name: 'Navbar',
    category: 'layout',
    component: NavbarTemplate,
    defaultProps: {
      bgColor: '#111827',
      linkColor: '#F9FAFB',
    },
    propsConfig: [
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'linkColor', label: 'Warna Tautan', type: 'color' },
    ],
  },
  
  hero: {
    type: 'hero',
    name: 'Hero Section',
    category: 'marketing',
    component: HeroSectionTemplate,
    defaultProps: {
      title: 'Judul Hero Anda',
      subtitle: 'Deskripsi yang menarik untuk hero section Anda.',
      buttonText: 'Mulai Sekarang',
      bgColor: '#030712',
      textColor: '#F9FAFB',
      buttonColor: '#00C2C2',
      buttonTextColor: '#030712',
    },
    propsConfig: [
      { key: 'title', label: 'Judul', type: 'text' },
      { key: 'subtitle', label: 'Subjudul', type: 'textarea' },
      { key: 'buttonText', label: 'Teks Tombol', type: 'text' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'buttonColor', label: 'Warna Tombol', type: 'color' },
      { key: 'buttonTextColor', label: 'Warna Teks Tombol', type: 'color' },
    ],
  },
  
  text: {
    type: 'text',
    name: 'Text Block',
    category: 'content',
    component: TextBlockTemplate,
    defaultProps: {
      content: 'Ini adalah blok teks. Anda bisa mengedit konten ini sesuai kebutuhan.',
      fontSize: '16',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: '400',
      textAlign: 'left',
      textColor: '#000000',
      bgColor: '#ffffff',
      maxWidth: 'max-w-4xl',
      padding: 'py-8 px-4',
    },
    propsConfig: [
      { key: 'content', label: 'Konten', type: 'textarea' },
      { key: 'fontSize', label: 'Ukuran Font (px)', type: 'number' },
      { key: 'fontFamily', label: 'Font Family', type: 'select', options: [
        'Inter, system-ui, sans-serif',
        'Arial, sans-serif',
        'Georgia, serif',
        'Times New Roman, serif',
        'Helvetica, sans-serif',
        'Verdana, sans-serif',
        'Courier New, monospace',
        'Roboto, sans-serif',
        'Open Sans, sans-serif',
        'Lato, sans-serif',
        'Montserrat, sans-serif',
        'Playfair Display, serif'
      ]},
      { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
      { key: 'maxWidth', label: 'Lebar Maksimal', type: 'select', options: ['max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-4xl', 'max-w-6xl', 'max-w-full'] },
      { key: 'padding', label: 'Padding', type: 'select', options: ['py-4 px-2', 'py-6 px-4', 'py-8 px-4', 'py-12 px-6'] },
    ],
  },
  
  image: {
    type: 'image',
    name: 'Image Block',
    category: 'content',
    component: ImageBlockTemplate,
    defaultProps: {
      src: 'https://via.placeholder.com/600x300',
      alt: 'Gambar placeholder',
      width: '100%',
      height: '300px',
    },
    propsConfig: [
      { key: 'src', label: 'URL Gambar', type: 'text' },
      { key: 'alt', label: 'Alt Text', type: 'text' },
      { key: 'width', label: 'Lebar', type: 'text' },
      { key: 'height', label: 'Tinggi', type: 'text' },
    ],
  },
};

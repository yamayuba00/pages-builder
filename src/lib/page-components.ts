
import React from 'react';
import { ComponentConfig } from './page-builder-types';
import { NavbarTemplate } from '@/components/page-builder/templates/Navbar';
import { HeroSectionTemplate } from '@/components/page-builder/templates/HeroSection';
import { TextBlockTemplate } from '@/components/page-builder/templates/TextBlock';
import { ImageBlockTemplate } from '@/components/page-builder/templates/ImageBlock';

export const pageComponents: Record<string, ComponentConfig> = {
  navbar: {
    type: 'navbar',
    name: 'Navbar',
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
    component: TextBlockTemplate,
    defaultProps: {
      content: 'Ini adalah blok teks. Anda bisa mengedit konten ini sesuai kebutuhan.',
      textAlign: 'left',
      fontSize: '16',
      textColor: '#000000',
      bgColor: '#ffffff',
    },
    propsConfig: [
      { key: 'content', label: 'Konten', type: 'textarea' },
      { key: 'fontSize', label: 'Ukuran Font (px)', type: 'text' },
      { key: 'textColor', label: 'Warna Teks', type: 'color' },
      { key: 'bgColor', label: 'Warna Latar', type: 'color' },
    ],
  },
  image: {
    type: 'image',
    name: 'Image Block',
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

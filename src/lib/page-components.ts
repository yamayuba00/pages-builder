import React from 'react';
import { ComponentConfig } from './page-builder-types';
import { NavbarTemplate } from '@/components/page-builder/templates/Navbar';
import { HeroSectionTemplate } from '@/components/page-builder/templates/HeroSection';
import { TextBlockTemplate } from '@/components/page-builder/templates/TextBlock';
import { ImageBlockTemplate } from '@/components/page-builder/templates/ImageBlock';
import { CardBlockTemplate } from '@/components/page-builder/templates/CardBlock';
import { ButtonBlockTemplate } from '@/components/page-builder/templates/ButtonBlock';
import { StatsBlockTemplate } from '@/components/page-builder/templates/StatsBlock';
import { TableBlockTemplate } from '@/components/page-builder/templates/TableBlock';
import { SidebarBlockTemplate } from '@/components/page-builder/templates/SidebarBlock';
import { FormBlockTemplate } from '@/components/page-builder/templates/FormBlock';
import { ContainerBlockTemplate } from '@/components/page-builder/templates/ContainerBlock';
import { RowBlockTemplate } from '@/components/page-builder/templates/RowBlock';
import { ColumnBlockTemplate } from '@/components/page-builder/templates/ColumnBlock';
import { SpacerBlockTemplate } from '@/components/page-builder/templates/SpacerBlock';
import { HeadingBlockTemplate } from '@/components/page-builder/templates/HeadingBlock';
import { ParagraphBlockTemplate } from '@/components/page-builder/templates/ParagraphBlock';
import { ListBlockTemplate } from '@/components/page-builder/templates/ListBlock';
import { QuoteBlockTemplate } from '@/components/page-builder/templates/QuoteBlock';
import { CodeBlockTemplate } from '@/components/page-builder/templates/CodeBlock';
import { LinkBlockTemplate } from '@/components/page-builder/templates/LinkBlock';
import { TabsBlockTemplate } from '@/components/page-builder/templates/TabsBlock';
import { AccordionBlockTemplate } from '@/components/page-builder/templates/AccordionBlock';

export const pageComponents: Record<string, ComponentConfig> = {
  // Layout Components
  container: {
    type: 'container',
    name: 'Container',
    category: 'layout',
    component: ContainerBlockTemplate,
    defaultProps: {
      bgColor: '#ffffff',
      padding: 'p-6',
      margin: 'my-4',
      maxWidth: 'max-w-4xl',
      borderRadius: 'rounded-lg',
      borderColor: '#e5e7eb',
      borderWidth: '1px',
      shadow: 'md',
      content: 'Container content goes here. You can customize this text and add any content you need.'
    },
    propsConfig: [
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['p-2', 'p-4', 'p-6', 'p-8', 'p-12'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-2', 'my-4', 'my-6', 'my-8', 'my-12'] },
      { key: 'maxWidth', label: 'Max Width', type: 'select', options: ['max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-4xl', 'max-w-6xl', 'max-w-full'] },
      { key: 'borderRadius', label: 'Border Radius', type: 'select', options: ['rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl'] },
      { key: 'borderColor', label: 'Border Color', type: 'color' },
      { key: 'borderWidth', label: 'Border Width', type: 'select', options: ['0px', '1px', '2px', '3px', '4px'] },
      { key: 'shadow', label: 'Shadow', type: 'select', options: ['none', 'sm', 'md', 'lg', 'xl'] },
      { key: 'content', label: 'Content', type: 'textarea' }
    ]
  },

  row: {
    type: 'row',
    name: 'Row',
    category: 'layout',
    component: RowBlockTemplate,
    defaultProps: {
      gap: 'gap-4',
      justifyContent: 'justify-start',
      alignItems: 'items-center',
      bgColor: '#ffffff',
      padding: 'p-4',
      wrap: 'flex-wrap'
    },
    propsConfig: [
      { key: 'gap', label: 'Gap', type: 'select', options: ['gap-1', 'gap-2', 'gap-4', 'gap-6', 'gap-8'] },
      { key: 'justifyContent', label: 'Justify Content', type: 'select', options: ['justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around'] },
      { key: 'alignItems', label: 'Align Items', type: 'select', options: ['items-start', 'items-center', 'items-end', 'items-stretch'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['p-0', 'p-2', 'p-4', 'p-6', 'p-8'] },
      { key: 'wrap', label: 'Flex Wrap', type: 'select', options: ['flex-nowrap', 'flex-wrap', 'flex-wrap-reverse'] }
    ]
  },

  column: {
    type: 'column',
    name: 'Column',
    category: 'layout',
    component: ColumnBlockTemplate,
    defaultProps: {
      width: 'w-full',
      bgColor: '#f9fafb',
      padding: 'p-4',
      textAlign: 'left',
      content: 'Column content goes here',
      textColor: '#374151'
    },
    propsConfig: [
      { key: 'width', label: 'Width', type: 'select', options: ['w-1/12', 'w-2/12', 'w-3/12', 'w-4/12', 'w-6/12', 'w-8/12', 'w-9/12', 'w-full'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['p-0', 'p-2', 'p-4', 'p-6', 'p-8'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
      { key: 'content', label: 'Content', type: 'textarea' },
      { key: 'textColor', label: 'Text Color', type: 'color' }
    ]
  },

  spacer: {
    type: 'spacer',
    name: 'Spacer/Divider',
    category: 'layout',
    component: SpacerBlockTemplate,
    defaultProps: {
      height: '24px',
      bgColor: 'transparent',
      borderStyle: 'solid',
      borderColor: '#e5e7eb',
      borderWidth: '1px'
    },
    propsConfig: [
      { key: 'height', label: 'Height', type: 'select', options: ['12px', '24px', '48px', '72px', '96px', '120px'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'borderStyle', label: 'Border Style', type: 'select', options: ['none', 'solid', 'dashed', 'dotted'] },
      { key: 'borderColor', label: 'Border Color', type: 'color' },
      { key: 'borderWidth', label: 'Border Width', type: 'select', options: ['0px', '1px', '2px', '3px', '4px'] }
    ]
  },

  // Typography Components
  heading: {
    type: 'heading',
    name: 'Heading',
    category: 'content',
    component: HeadingBlockTemplate,
    defaultProps: {
      level: 'h1',
      text: 'Your Heading Text',
      textColor: '#1f2937',
      fontSize: '32',
      fontWeight: '700',
      textAlign: 'left',
      fontFamily: 'Inter, sans-serif',
      bgColor: 'transparent',
      padding: 'py-2',
      margin: 'my-4'
    },
    propsConfig: [
      { key: 'level', label: 'Heading Level', type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
      { key: 'text', label: 'Text', type: 'text' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size (px)', type: 'number' },
      { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['300', '400', '500', '600', '700', '800', '900'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] },
      { key: 'fontFamily', label: 'Font Family', type: 'select', options: ['Inter, sans-serif', 'Arial, sans-serif', 'Georgia, serif', 'Times New Roman, serif'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['py-0', 'py-1', 'py-2', 'py-4', 'py-6'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-0', 'my-2', 'my-4', 'my-6', 'my-8'] }
    ]
  },

  paragraph: {
    type: 'paragraph',
    name: 'Paragraph',
    category: 'content',
    component: ParagraphBlockTemplate,
    defaultProps: {
      text: 'This is a paragraph text. You can customize the content, styling, and appearance according to your needs.',
      textColor: '#374151',
      fontSize: '16',
      fontWeight: '400',
      textAlign: 'left',
      fontFamily: 'Inter, sans-serif',
      lineHeight: '1.6',
      bgColor: 'transparent',
      padding: 'py-2',
      margin: 'my-2'
    },
    propsConfig: [
      { key: 'text', label: 'Text', type: 'textarea' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size (px)', type: 'number' },
      { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['300', '400', '500', '600', '700'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
      { key: 'fontFamily', label: 'Font Family', type: 'select', options: ['Inter, sans-serif', 'Arial, sans-serif', 'Georgia, serif', 'Times New Roman, serif'] },
      { key: 'lineHeight', label: 'Line Height', type: 'select', options: ['1.2', '1.4', '1.6', '1.8', '2.0'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['py-0', 'py-1', 'py-2', 'py-4'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-0', 'my-1', 'my-2', 'my-4'] }
    ]
  },

  list: {
    type: 'list',
    name: 'List',
    category: 'content',
    component: ListBlockTemplate,
    defaultProps: {
      type: 'unordered',
      items: 'First item\nSecond item\nThird item\nFourth item',
      textColor: '#374151',
      fontSize: '16',
      fontWeight: '400',
      fontFamily: 'Inter, sans-serif',
      bgColor: 'transparent',
      padding: 'py-2',
      margin: 'my-4',
      listStyleType: 'disc'
    },
    propsConfig: [
      { key: 'type', label: 'List Type', type: 'select', options: ['unordered', 'ordered'] },
      { key: 'items', label: 'List Items (one per line)', type: 'textarea' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size (px)', type: 'number' },
      { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['300', '400', '500', '600', '700'] },
      { key: 'fontFamily', label: 'Font Family', type: 'select', options: ['Inter, sans-serif', 'Arial, sans-serif', 'Georgia, serif'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['py-0', 'py-2', 'py-4', 'py-6'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-0', 'my-2', 'my-4', 'my-6'] },
      { key: 'listStyleType', label: 'List Style', type: 'select', options: ['disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-alpha', 'upper-alpha'] }
    ]
  },

  quote: {
    type: 'quote',
    name: 'Quote',
    category: 'content',
    component: QuoteBlockTemplate,
    defaultProps: {
      quote: 'This is an inspirational quote that can be customized according to your needs.',
      author: 'Quote Author',
      textColor: '#374151',
      authorColor: '#6b7280',
      fontSize: '18',
      fontStyle: 'italic',
      textAlign: 'left',
      bgColor: '#f9fafb',
      borderColor: '#3b82f6',
      padding: 'p-6',
      margin: 'my-6'
    },
    propsConfig: [
      { key: 'quote', label: 'Quote Text', type: 'textarea' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'authorColor', label: 'Author Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size (px)', type: 'number' },
      { key: 'fontStyle', label: 'Font Style', type: 'select', options: ['normal', 'italic', 'oblique'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'borderColor', label: 'Border Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['p-4', 'p-6', 'p-8'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-4', 'my-6', 'my-8'] }
    ]
  },

  code: {
    type: 'code',
    name: 'Code Block',
    category: 'content',
    component: CodeBlockTemplate,
    defaultProps: {
      code: 'function hello() {\n  console.log("Hello, World!");\n  return "Welcome to code editing!";\n}',
      language: 'javascript',
      bgColor: '#1f2937',
      textColor: '#f9fafb',
      fontSize: '14',
      fontFamily: 'Monaco, Consolas, "Ubuntu Mono", monospace',
      padding: 'p-4',
      margin: 'my-4',
      borderRadius: 'rounded-lg'
    },
    propsConfig: [
      { key: 'code', label: 'Code', type: 'textarea' },
      { key: 'language', label: 'Language', type: 'select', options: ['javascript', 'typescript', 'html', 'css', 'python', 'java', 'json', 'xml'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size (px)', type: 'number' },
      { key: 'fontFamily', label: 'Font Family', type: 'select', options: ['Monaco, Consolas, monospace', 'Courier New, monospace', 'Ubuntu Mono, monospace'] },
      { key: 'padding', label: 'Padding', type: 'select', options: ['p-2', 'p-4', 'p-6'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-2', 'my-4', 'my-6'] },
      { key: 'borderRadius', label: 'Border Radius', type: 'select', options: ['rounded-none', 'rounded-md', 'rounded-lg', 'rounded-xl'] }
    ]
  },

  link: {
    type: 'link',
    name: 'Link',
    category: 'content',
    component: LinkBlockTemplate,
    defaultProps: {
      text: 'Click here',
      url: '#',
      target: '_self',
      textColor: '#3b82f6',
      hoverColor: '#1d4ed8',
      fontSize: '16',
      fontWeight: '500',
      textDecoration: 'underline',
      bgColor: 'transparent',
      padding: 'py-1',
      margin: 'my-1',
      textAlign: 'left'
    },
    propsConfig: [
      { key: 'text', label: 'Link Text', type: 'text' },
      { key: 'url', label: 'URL', type: 'text' },
      { key: 'target', label: 'Target', type: 'select', options: ['_self', '_blank', '_parent', '_top'] },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'hoverColor', label: 'Hover Color', type: 'color' },
      { key: 'fontSize', label: 'Font Size (px)', type: 'number' },
      { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['400', '500', '600', '700'] },
      { key: 'textDecoration', label: 'Text Decoration', type: 'select', options: ['none', 'underline', 'overline', 'line-through'] },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['py-0', 'py-1', 'py-2'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-0', 'my-1', 'my-2'] },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] }
    ]
  },

  // Interactive Components
  tabs: {
    type: 'tabs',
    name: 'Tabs',
    category: 'content',
    component: TabsBlockTemplate,
    defaultProps: {
      tabs: 'Tab 1, Tab 2, Tab 3',
      bgColor: '#ffffff',
      textColor: '#374151',
      activeTabColor: '#3b82f6',
      activeTabBg: '#eff6ff',
      padding: 'p-4',
      margin: 'my-4'
    },
    propsConfig: [
      { key: 'tabs', label: 'Tab Names (comma separated)', type: 'text' },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'activeTabColor', label: 'Active Tab Text Color', type: 'color' },
      { key: 'activeTabBg', label: 'Active Tab Background', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['p-2', 'p-4', 'p-6'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-2', 'my-4', 'my-6'] }
    ]
  },

  accordion: {
    type: 'accordion',
    name: 'Accordion',
    category: 'content',
    component: AccordionBlockTemplate,
    defaultProps: {
      items: 'First Section\nSecond Section\nThird Section',
      bgColor: '#ffffff',
      textColor: '#374151',
      headerBgColor: '#f9fafb',
      borderColor: '#e5e7eb',
      padding: 'p-4',
      margin: 'my-4'
    },
    propsConfig: [
      { key: 'items', label: 'Section Titles (one per line)', type: 'textarea' },
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'headerBgColor', label: 'Header Background Color', type: 'color' },
      { key: 'borderColor', label: 'Border Color', type: 'color' },
      { key: 'padding', label: 'Padding', type: 'select', options: ['p-2', 'p-4', 'p-6'] },
      { key: 'margin', label: 'Margin', type: 'select', options: ['my-2', 'my-4', 'my-6'] }
    ]
  },

  // Existing components with improved customization
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
      { key: 'bgColor', label: 'Background Color', type: 'color' },
      { key: 'linkColor', label: 'Link Color', type: 'color' },
    ],
  },

  // ... keep existing code (hero, text, image, button, card, stats, table, sidebar, form components)
  hero: {
    type: 'hero',
    name: 'Hero Section',
    category: 'content',
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

  card: {
    type: 'card',
    name: 'Card',
    category: 'content',
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
    category: 'content',
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
    category: 'content',
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

  sidebar: {
    type: 'sidebar',
    name: 'Sidebar',
    category: 'layout',
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

  form: {
    type: 'form',
    name: 'Form',
    category: 'content',
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
};

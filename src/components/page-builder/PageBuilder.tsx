import React, { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import ComponentPalette from './ComponentPalette';
import ComponentEditor from './ComponentEditor';
import BuilderCanvas from './BuilderCanvas';
import CustomCodeEditor from './CustomCodeEditor';
import { PageComponent, ComponentType } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { PanelLeftOpen, Download, Code, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PageBuilder: React.FC = () => {
  const [components, setComponents] = useState<PageComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [showCustomCode, setShowCustomCode] = useState(false);
  const [customCSS, setCustomCSS] = useState('');
  const [customJS, setCustomJS] = useState('');
  const { toast } = useToast();

  const handleAddComponent = (type: ComponentType) => {
    const config = pageComponents[type];
    if (!config) return;

    const newComponent: PageComponent = {
      id: `${type}-${Date.now()}`,
      type,
      props: { ...config.defaultProps },
      order: components.length,
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
    
    toast({
      title: "Komponen ditambahkan!",
      description: `${config.name} berhasil ditambahkan ke halaman.`,
    });
  };

  const handleSelectTemplate = (templateId: string) => {
    let templateComponents: Partial<PageComponent>[] = [];

    switch (templateId) {
      case 'landing-page':
        templateComponents = [
          { type: 'navbar' },
          { type: 'hero' },
          { type: 'text', props: { ...pageComponents.text.defaultProps, content: 'Tentang Kami\n\nKami adalah perusahaan yang berkomitmen memberikan solusi terbaik untuk kebutuhan digital Anda.' } },
          { type: 'card', props: { ...pageComponents.card.defaultProps, title: 'Kontak Info', content: 'Email: info@company.com\nTelp: +62 123 456 789' } },
        ];
        break;
      case 'dashboard':
        templateComponents = [
          { type: 'sidebar' },
          { type: 'stats', props: { ...pageComponents.stats.defaultProps, title: 'Total Users', value: '1,234' } },
          { type: 'stats', props: { ...pageComponents.stats.defaultProps, title: 'Revenue', value: '$45,678' } },
          { type: 'stats', props: { ...pageComponents.stats.defaultProps, title: 'Orders', value: '567' } },
          { type: 'table' },
        ];
        break;
      case 'portfolio':
        templateComponents = [
          { type: 'navbar' },
          { type: 'hero', props: { ...pageComponents.hero.defaultProps, title: 'Portfolio Saya', subtitle: 'Kumpulan karya dan proyek terbaik' } },
          { type: 'form', props: { ...pageComponents.form.defaultProps, title: 'Hubungi Saya' } },
        ];
        break;
      case 'blog':
        templateComponents = [
          { type: 'navbar' },
          { type: 'text', props: { ...pageComponents.text.defaultProps, content: 'Artikel Blog\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' } },
          { type: 'card', props: { ...pageComponents.card.defaultProps, title: 'Artikel Terbaru', content: '• Tips & Tricks\n• Tutorial\n• News Update' } },
        ];
        break;
      default:
        return;
    }

    const newComponents = templateComponents.map((comp, index) => ({
      id: `${comp.type}-${Date.now()}-${index}`,
      type: comp.type!,
      props: comp.props || { ...pageComponents[comp.type!].defaultProps },
      order: index,
    }));

    setComponents(newComponents);
    toast({
      title: "Template berhasil dimuat!",
      description: `Template ${templateId} telah diterapkan ke halaman.`,
    });
  };

  const handleSelectComponent = (id: string) => {
    setSelectedComponentId(id);
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
    
    toast({
      title: "Komponen dihapus!",
      description: "Komponen berhasil dihapus dari halaman.",
    });
  };

  const handleMoveComponent = (id: string, direction: 'up' | 'down') => {
    setComponents(prev => {
      const currentIndex = prev.findIndex(comp => comp.id === id);
      if (currentIndex === -1) return prev;

      const newComponents = [...prev];
      
      if (direction === 'up' && currentIndex > 0) {
        // Swap with previous component
        [newComponents[currentIndex], newComponents[currentIndex - 1]] = 
        [newComponents[currentIndex - 1], newComponents[currentIndex]];
        
        // Update orders
        newComponents[currentIndex - 1].order = currentIndex - 1;
        newComponents[currentIndex].order = currentIndex;
      } else if (direction === 'down' && currentIndex < newComponents.length - 1) {
        // Swap with next component
        [newComponents[currentIndex], newComponents[currentIndex + 1]] = 
        [newComponents[currentIndex + 1], newComponents[currentIndex]];
        
        // Update orders
        newComponents[currentIndex].order = currentIndex;
        newComponents[currentIndex + 1].order = currentIndex + 1;
      }

      return newComponents;
    });
  };

  const handleResizeComponent = (id: string, gridStart: number, gridEnd: number) => {
    // Grid system removed, this function can be simplified or removed
  };

  const handleEditComponent = (id: string) => {
    setSelectedComponentId(id);
  };

  const handlePropChange = (componentId: string, key: string, value: any) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, props: { ...comp.props, [key]: value } }
          : comp
      )
    );
  };

  const handleSaveCustomCode = (css: string, js: string) => {
    setCustomCSS(css);
    setCustomJS(js);
  };

  const selectedComponent = components.find(c => c.id === selectedComponentId) || null;

  const generateComponentHTML = (component: PageComponent): string => {
    const { type, props } = component;

    switch (type) {
      case 'column':
        const parseItems = (itemsString: string) => {
          const lines = itemsString.split('\n').filter(line => line.trim());
          const parsedItems = [];
          
          for (let i = 0; i < lines.length; i += 3) {
            const item = {
              icon: lines[i]?.trim() || 'Circle',
              text: lines[i + 1]?.trim() || 'Default Text',
              description: lines[i + 2]?.trim() || 'Default description'
            };
            parsedItems.push(item);
          }
          
          return parsedItems;
        };

        const parsedItems = parseItems(props.items || '');
        const numberOfItems = Math.min(parseInt(props.itemCount) || 1, 12);
        const itemsToShow = parsedItems.slice(0, numberOfItems);

        // Fill remaining slots if needed
        while (itemsToShow.length < numberOfItems) {
          itemsToShow.push({
            icon: 'Circle',
            text: `Item ${itemsToShow.length + 1}`,
            description: `Description for item ${itemsToShow.length + 1}`
          });
        }

        return `
          <div style="background-color: ${props.bgColor}; color: ${props.textColor}; text-align: ${props.textAlign};" class="${props.width} ${props.padding} min-h-16">
            <div class="prose max-w-none" style="color: ${props.textColor};">
              ${props.content ? `<div class="mb-4">${props.content}</div>` : ''}
              
              <div class="space-y-${props.itemSpacing}">
                ${itemsToShow.map((item, index) => `
                  <div class="flex flex-col ${props.itemAlignment} p-3 rounded-lg" style="background-color: ${props.bgColor}10;">
                    ${item.icon ? `<svg class="mb-2" width="${props.iconSize}" height="${props.iconSize}" fill="none" stroke="${props.iconColor}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>` : ''}
                    ${item.text ? `<h4 class="font-semibold mb-1" style="color: ${props.textColor}; font-size: ${props.textSize}px;">${item.text}</h4>` : ''}
                    ${item.description ? `<p class="opacity-80" style="color: ${props.textColor}; font-size: ${props.descriptionSize}px;">${item.description}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;

      case 'navbar':
        const navMenuList = props.menuItems.split(',').map((item: string) => item.trim()).filter((item: string) => item);
        return `
<nav style="background-color: ${props.bgColor}; height: ${props.height};" class="w-full px-4 lg:px-6 flex items-center shadow-md">
  <div class="${props.maxWidth} mx-auto w-full flex items-center justify-between">
    <a href="#" class="flex items-center justify-center">
      <svg class="h-6 w-6 mr-2" style="color: ${props.linkColor};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4l4 4"/>
      </svg>
      ${props.logoText ? `<span style="color: ${props.linkColor}; font-size: ${props.fontSize}; font-weight: ${props.fontWeight};">${props.logoText}</span>` : ''}
    </a>
    <div class="flex gap-4 sm:gap-6">
      ${navMenuList.map((item: string) => `
        <a href="#" style="color: ${props.linkColor}; font-size: ${props.fontSize}; font-weight: ${props.fontWeight};" class="hover:underline underline-offset-4 transition-colors">
          ${item}
        </a>
      `).join('')}
    </div>
  </div>
</nav>`;

      case 'hero':
        return `
<section style="background-color: ${props.bgColor};" class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
  <div class="container px-4 md:px-6">
    <div class="flex flex-col items-center space-y-4 text-center">
      <div class="space-y-2">
        <h1 style="color: ${props.textColor};" class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          ${props.title}
        </h1>
        <p style="color: ${props.textColor};" class="mx-auto max-w-[700px] text-lg md:text-xl">
          ${props.subtitle}
        </p>
      </div>
      <div class="space-x-4">
        <a href="#" style="background-color: ${props.buttonColor}; color: ${props.buttonTextColor};" class="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow hover:opacity-90">
          ${props.buttonText}
        </a>
      </div>
    </div>
  </div>
</section>`;

      case 'text':
        return `
<div style="background-color: ${props.bgColor}; color: ${props.textColor};" class="w-full ${props.padding}">
  <div class="${props.maxWidth} mx-auto">
    <div class="prose max-w-none" style="color: ${props.textColor}; font-size: ${props.fontSize}px; font-family: ${props.fontFamily}; font-weight: ${props.fontWeight}; text-align: ${props.textAlign};">
      ${props.content.replace(/\n/g, '<br>')}
    </div>
  </div>
</div>`;

      case 'container':
        const shadowClasses = {
          none: '',
          sm: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);',
          md: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
          lg: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
          xl: 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);'
        };
        return `
<div class="w-full ${props.margin}">
  <div class="${props.maxWidth} mx-auto">
    <div style="background-color: ${props.bgColor}; border-color: ${props.borderColor}; border-width: ${props.borderWidth}; ${shadowClasses[props.shadow as keyof typeof shadowClasses] || shadowClasses.md}" class="${props.padding} ${props.borderRadius} border">
      <div style="color: ${props.textColor};">
        ${props.content.replace(/\n/g, '<br>')}
      </div>
    </div>
  </div>
</div>`;

      case 'heading':
        return `
<div style="background-color: ${props.bgColor};" class="w-full ${props.padding} ${props.margin}">
  <${props.level} style="color: ${props.textColor}; font-size: ${props.fontSize}px; font-weight: ${props.fontWeight}; font-family: ${props.fontFamily}; text-align: ${props.textAlign};">
    ${props.text}
  </${props.level}>
</div>`;

      case 'paragraph':
        return `
<div style="background-color: ${props.bgColor};" class="w-full ${props.padding} ${props.margin}">
  <p style="color: ${props.textColor}; font-size: ${props.fontSize}px; font-weight: ${props.fontWeight}; font-family: ${props.fontFamily}; text-align: ${props.textAlign}; line-height: ${props.lineHeight};">
    ${props.text.replace(/\n/g, '<br>')}
  </p>
</div>`;

      case 'list':
        const listItems = props.items.split('\n').map((item: string) => item.trim()).filter((item: string) => item);
        const ListTag = props.type === 'ordered' ? 'ol' : 'ul';
        return `
<div style="background-color: ${props.bgColor};" class="w-full ${props.padding} ${props.margin}">
  <${ListTag} style="color: ${props.textColor}; font-size: ${props.fontSize}px; font-weight: ${props.fontWeight}; font-family: ${props.fontFamily}; list-style-type: ${props.listStyleType};" class="space-y-2 ml-6">
    ${listItems.map(item => `<li>${item}</li>`).join('')}
  </${ListTag}>
</div>`;

      case 'quote':
        return `
<div style="background-color: ${props.bgColor}; border-left: 4px solid ${props.borderColor};" class="w-full ${props.padding} ${props.margin}">
  <blockquote style="color: ${props.textColor}; font-size: ${props.fontSize}px; font-style: ${props.fontStyle}; text-align: ${props.textAlign};" class="pl-4">
    "${props.quote}"
    ${props.author ? `<footer style="color: ${props.authorColor};" class="mt-2 text-sm">— ${props.author}</footer>` : ''}
  </blockquote>
</div>`;

      case 'code':
        return `
<div class="w-full ${props.margin}">
  <pre style="background-color: ${props.bgColor}; color: ${props.textColor}; font-size: ${props.fontSize}px; font-family: ${props.fontFamily};" class="${props.padding} ${props.borderRadius} overflow-x-auto">
    <code class="language-${props.language}">
${props.code}
    </code>
  </pre>
</div>`;

      case 'link':
        return `
<div style="background-color: ${props.bgColor};" class="w-full ${props.padding} ${props.margin}">
  <div style="text-align: ${props.textAlign};">
    <a href="${props.url}" target="${props.target}" style="color: ${props.textColor}; font-size: ${props.fontSize}px; font-weight: ${props.fontWeight}; text-decoration: ${props.textDecoration};" 
       onmouseover="this.style.color='${props.hoverColor}'" onmouseout="this.style.color='${props.textColor}'">
      ${props.text}
    </a>
  </div>
</div>`;

      case 'tabs':
        const tabList = props.tabs.split(',').map((tab: string) => tab.trim()).filter((tab: string) => tab);
        return `
<div style="background-color: ${props.bgColor};" class="w-full ${props.padding} ${props.margin}">
  <div class="border-b border-gray-200">
    <nav class="flex space-x-8">
      ${tabList.map((tab: string) => `
        <button onclick="showTab(${index})" id="tab-${index}" class="tab-button py-2 px-1 border-b-2 font-medium text-sm ${index === 0 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}" style="color: ${index === 0 ? props.activeTabColor : props.textColor}; background-color: ${index === 0 ? props.activeTabBg : 'transparent'};">
          ${tab}
        </button>
      `).join('')}
    </nav>
  </div>
  <div class="mt-4">
    ${tabList.map((tab: string, index: number) => `
      <div id="tab-content-${index}" class="tab-content ${index === 0 ? '' : 'hidden'}" style="color: ${props.textColor};">
        <p>Content for ${tab}</p>
      </div>
    `).join('')}
  </div>
  <script>
    function showTab(tabIndex) {
      // Hide all tab contents
      const contents = document.querySelectorAll('.tab-content');
      const buttons = document.querySelectorAll('.tab-button');
      
      contents.forEach(content => content.classList.add('hidden'));
      buttons.forEach(button => {
        button.style.color = '${props.textColor}';
        button.style.backgroundColor = 'transparent';
        button.classList.remove('border-blue-500', 'text-blue-600');
        button.classList.add('border-transparent', 'text-gray-500');
      });
      
      // Show selected tab content
      document.getElementById('tab-content-' + tabIndex).classList.remove('hidden');
      const activeButton = document.getElementById('tab-' + tabIndex);
      activeButton.style.color = '${props.activeTabColor}';
      activeButton.style.backgroundColor = '${props.activeTabBg}';
      activeButton.classList.add('border-blue-500', 'text-blue-600');
      activeButton.classList.remove('border-transparent', 'text-gray-500');
    }
  </script>
</div>`;

      case 'accordion':
        const accordionItems = props.items.split('\n').map((item: string) => item.trim()).filter((item: string) => item);
        return `
<div style="background-color: ${props.bgColor}; border-color: ${props.borderColor};" class="w-full ${props.padding} ${props.margin} border rounded-lg">
  ${accordionItems.map((item: string, index: number) => `
    <div class="border-b border-gray-200 last:border-b-0">
      <button onclick="toggleAccordion(${index})" class="w-full text-left py-4 px-6 flex justify-between items-center" style="background-color: ${props.headerBgColor}; color: ${props.textColor};">
        <span>${item}</span>
        <svg id="icon-${index}" class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div id="content-${index}" class="hidden px-6 pb-4" style="color: ${props.textColor};">
        <p>Content for ${item} section. This can be customized with your own content.</p>
      </div>
    </div>
  `).join('')}
  <script>
    function toggleAccordion(index) {
      const content = document.getElementById('content-' + index);
      const icon = document.getElementById('icon-' + index);
      
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
      }
    }
  </script>
</div>`;

      case 'form':
        const fieldList = props.fields.split(',').map((field: string) => field.trim()).filter((field: string) => field);
        return `
<div style="background-color: ${props.bgColor}; color: ${props.textColor};" class="w-full ${props.padding}">
  <div class="${props.maxWidth} mx-auto">
    <form class="space-y-4">
      <h2 class="text-2xl font-bold mb-6">${props.title}</h2>
      ${fieldList.map((field: string) => `
        <div class="space-y-2">
          <label class="block text-sm font-medium">${field}</label>
          <input type="${field.toLowerCase().includes('email') ? 'email' : field.toLowerCase().includes('password') ? 'password' : 'text'}" 
                 style="background-color: ${props.inputBgColor}; color: ${props.textColor};" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 placeholder="Enter your ${field.toLowerCase()}">
        </div>
      `).join('')}
      <button type="submit" style="background-color: ${props.buttonColor}; color: ${props.buttonTextColor};" 
              class="w-full py-2 px-4 rounded-md font-medium hover:opacity-90 transition-opacity">
        ${props.submitText}
      </button>
    </form>
  </div>
</div>`;

      case 'sidebar':
        return `
<div style="background-color: ${props.bgColor}; width: ${props.width};" class="h-screen p-4 shadow-lg float-left">
  <div class="mb-8">
    <h2 style="color: ${props.textColor};" class="text-xl font-bold">Dashboard</h2>
  </div>
  <nav class="space-y-2">
    <a href="#" style="color: ${props.activeColor}; background-color: ${props.activeColor}20;" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
      Dashboard
    </a>
    <a href="#" style="color: ${props.textColor};" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-all">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="m22 21-3-3m2.5 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z"/>
      </svg>
      Users
    </a>
    <a href="#" style="color: ${props.textColor};" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-all">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/>
        <line x1="3" x2="21" y1="10" y2="10"/>
      </svg>
      Analytics
    </a>
    <a href="#" style="color: ${props.textColor};" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-all">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l-.43-.25a2 2 0 0 1-1-1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      Settings
    </a>
  </nav>
</div>`;

      case 'image':
        return `
<div class="w-full py-4">
  <div class="container mx-auto px-4">
    <img src="${props.src}" alt="${props.alt}" style="width: ${props.width}; height: ${props.height}; object-fit: cover;" class="mx-auto rounded-lg shadow-lg" />
  </div>
</div>`;

      case 'button':
        const sizeClasses = {
          sm: 'px-3 py-1 text-sm',
          md: 'px-4 py-2 text-base',
          lg: 'px-6 py-3 text-lg',
          xl: 'px-8 py-4 text-xl'
        };
        const alignClasses = {
          left: 'justify-start',
          center: 'justify-center',
          right: 'justify-end'
        };
        return `
<div class="w-full py-4">
  <div class="container mx-auto px-4">
    <div class="flex ${alignClasses[props.alignment as keyof typeof alignClasses] || 'justify-center'}">
      <a href="${props.link}" style="background-color: ${props.bgColor}; color: ${props.textColor};" class="${sizeClasses[props.size as keyof typeof sizeClasses] || 'px-4 py-2 text-base'} rounded-md font-medium hover:opacity-90 inline-block">
        ${props.text}
      </a>
    </div>
  </div>
</div>`;

      case 'card':
        const cardShadowClasses = {
          none: '',
          sm: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);',
          md: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
          lg: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
          xl: 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);'
        };
        return `
<div class="w-full py-4">
  <div class="container mx-auto px-4">
    <div style="background-color: ${props.bgColor}; color: ${props.textColor}; border-color: ${props.borderColor}; ${cardShadowClasses[props.shadow as keyof typeof cardShadowClasses] || cardShadowClasses.md}" class="border rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-2">${props.title}</h3>
      <p class="text-sm opacity-80">${props.content}</p>
    </div>
  </div>
</div>`;

      case 'stats':
        return `
<div class="w-full py-4">
  <div class="container mx-auto px-4">
    <div style="background-color: ${props.bgColor}; color: ${props.textColor};" class="rounded-lg p-6 text-center shadow-md">
      <h4 class="text-sm font-medium mb-2 opacity-80">${props.title}</h4>
      <div style="color: ${props.valueColor};" class="text-3xl font-bold mb-1">${props.value}</div>
      <p class="text-xs opacity-60">${props.subtitle}</p>
    </div>
  </div>
</div>`;

      default:
        return '';
    }
  };

  const handleExportHTML = () => {
    const sortedComponents = components.sort((a, b) => a.order - b.order);
    
    const componentsHTML = sortedComponents.map(comp => {
      return generateComponentHTML(comp);
    }).join('\n');

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page - Generated by Page Builder</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Custom CSS */
        ${customCSS}
    </style>
</head>
<body class="m-0 p-0">
    <div class="page-container m-0 p-0">
${componentsHTML}
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
            
            // Form submission handling
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Form submitted! (This is a demo - integrate with your backend)');
                });
            });
        });
        
        // Custom JavaScript
        ${customJS}
    </script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.html';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "HTML berhasil diekspor!",
      description: "File HTML dengan custom CSS/JS siap digunakan dan telah didownload.",
    });
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-secondary/50 px-6 flex-shrink-0">
        <h1 className="text-lg font-semibold">Page Builder Pro</h1>
        <div className="ml-auto flex gap-2">
          <Button
            variant={showCustomCode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowCustomCode(!showCustomCode)}
          >
            <Code className="h-4 w-4 mr-2" />
            Custom Code
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportHTML}>
            <Download className="h-4 w-4 mr-2" />
            Export HTML
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel 
            defaultSize={20} 
            minSize={15} 
            maxSize={30}
            collapsible
            collapsedSize={0}
            onCollapse={() => setIsLeftPanelCollapsed(true)}
            onExpand={() => setIsLeftPanelCollapsed(false)}
            className={`transition-all duration-300 ${isLeftPanelCollapsed ? 'hidden' : 'block'}`}
          >
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <ComponentPalette 
                  onAddComponent={handleAddComponent} 
                  onSelectTemplate={handleSelectTemplate}
                />
              </div>
              {showCustomCode && (
                <div className="border-t flex-shrink-0">
                  <CustomCodeEditor
                    customCSS={customCSS}
                    customJS={customJS}
                    onSave={handleSaveCustomCode}
                  />
                </div>
              )}
            </div>
          </ResizablePanel>
          {!isLeftPanelCollapsed && <ResizableHandle withHandle />}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="relative h-full">
              {isLeftPanelCollapsed && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 left-2 z-10"
                  onClick={() => setIsLeftPanelCollapsed(false)}
                >
                  <PanelLeftOpen className="h-5 w-5" />
                </Button>
              )}
              
              <BuilderCanvas
                components={components}
                selectedComponentId={selectedComponentId}
                onSelectComponent={handleSelectComponent}
                onDeleteComponent={handleDeleteComponent}
                onResizeComponent={handleResizeComponent}
                onEditComponent={handleEditComponent}
                onMoveComponent={handleMoveComponent}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full overflow-hidden">
              <ScrollArea className="h-full">
                <ComponentEditor
                  component={selectedComponent}
                  onPropChange={handlePropChange}
                  onDeleteComponent={handleDeleteComponent}
                />
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default PageBuilder;

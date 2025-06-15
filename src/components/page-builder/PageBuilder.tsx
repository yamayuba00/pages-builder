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
      gridStart: 0,
      gridEnd: 11,
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
    
    toast({
      title: "Komponen ditambahkan!",
      description: `${config.name} berhasil ditambahkan ke halaman.`,
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

  const handleResizeComponent = (id: string, gridStart: number, gridEnd: number) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === id 
          ? { ...comp, gridStart, gridEnd }
          : comp
      )
    );
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
    const config = pageComponents[component.type];
    if (!config) return '';

    const props = component.props;
    
    switch (component.type) {
      case 'navbar':
        return `
<nav style="background-color: ${props.bgColor};" class="px-4 lg:px-6 h-14 flex items-center shadow-md">
  <a href="#" class="flex items-center justify-center">
    <svg class="h-6 w-6" style="color: ${props.linkColor};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4l4 4"/>
    </svg>
    <span class="sr-only">Page Builder Inc</span>
  </a>
  <div class="ml-auto flex gap-4 sm:gap-6">
    <a href="#" style="color: ${props.linkColor};" class="text-sm font-medium hover:underline">Fitur</a>
    <a href="#" style="color: ${props.linkColor};" class="text-sm font-medium hover:underline">Harga</a>
    <a href="#" style="color: ${props.linkColor};" class="text-sm font-medium hover:underline">Tentang</a>
    <a href="#" style="color: ${props.linkColor};" class="text-sm font-medium hover:underline">Kontak</a>
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
        const shadowClasses = {
          none: '',
          sm: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);',
          md: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
          lg: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
          xl: 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);'
        };
        return `
<div class="w-full py-4">
  <div class="container mx-auto px-4">
    <div style="background-color: ${props.bgColor}; color: ${props.textColor}; border-color: ${props.borderColor}; ${shadowClasses[props.shadow as keyof typeof shadowClasses] || shadowClasses.md}" class="border rounded-lg p-6">
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

      case 'grid':
        const gridCols = {
          '1': 'grid-template-columns: repeat(1, minmax(0, 1fr));',
          '2': 'grid-template-columns: repeat(2, minmax(0, 1fr));',
          '3': 'grid-template-columns: repeat(3, minmax(0, 1fr));',
          '4': 'grid-template-columns: repeat(4, minmax(0, 1fr));',
          '6': 'grid-template-columns: repeat(6, minmax(0, 1fr));',
          '12': 'grid-template-columns: repeat(12, minmax(0, 1fr));'
        };
        const gaps = {
          '2': '0.5rem',
          '4': '1rem',
          '6': '1.5rem',
          '8': '2rem'
        };
        return `
<div style="background-color: ${props.bgColor};" class="w-full ${props.padding}">
  <div class="${props.maxWidth} mx-auto">
    <div style="display: grid; ${gridCols[props.columns as keyof typeof gridCols] || gridCols['3']} gap: ${gaps[props.gap as keyof typeof gaps] || '1rem'};">
      ${Array.from({ length: parseInt(props.columns) }, (_, i) => `
        <div class="bg-gray-100 p-4 rounded-lg" style="min-height: 8rem; display: flex; align-items: center; justify-content: center;">
          <span class="text-gray-500">Grid Item ${i + 1}</span>
        </div>
      `).join('')}
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
      const start = comp.gridStart || 0;
      const end = comp.gridEnd || 11;
      const span = end - start + 1;
      const startCol = start + 1;
      
      return `  <div class="col-start-${startCol} col-span-${span}">
${generateComponentHTML(comp)}
  </div>`;
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
        
        /* Grid Classes */
        ${Array.from({ length: 12 }, (_, i) => {
          const col = i + 1;
          return `.col-start-${col} { grid-column-start: ${col}; }
.col-span-${col} { grid-column: span ${col} / span ${col}; }`;
        }).join('\n        ')}
        
        /* Custom CSS */
        ${customCSS}
    </style>
</head>
<body>
    <div class="grid grid-cols-12 gap-4">
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
      <header className="flex h-14 items-center gap-4 border-b bg-secondary/50 px-6">
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
      <div className="flex-grow">
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
              <ScrollArea className="flex-1">
                <ComponentPalette onAddComponent={handleAddComponent} />
              </ScrollArea>
              {showCustomCode && (
                <div className="border-t">
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
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ScrollArea className="h-full">
              <ComponentEditor
                component={selectedComponent}
                onPropChange={handlePropChange}
              />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default PageBuilder;

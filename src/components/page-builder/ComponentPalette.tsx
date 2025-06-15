
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layout, Type, Image, Square, BarChart3, Table, Sidebar, Layers, FileText, CreditCard, MessageSquare, Star, DollarSign, HelpCircle, Mail, Minus, Container, Columns, Hash, Heading, Quote, Code, Link2, ChevronDown, Grid, Sparkles } from 'lucide-react';
import { ComponentType } from '@/lib/page-builder-types';

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType) => void;
  onSelectTemplate: (templateId: string) => void;
  onShowAIGenerator: () => void;
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ 
  onAddComponent, 
  onSelectTemplate, 
  onShowAIGenerator 
}) => {
  const [activeTab, setActiveTab] = useState<'components' | 'templates'>('components');

  const componentCategories = [
    {
      name: 'Layout',
      icon: Layout,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100/80',
      hoverColor: 'hover:bg-blue-200/60',
      components: [
        { type: 'navbar' as ComponentType, name: 'Navigation', icon: Layout },
        { type: 'container' as ComponentType, name: 'Container', icon: Container },
        { type: 'row' as ComponentType, name: 'Row', icon: Minus },
        { type: 'column' as ComponentType, name: 'Column', icon: Columns },
        { type: 'grid' as ComponentType, name: 'Grid Layout', icon: Grid },
        { type: 'spacer' as ComponentType, name: 'Spacer', icon: Minus },
        { type: 'sidebar' as ComponentType, name: 'Sidebar', icon: Sidebar },
      ]
    },
    {
      name: 'Content',
      icon: Type,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100/80',
      hoverColor: 'hover:bg-emerald-200/60',
      components: [
        { type: 'hero' as ComponentType, name: 'Hero Section', icon: Square },
        { type: 'heading' as ComponentType, name: 'Heading', icon: Heading },
        { type: 'paragraph' as ComponentType, name: 'Paragraph', icon: Type },
        { type: 'text' as ComponentType, name: 'Text Block', icon: Type },
        { type: 'list' as ComponentType, name: 'List', icon: Hash },
        { type: 'quote' as ComponentType, name: 'Quote', icon: Quote },
        { type: 'code' as ComponentType, name: 'Code Block', icon: Code },
        { type: 'link' as ComponentType, name: 'Link', icon: Link2 },
      ]
    },
    {
      name: 'Interactive',
      icon: Square,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100/80',
      hoverColor: 'hover:bg-purple-200/60',
      components: [
        { type: 'button' as ComponentType, name: 'Button', icon: Square },
        { type: 'form' as ComponentType, name: 'Form', icon: FileText },
        { type: 'tabs' as ComponentType, name: 'Tabs', icon: Layers },
        { type: 'accordion' as ComponentType, name: 'Accordion', icon: ChevronDown },
      ]
    },
    {
      name: 'Media & Data',
      icon: Image,
      color: 'text-orange-700',
      bgColor: 'bg-orange-100/80',
      hoverColor: 'hover:bg-orange-200/60',
      components: [
        { type: 'image' as ComponentType, name: 'Image', icon: Image },
        { type: 'card' as ComponentType, name: 'Card', icon: Square },
        { type: 'stats' as ComponentType, name: 'Statistics', icon: BarChart3 },
        { type: 'table' as ComponentType, name: 'Table', icon: Table },
      ]
    }
  ];

  const templates = [
    { 
      id: 'landing-page', 
      name: 'Landing Page', 
      description: 'Complete landing page with navbar, hero, and sections',
      icon: Layout,
      color: 'text-blue-600'
    },
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      description: 'Admin dashboard with sidebar and stats',
      icon: BarChart3,
      color: 'text-green-600'
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio', 
      description: 'Personal portfolio showcase',
      icon: Star,
      color: 'text-purple-600'
    },
    { 
      id: 'blog', 
      name: 'Blog Layout', 
      description: 'Blog post layout with articles',
      icon: FileText,
      color: 'text-orange-600'
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Header with Tabs */}
      <div className="flex-shrink-0 border-b bg-blue-50/90 shadow-sm backdrop-blur-sm">
        <div className="flex">
          <Button
            variant={activeTab === 'components' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('components')}
            className="flex-1 rounded-none border-r border-blue-200/50"
          >
            <Layout className="h-4 w-4 mr-2" />
            Components
          </Button>
          <Button
            variant={activeTab === 'templates' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('templates')}
            className="flex-1 rounded-none"
          >
            <Layers className="h-4 w-4 mr-2" />
            Templates
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {activeTab === 'components' ? (
              <>
                {componentCategories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <div className={`flex items-center gap-2 p-2 rounded-lg ${category.bgColor} border border-blue-200/30`}>
                      <category.icon className={`h-4 w-4 ${category.color}`} />
                      <h3 className={`font-semibold text-sm ${category.color}`}>{category.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pl-2">
                      {category.components.map((comp) => (
                        <Button
                          key={comp.type}
                          variant="ghost"
                          size="sm"
                          onClick={() => onAddComponent(comp.type)}
                          className={`h-auto p-3 flex items-center gap-3 text-left justify-start bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-300/50 border border-blue-200/30 transition-all duration-200`}
                        >
                          <comp.icon className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">{comp.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* AI Generator Coming Soon */}
                <div className="border-t border-blue-200/50 pt-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-100/80 via-indigo-50/90 to-purple-100/80 rounded-xl p-4 border border-blue-200/40">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-sm text-blue-800">AI Component Generator</h3>
                      <span className="px-2 py-1 bg-blue-200/60 text-blue-700 text-xs rounded-full font-medium">Coming Soon</span>
                    </div>
                    <p className="text-xs text-blue-700 mb-4 leading-relaxed">
                      Generate custom components with AI! Simply describe what you need and watch as intelligent algorithms create the perfect component for your page.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled 
                      className="w-full opacity-60 bg-blue-50/50 border-blue-300/50"
                    >
                      <Sparkles className="h-3 w-3 mr-2" />
                      Generate Component
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 text-blue-800">Ready-to-use Templates</h3>
                  <p className="text-sm text-blue-600">Jumpstart your project with professional templates</p>
                </div>
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    onClick={() => onSelectTemplate(template.id)}
                    className="w-full h-auto p-4 flex items-start gap-4 text-left bg-blue-50/50 hover:bg-blue-100/70 hover:border-blue-300/50 transition-all duration-200 border-blue-200/40"
                  >
                    <template.icon className={`h-6 w-6 ${template.color} flex-shrink-0 mt-1`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-blue-800 mb-1">{template.name}</h4>
                      <p className="text-xs text-blue-600 leading-relaxed">{template.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ComponentPalette;

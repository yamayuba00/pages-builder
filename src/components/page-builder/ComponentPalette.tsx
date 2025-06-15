
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
      components: [
        { type: 'image' as ComponentType, name: 'Image', icon: Image },
        { type: 'card' as ComponentType, name: 'Card', icon: Square },
        { type: 'stats' as ComponentType, name: 'Statistics', icon: BarChart3 },
        { type: 'table' as ComponentType, name: 'Table', icon: Table },
      ]
    }
  ];

  const templates = [
    { id: 'landing-page', name: 'Landing Page', description: 'Complete landing page with navbar, hero, and sections' },
    { id: 'dashboard', name: 'Dashboard', description: 'Admin dashboard with sidebar and stats' },
    { id: 'portfolio', name: 'Portfolio', description: 'Personal portfolio showcase' },
    { id: 'blog', name: 'Blog Layout', description: 'Blog post layout with articles' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 border-b bg-white">
        <div className="flex">
          <Button
            variant={activeTab === 'components' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('components')}
            className="flex-1 rounded-none"
          >
            Components
          </Button>
          <Button
            variant={activeTab === 'templates' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('templates')}
            className="flex-1 rounded-none"
          >
            Templates
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            {activeTab === 'components' ? (
              <div className="space-y-6">
                {componentCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon className="h-4 w-4 text-gray-600" />
                      <h3 className="font-semibold text-sm text-gray-800">{category.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {category.components.map((comp) => (
                        <Button
                          key={comp.type}
                          variant="outline"
                          size="sm"
                          onClick={() => onAddComponent(comp.type)}
                          className="h-auto p-3 flex items-center gap-3 text-left justify-start hover:bg-blue-50 hover:border-blue-200"
                        >
                          <comp.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{comp.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* AI Coming Soon Section */}
                <div className="border-t pt-4 mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <h3 className="font-semibold text-sm text-gray-800">AI Generator</h3>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      <span className="font-medium text-sm text-purple-700">Coming Soon</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      AI-powered component generation will be available soon. Generate layouts from simple descriptions!
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled 
                      className="w-full opacity-60"
                    >
                      <Sparkles className="h-3 w-3 mr-2" />
                      Generate with AI
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm mb-4 text-gray-800">Ready-to-use Templates</h3>
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    onClick={() => onSelectTemplate(template.id)}
                    className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left hover:bg-blue-50 hover:border-blue-200"
                  >
                    <span className="font-semibold text-sm text-gray-800">{template.name}</span>
                    <span className="text-xs text-gray-600">{template.description}</span>
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

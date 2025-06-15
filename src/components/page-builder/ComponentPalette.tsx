
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Layout, Type, Image, Square, BarChart3, Table, Sidebar, Layers, Trash2, FileText, CreditCard, MessageSquare, Star, DollarSign, HelpCircle, Mail, Minus } from 'lucide-react';
import { ComponentType } from '@/lib/page-builder-types';

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType) => void;
  onSelectTemplate: (templateId: string) => void;
}

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onAddComponent, onSelectTemplate }) => {
  const [activeTab, setActiveTab] = useState<'components' | 'templates'>('components');

  const componentCategories = [
    {
      name: 'Layout',
      icon: Layout,
      components: [
        { type: 'navbar' as ComponentType, name: 'Navigation', icon: Layout },
        { type: 'hero' as ComponentType, name: 'Hero Section', icon: Square },
        { type: 'sidebar' as ComponentType, name: 'Sidebar', icon: Sidebar },
        { type: 'footer' as ComponentType, name: 'Footer', icon: Minus },
      ]
    },
    {
      name: 'Content',
      icon: Type,
      components: [
        { type: 'text' as ComponentType, name: 'Text Block', icon: Type },
        { type: 'image' as ComponentType, name: 'Image', icon: Image },
        { type: 'card' as ComponentType, name: 'Card', icon: Square },
        { type: 'testimonial' as ComponentType, name: 'Testimonial', icon: MessageSquare },
      ]
    },
    {
      name: 'Interactive',
      icon: Square,
      components: [
        { type: 'button' as ComponentType, name: 'Button', icon: Square },
        { type: 'form' as ComponentType, name: 'Form', icon: FileText },
        { type: 'contact' as ComponentType, name: 'Contact Form', icon: Mail },
      ]
    },
    {
      name: 'Data',
      icon: BarChart3,
      components: [
        { type: 'stats' as ComponentType, name: 'Statistics', icon: BarChart3 },
        { type: 'table' as ComponentType, name: 'Table', icon: Table },
        { type: 'pricing' as ComponentType, name: 'Pricing Card', icon: CreditCard },
      ]
    },
    {
      name: 'Custom',
      icon: Layers,
      components: [
        { type: 'divider' as ComponentType, name: 'Divider', icon: Minus },
        { type: 'faq' as ComponentType, name: 'FAQ Section', icon: HelpCircle },
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
    <div className="h-full flex flex-col bg-secondary/30">
      <div className="flex-shrink-0 border-b">
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
                      <category.icon className="h-4 w-4" />
                      <h3 className="font-medium text-sm">{category.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.components.map((comp) => (
                        <Button
                          key={comp.type}
                          variant="outline"
                          size="sm"
                          onClick={() => onAddComponent(comp.type)}
                          className="h-auto p-3 flex flex-col items-center gap-2 text-xs hover:bg-accent"
                        >
                          <comp.icon className="h-4 w-4" />
                          <span className="text-center leading-tight">{comp.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-medium text-sm mb-4">Ready-to-use Templates</h3>
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    onClick={() => onSelectTemplate(template.id)}
                    className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left hover:bg-accent"
                  >
                    <span className="font-medium text-sm">{template.name}</span>
                    <span className="text-xs text-muted-foreground">{template.description}</span>
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

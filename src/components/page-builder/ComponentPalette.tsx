
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Layout, Type, Image, Menu, Grid, CreditCard, MousePointer, BarChart, Table, Sidebar, TrendingUp, Header, Minus, Quote, DollarSign, HelpCircle, Mail } from 'lucide-react';
import { ComponentType } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType) => void;
  onSelectTemplate?: (templateId: string) => void;
}

const componentIcons: Record<ComponentType, any> = {
  navbar: Menu,
  hero: Layout,
  text: Type,
  image: Image,
  grid: Grid,
  card: CreditCard,
  button: MousePointer,
  table: Table,
  chart: BarChart,
  sidebar: Sidebar,
  header: Header,
  footer: Layout,
  form: Type,
  list: Type,
  divider: Minus,
  stats: TrendingUp,
  testimonial: Quote,
  pricing: DollarSign,
  faq: HelpCircle,
  contact: Mail,
};

const categories = [
  { id: 'all', name: 'Semua' },
  { id: 'template', name: 'Template' },
  { id: 'layout', name: 'Layout' },
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'content', name: 'Konten' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'form', name: 'Form' },
];

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onAddComponent, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredComponents = Object.entries(pageComponents).filter(([type, config]) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'template') return false; // Templates handled separately
    return config.category === selectedCategory;
  });

  const templates = [
    { id: 'landing-page', name: 'Landing Page', description: 'Navbar + Hero + Content' },
    { id: 'dashboard', name: 'Dashboard', description: 'Sidebar + Stats + Table' },
    { id: 'portfolio', name: 'Portfolio', description: 'Header + Gallery + Contact' },
    { id: 'blog', name: 'Blog', description: 'Navbar + Article + Sidebar' },
    { id: 'ecommerce', name: 'E-Commerce', description: 'Navbar + Products + Pricing' },
    { id: 'corporate', name: 'Corporate', description: 'Header + About + Testimonials' },
  ];

  return (
    <div className="flex flex-col h-full bg-secondary/50">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Komponen</h2>
        
        {/* Category Filter */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {selectedCategory === 'template' ? (
          /* Templates List */
          <div className="space-y-3">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-2 mb-2">
                  <Layout className="h-4 w-4 mt-0.5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{template.name}</h3>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => onSelectTemplate?.(template.id)}
                >
                  Gunakan Template
                </Button>
              </div>
            ))}
          </div>
        ) : (
          /* Components List */
          <div className="space-y-2">
            {filteredComponents.map(([type, config]) => {
              const IconComponent = componentIcons[type as ComponentType] || Layout;
              return (
                <Button
                  key={type}
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm hover:bg-primary/10"
                  onClick={() => onAddComponent(type as ComponentType)}
                >
                  <Plus className="h-3 w-3" />
                  <IconComponent className="h-3 w-3" />
                  {config.name}
                </Button>
              );
            })}
          </div>
        )}

        {selectedCategory !== 'template' && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Tips:</strong> Klik komponen untuk menambahkannya ke canvas. 
              Komponen dapat dikustomisasi sepenuhnya melalui panel editor di sebelah kanan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentPalette;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Layout, Type, Image, Menu, Grid, CreditCard, MousePointer, BarChart, Table, Sidebar, TrendingUp } from 'lucide-react';
import { ComponentType } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType) => void;
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
  header: Layout,
  footer: Layout,
  form: Type,
  list: Type,
  divider: Type,
  stats: TrendingUp,
  testimonial: Type,
  pricing: CreditCard,
  faq: Type,
  contact: Type,
};

const categories = [
  { id: 'all', name: 'Semua' },
  { id: 'layout', name: 'Layout' },
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'content', name: 'Konten' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'form', name: 'Form' },
];

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onAddComponent }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredComponents = Object.entries(pageComponents).filter(([type, config]) => {
    if (selectedCategory === 'all') return true;
    return config.category === selectedCategory;
  });

  return (
    <div className="flex flex-col h-full bg-secondary/50 p-4">
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
      
      {/* Components List */}
      <div className="space-y-2 overflow-y-auto custom-scrollbar">
        {filteredComponents.map(([type, config]) => {
          const IconComponent = componentIcons[type as ComponentType] || Layout;
          return (
            <Button
              key={type}
              variant="outline"
              className="w-full justify-start gap-2 text-sm"
              onClick={() => onAddComponent(type as ComponentType)}
            >
              <Plus className="h-3 w-3" />
              <IconComponent className="h-3 w-3" />
              {config.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentPalette;

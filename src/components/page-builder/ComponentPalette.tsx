
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Layout, Type, Image, Menu } from 'lucide-react';
import { ComponentType } from '@/lib/page-builder-types';

interface ComponentPaletteProps {
  onAddComponent: (type: ComponentType) => void;
}

const componentTypes = [
  { type: 'navbar' as ComponentType, name: 'Navbar', icon: Menu },
  { type: 'hero' as ComponentType, name: 'Hero Section', icon: Layout },
  { type: 'text' as ComponentType, name: 'Text Block', icon: Type },
  { type: 'image' as ComponentType, name: 'Image', icon: Image },
];

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onAddComponent }) => {
  return (
    <div className="flex flex-col h-full bg-secondary/50 p-4">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Komponen</h2>
      <div className="space-y-2">
        {componentTypes.map((component) => {
          const IconComponent = component.icon;
          return (
            <Button
              key={component.type}
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => onAddComponent(component.type)}
            >
              <Plus className="h-4 w-4" />
              <IconComponent className="h-4 w-4" />
              {component.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentPalette;

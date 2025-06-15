
import React from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ComponentEditorProps {
  component: PageComponent | null;
  onPropChange: (componentId: string, key: string, value: any) => void;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component, onPropChange }) => {
  if (!component) {
    return (
      <div className="p-4 h-full bg-secondary/50">
        <h2 className="text-lg font-semibold text-foreground">Editor Komponen</h2>
        <p className="text-sm text-muted-foreground mt-2">Pilih komponen untuk mengedit properti.</p>
      </div>
    );
  }

  const config = pageComponents[component.type];
  if (!config) return null;

  return (
    <div className="p-4 h-full bg-secondary/50 overflow-y-auto custom-scrollbar">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Edit {config.name}
      </h2>
      <div className="space-y-4">
        {config.propsConfig.map((propConfig) => (
          <div key={propConfig.key} className="grid w-full items-center gap-1.5">
            <Label htmlFor={propConfig.key} className="text-sm font-medium text-foreground">
              {propConfig.label}
            </Label>
            {propConfig.type === 'color' ? (
              <div className="relative">
                <Input
                  id={propConfig.key}
                  type="color"
                  value={component.props[propConfig.key]}
                  onChange={(e) => onPropChange(component.id, propConfig.key, e.target.value)}
                  className="p-0 w-full h-10 border-0 cursor-pointer"
                />
                <div 
                  className="absolute inset-y-0 left-0 w-full h-full rounded-md pointer-events-none border border-input flex items-center justify-end px-3"
                  style={{ backgroundColor: component.props[propConfig.key] }}
                >
                  <span className="text-xs mix-blend-difference text-white">
                    {component.props[propConfig.key]}
                  </span>
                </div>
              </div>
            ) : propConfig.type === 'textarea' ? (
              <Textarea
                id={propConfig.key}
                value={component.props[propConfig.key]}
                onChange={(e) => onPropChange(component.id, propConfig.key, e.target.value)}
                placeholder={`Masukkan ${propConfig.label.toLowerCase()}`}
                rows={4}
              />
            ) : (
              <Input
                id={propConfig.key}
                type="text"
                value={component.props[propConfig.key]}
                onChange={(e) => onPropChange(component.id, propConfig.key, e.target.value)}
                placeholder={`Masukkan ${propConfig.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentEditor;


import React from 'react';
import { Template } from '@/lib/templates';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DynamicEditorProps {
  template: Template | null;
  props: Record<string, any>;
  onPropChange: (key: string, value: any) => void;
}

const DynamicEditor: React.FC<DynamicEditorProps> = ({ template, props, onPropChange }) => {
  if (!template) {
    return (
      <div className="p-4 h-full bg-secondary/50">
        <h2 className="text-lg font-semibold text-foreground">Editor Dinamis</h2>
        <p className="text-sm text-muted-foreground mt-2">Pilih template untuk melihat properti yang bisa diubah.</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-full bg-secondary/50 overflow-y-auto custom-scrollbar">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Editor Dinamis</h2>
      <div className="space-y-4">
        {template.propsConfig.map((config) => (
          <div key={config.key} className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={config.key} className="text-sm font-medium text-foreground">{config.label}</Label>
            {config.type === 'color' ? (
              <div className="relative">
                <Input
                  id={config.key}
                  type="color"
                  value={props[config.key]}
                  onChange={(e) => onPropChange(config.key, e.target.value)}
                  className="p-0 w-full h-10 border-0 cursor-pointer"
                />
                 <div 
                    className="absolute inset-y-0 left-0 w-full h-full rounded-md pointer-events-none border border-input flex items-center justify-end px-3"
                    style={{ backgroundColor: props[config.key] }}
                 >
                    <span className="text-xs mix-blend-difference text-white">{props[config.key]}</span>
                 </div>
              </div>
            ) : (
              <Input
                id={config.key}
                type="text"
                value={props[config.key]}
                onChange={(e) => onPropChange(config.key, e.target.value)}
                placeholder={`Masukkan ${config.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicEditor;

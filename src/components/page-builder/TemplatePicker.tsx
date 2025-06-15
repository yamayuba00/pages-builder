
import React from 'react';
import { Template, templates } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { LayoutTemplate } from 'lucide-react';

interface TemplatePickerProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplateId?: string;
}

const TemplatePicker: React.FC<TemplatePickerProps> = ({ onSelectTemplate, selectedTemplateId }) => {
  return (
    <div className="flex flex-col h-full bg-secondary/50 p-4">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Pilih Template</h2>
      <div className="flex-grow space-y-2 overflow-y-auto custom-scrollbar pr-2">
        {templates.map((template) => (
          <Button
            key={template.id}
            variant={selectedTemplateId === template.id ? 'default' : 'outline'}
            className="w-full justify-start gap-2"
            onClick={() => onSelectTemplate(template)}
          >
            <LayoutTemplate className="h-4 w-4" />
            {template.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TemplatePicker;

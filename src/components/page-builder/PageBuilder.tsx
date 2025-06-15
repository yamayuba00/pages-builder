
import React, { useState, useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import TemplatePicker from './TemplatePicker';
import LivePreview from './LivePreview';
import DynamicEditor from './DynamicEditor';
import { Template, templates } from '@/lib/templates';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PageBuilder: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [props, setProps] = useState<Record<string, any>>({});
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);

  useEffect(() => {
    if (templates.length > 0 && !selectedTemplate) {
        handleSelectTemplate(templates[0]);
    }
  }, [selectedTemplate]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setProps(template.defaultProps);
  };

  const handlePropChange = (key: string, value: any) => {
    setProps(prevProps => ({ ...prevProps, [key]: value }));
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col">
       <header className="flex h-14 items-center gap-4 border-b bg-secondary/50 px-6">
        <h1 className="text-lg font-semibold">Page Builder Pro</h1>
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
            <TemplatePicker onSelectTemplate={handleSelectTemplate} selectedTemplateId={selectedTemplate?.id} />
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
              <LivePreview template={selectedTemplate} props={props} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <DynamicEditor template={selectedTemplate} props={props} onPropChange={handlePropChange} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default PageBuilder;

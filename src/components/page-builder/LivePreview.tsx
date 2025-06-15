
import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Template } from '@/lib/templates';
import CodeViewer from './CodeViewer';

interface LivePreviewProps {
  template: Template | null;
  props: Record<string, any>;
}

const LivePreview: React.FC<LivePreviewProps> = ({ template, props }) => {
  if (!template) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <p className="text-muted-foreground">Pilih template dari panel kiri untuk memulai.</p>
      </div>
    );
  }

  const ComponentToRender = template.component;

  return (
    <ResizablePanelGroup direction="vertical" className="h-full">
      <ResizablePanel defaultSize={60} minSize={20}>
        <div className="h-full w-full overflow-auto bg-white custom-scrollbar">
          <ComponentToRender {...props} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40} minSize={20}>
        <div className="h-full p-1 bg-background">
            <CodeViewer code={template.code} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default LivePreview;

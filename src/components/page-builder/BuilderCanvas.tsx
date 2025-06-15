
import React from 'react';
import ResizableComponent from './ResizableComponent';
import { PageComponent } from '@/lib/page-builder-types';

interface BuilderCanvasProps {
  components: PageComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onResizeComponent: (id: string, gridStart: number, gridEnd: number) => void;
  onEditComponent: (id: string) => void;
}

const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onResizeComponent,
  onEditComponent
}) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Visual Grid Reference - Fixed Header */}
      <div className="bg-white border-b shadow-sm z-10 flex-shrink-0">
        <div className="grid grid-cols-12 gap-1 p-2">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="h-6 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-600"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Components Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white min-h-full">
          <div className="grid grid-cols-12 gap-4 p-4 relative">
            {components
              .sort((a, b) => a.order - b.order)
              .map((component) => (
                <ResizableComponent
                  key={component.id}
                  component={component}
                  isSelected={selectedComponentId === component.id}
                  onSelect={() => onSelectComponent(component.id)}
                  onDelete={() => onDeleteComponent(component.id)}
                  onResize={(gridStart, gridEnd) => onResizeComponent(component.id, gridStart, gridEnd)}
                  onEdit={() => onEditComponent(component.id)}
                />
              ))}
            
            {/* Empty State */}
            {components.length === 0 && (
              <div className="col-span-12 flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">Mulai membangun halaman Anda</p>
                  <p className="text-sm">Pilih komponen dari panel kiri untuk memulai</p>
                  <p className="text-xs mt-2 text-gray-400">Atau gunakan template siap pakai untuk memulai lebih cepat</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderCanvas;

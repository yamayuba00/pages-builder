
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
  // Generate grid cells for visual reference
  const gridCells = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="p-4">
        {/* Grid Visual Reference */}
        <div className="mb-4 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Grid 12 Kolom</h3>
          <div className="grid grid-cols-12 gap-1 mb-4">
            {gridCells.map((cell) => (
              <div
                key={cell}
                className="h-8 bg-blue-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-600"
              >
                {cell + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Components Container */}
        <div className="bg-white rounded-lg shadow-sm min-h-96">
          <div className="grid grid-cols-12 gap-4 p-4 relative">
            {components.map((component) => (
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
              <div className="col-span-12 flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">Mulai membangun halaman Anda</p>
                  <p className="text-sm">Pilih komponen dari panel kiri untuk memulai</p>
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

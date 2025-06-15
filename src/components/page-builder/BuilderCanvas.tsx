
import React from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import ResizableComponent from './ResizableComponent';

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
  const sortedComponents = components.sort((a, b) => a.order - b.order);

  // Group components by rows
  const rows: PageComponent[][] = [];
  let currentRow: PageComponent[] = [];
  let currentRowEnd = -1;

  sortedComponents.forEach(component => {
    const start = component.gridStart || 0;
    const end = component.gridEnd || 11;
    
    // If this component starts after the current row ends, start a new row
    if (start > currentRowEnd || currentRow.length === 0) {
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
      currentRow = [component];
      currentRowEnd = end;
    } else {
      // Add to current row if there's space
      currentRow.push(component);
      currentRowEnd = Math.max(currentRowEnd, end);
    }
  });
  
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <div className="p-4 min-h-96">
      {rows.length === 0 ? (
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Pilih komponen dari palette dan mulai membangun halaman Anda</p>
            <div className="grid grid-cols-12 gap-1 max-w-md mx-auto mt-4">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded text-xs flex items-center justify-center text-gray-400">
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Grid 12 kolom</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-12 gap-2 relative">
              {/* Grid indicators */}
              <div className="absolute -top-4 left-0 right-0 grid grid-cols-12 gap-2">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="h-2 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-400">
                    {i + 1}
                  </div>
                ))}
              </div>
              
              {row.map((component) => (
                <ResizableComponent
                  key={component.id}
                  component={component}
                  isSelected={selectedComponentId === component.id}
                  onSelect={() => onSelectComponent(component.id)}
                  onDelete={() => onDeleteComponent(component.id)}
                  onResize={(start, end) => onResizeComponent(component.id, start, end)}
                  onEdit={() => onEditComponent(component.id)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuilderCanvas;

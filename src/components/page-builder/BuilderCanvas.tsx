
import React from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Button } from '@/components/ui/button';
import { Trash2, Settings, ArrowUp, ArrowDown } from 'lucide-react';

interface BuilderCanvasProps {
  components: PageComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onResizeComponent: (id: string, gridStart: number, gridEnd: number) => void;
  onEditComponent: (id: string) => void;
  onMoveComponent?: (id: string, direction: 'up' | 'down') => void;
}

const BuilderCanvas: React.FC<BuilderCanvasProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onResizeComponent,
  onEditComponent,
  onMoveComponent
}) => {
  const handleMoveComponent = (id: string, direction: 'up' | 'down') => {
    if (onMoveComponent) {
      onMoveComponent(id, direction);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Scrollable Components Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="bg-white min-h-full">
          {components
            .sort((a, b) => a.order - b.order)
            .map((component) => {
              const config = pageComponents[component.type];
              if (!config) return null;

              const ComponentToRender = config.component;
              const isSelected = selectedComponentId === component.id;

              return (
                <div
                  key={component.id}
                  className={`relative group border-0 overflow-hidden bg-white hover:shadow-md transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'
                  } ${component.type === 'sidebar' ? 'h-96' : 'min-h-16'}`}
                  onClick={() => onSelectComponent(component.id)}
                  style={{ margin: 0, padding: 0 }}
                >
                  {/* Component Content - Remove any margins/padding */}
                  <div className={`${component.type === 'sidebar' ? 'h-full overflow-hidden' : ''} m-0 p-0`}>
                    <ComponentToRender {...component.props} />
                  </div>

                  {/* Hover Overlay */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                  )}

                  {/* Component Label */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {config.name}
                  </div>

                  {/* Selection Controls */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex gap-1 bg-white rounded-lg shadow-lg p-1 z-20">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveComponent(component.id, 'up');
                        }}
                        title="Move Up"
                      >
                        <ArrowUp className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveComponent(component.id, 'down');
                        }}
                        title="Move Down"
                      >
                        <ArrowDown className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditComponent(component.id);
                        }}
                        title="Edit Component"
                      >
                        <Settings className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteComponent(component.id);
                        }}
                        title="Delete Component"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          
          {/* Empty State */}
          {components.length === 0 && (
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg m-4">
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
  );
};

export default BuilderCanvas;

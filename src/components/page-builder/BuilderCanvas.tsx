
import React from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Button } from '@/components/ui/button';
import { Trash2, Settings, MoveUp, MoveDown } from 'lucide-react';

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
  const handleMoveComponent = (id: string, direction: 'up' | 'down') => {
    const currentIndex = components.findIndex(comp => comp.id === id);
    if (direction === 'up' && currentIndex > 0) {
      // Move up logic can be implemented if needed
    } else if (direction === 'down' && currentIndex < components.length - 1) {
      // Move down logic can be implemented if needed
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Scrollable Components Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white min-h-full p-4">
          <div className="space-y-4">
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
                    className={`relative group border rounded-lg overflow-hidden bg-white hover:shadow-md transition-all ${
                      isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'
                    } ${component.type === 'sidebar' ? 'h-96' : 'min-h-24'}`}
                    onClick={() => onSelectComponent(component.id)}
                  >
                    {/* Component Content */}
                    <div className={component.type === 'sidebar' ? 'h-full overflow-hidden' : ''}>
                      <ComponentToRender {...component.props} />
                    </div>

                    {/* Hover Overlay */}
                    {!isSelected && (
                      <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                    )}

                    {/* Component Label */}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {config.name}
                    </div>

                    {/* Selection Controls */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 flex gap-1 bg-white rounded-lg shadow-lg p-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveComponent(component.id, 'up');
                          }}
                          title="Move Up"
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveComponent(component.id, 'down');
                          }}
                          title="Move Down"
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditComponent(component.id);
                          }}
                          title="Edit Component"
                        >
                          <Settings className="h-4 w-4" />
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
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
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

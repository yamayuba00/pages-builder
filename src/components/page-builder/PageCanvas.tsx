
import React from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Button } from '@/components/ui/button';
import { Trash2, MoveUp, MoveDown } from 'lucide-react';

interface PageCanvasProps {
  components: PageComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onMoveComponent: (id: string, direction: 'up' | 'down') => void;
}

const PageCanvas: React.FC<PageCanvasProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onMoveComponent
}) => {
  return (
    <div className="h-full w-full overflow-auto bg-white">
      {components.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Tambahkan komponen dari panel kiri untuk memulai.</p>
        </div>
      ) : (
        <div className="min-h-full">
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
                  className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => onSelectComponent(component.id)}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveComponent(component.id, 'up');
                        }}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveComponent(component.id, 'down');
                        }}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteComponent(component.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <ComponentToRender {...component.props} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default PageCanvas;

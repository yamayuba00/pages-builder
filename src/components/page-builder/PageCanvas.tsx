
import React from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Button } from '@/components/ui/button';
import { Trash2, MoveUp, MoveDown, GripVertical } from 'lucide-react';

interface PageCanvasProps {
  components: PageComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onMoveComponent: (id: string, direction: 'up' | 'down') => void;
  onDragComponent?: (dragIndex: number, hoverIndex: number) => void;
}

const PageCanvas: React.FC<PageCanvasProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onMoveComponent,
  onDragComponent
}) => {
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex && onDragComponent) {
      onDragComponent(dragIndex, dropIndex);
    }
  };

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
            .map((component, index) => {
              const config = pageComponents[component.type];
              if (!config) return null;

              const ComponentToRender = config.component;
              const isSelected = selectedComponentId === component.id;

              return (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
                    component.type === 'sidebar' ? 'inline-block align-top' : 'block'
                  }`}
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
                        variant="secondary"
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="h-4 w-4" />
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

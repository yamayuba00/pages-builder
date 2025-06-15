
import React from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Button } from '@/components/ui/button';
import { Trash2, MoveUp, MoveDown, GripVertical } from 'lucide-react';

interface GridContainerProps {
  components: PageComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onMoveComponent: (id: string, direction: 'up' | 'down') => void;
}

const GridContainer: React.FC<GridContainerProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onMoveComponent
}) => {
  const getGridColClass = (startCol: number, endCol: number) => {
    const span = endCol - startCol + 1;
    const start = startCol + 1;
    return `col-start-${start} col-span-${span}`;
  };

  const sortedComponents = components.sort((a, b) => a.order - b.order);

  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-4 min-h-96">
        {sortedComponents.map((component) => {
          const config = pageComponents[component.type];
          if (!config) return null;

          const ComponentToRender = config.component;
          const isSelected = selectedComponentId === component.id;
          
          const gridClass = component.gridStart !== undefined && component.gridEnd !== undefined
            ? getGridColClass(component.gridStart, component.gridEnd)
            : 'col-span-12';

          return (
            <div
              key={component.id}
              className={`relative group ${gridClass} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => onSelectComponent(component.id)}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveComponent(component.id, 'up');
                    }}
                  >
                    <MoveUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveComponent(component.id, 'down');
                    }}
                  >
                    <MoveDown className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <GripVertical className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteComponent(component.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="min-h-24 border border-gray-200 rounded bg-white">
                <ComponentToRender {...component.props} />
              </div>
            </div>
          );
        })}
        
        {/* Empty grid indicators */}
        {components.length === 0 && (
          <div className="col-span-12 flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Pilih komponen dan klik grid untuk mulai membuat layout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridContainer;

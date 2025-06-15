
import React, { useState } from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Button } from '@/components/ui/button';
import { Trash2, Move, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface ResizableComponentProps {
  component: PageComponent;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onResize: (newGridStart: number, newGridEnd: number) => void;
  onEdit: () => void;
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onDelete,
  onResize,
  onEdit
}) => {
  const [isResizing, setIsResizing] = useState(false);
  
  const config = pageComponents[component.type];
  if (!config) return null;

  const ComponentToRender = config.component;
  const gridStart = component.gridStart || 0;
  const gridEnd = component.gridEnd || 11;
  const span = gridEnd - gridStart + 1;

  const handleResizeLeft = () => {
    if (gridStart > 0) {
      onResize(gridStart - 1, gridEnd);
    }
  };

  const handleResizeRight = () => {
    if (gridEnd < 11) {
      onResize(gridStart, gridEnd + 1);
    }
  };

  const handleShrinkLeft = () => {
    if (span > 1) {
      onResize(gridStart + 1, gridEnd);
    }
  };

  const handleShrinkRight = () => {
    if (span > 1) {
      onResize(gridStart, gridEnd - 1);
    }
  };

  const getGridColClass = () => {
    const start = gridStart + 1;
    return `col-start-${start} col-span-${span}`;
  };

  return (
    <div
      className={`relative group ${getGridColClass()} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      {/* Component Content */}
      <div className="min-h-24 border border-gray-200 rounded bg-white overflow-hidden">
        <ComponentToRender {...component.props} />
      </div>

      {/* Controls Overlay */}
      {isSelected && (
        <>
          {/* Top Controls */}
          <div className="absolute -top-10 left-0 right-0 flex justify-between items-center bg-blue-500 text-white px-2 py-1 rounded-t text-xs">
            <span className="font-medium">{config.name}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Settings className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white hover:bg-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Left Resize Handle */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 opacity-50 flex flex-col justify-center">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 mb-1 text-white hover:bg-blue-600"
              onClick={handleResizeLeft}
              disabled={gridStart <= 0}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-blue-600"
              onClick={handleShrinkLeft}
              disabled={span <= 1}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          {/* Right Resize Handle */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-blue-500 opacity-50 flex flex-col justify-center">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 mb-1 text-white hover:bg-blue-600"
              onClick={handleShrinkRight}
              disabled={span <= 1}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-blue-600"
              onClick={handleResizeRight}
              disabled={gridEnd >= 11}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          {/* Move Handle */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 cursor-move">
            <Move className="h-4 w-4 text-blue-500" />
          </div>

          {/* Grid Info */}
          <div className="absolute -bottom-6 left-0 text-xs text-blue-600 bg-white px-1 rounded">
            {span}/12 kolom
          </div>
        </>
      )}
    </div>
  );
};

export default ResizableComponent;

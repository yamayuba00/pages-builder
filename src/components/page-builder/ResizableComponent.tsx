
import React, { useState } from 'react';
import { PageComponent } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { Button } from '@/components/ui/button';
import { Trash2, Settings, ChevronLeft, ChevronRight, GripHorizontal } from 'lucide-react';

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
      className={`relative group ${getGridColClass()} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      onClick={onSelect}
    >
      {/* Component Content */}
      <div className="min-h-24 border border-gray-200 rounded bg-white overflow-hidden hover:shadow-md transition-shadow">
        <ComponentToRender {...component.props} />
      </div>

      {/* Controls Overlay */}
      {isSelected && (
        <>
          {/* Top Controls */}
          <div className="absolute -top-12 left-0 right-0 flex justify-between items-center bg-blue-500 text-white px-3 py-2 rounded-t text-sm z-20">
            <div className="flex items-center gap-2">
              <GripHorizontal className="h-4 w-4" />
              <span className="font-medium">{config.name}</span>
              <span className="text-xs opacity-75">({span}/12 kolom)</span>
            </div>
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
          <div className="absolute -left-2 top-0 bottom-0 w-4 flex flex-col justify-center z-10">
            <div className="bg-blue-500 rounded-l-lg p-1 opacity-80 hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 mb-1 text-white hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResizeLeft();
                }}
                disabled={gridStart <= 0}
                title="Expand Left"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShrinkLeft();
                }}
                disabled={span <= 1}
                title="Shrink Left"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Right Resize Handle */}
          <div className="absolute -right-2 top-0 bottom-0 w-4 flex flex-col justify-center z-10">
            <div className="bg-blue-500 rounded-r-lg p-1 opacity-80 hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 mb-1 text-white hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShrinkRight();
                }}
                disabled={span <= 1}
                title="Shrink Right"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResizeRight();
                }}
                disabled={gridEnd >= 11}
                title="Expand Right"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Quick Size Buttons */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 bg-white border rounded-lg p-1 shadow-lg z-20">
            {[1, 2, 3, 4, 6, 12].map((size) => (
              <Button
                key={size}
                size="sm"
                variant={span === size ? 'default' : 'ghost'}
                className="h-6 w-8 p-0 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onResize(gridStart, Math.min(gridStart + size - 1, 11));
                }}
              >
                {size}
              </Button>
            ))}
          </div>
        </>
      )}

      {/* Hover indicator */}
      {!isSelected && (
        <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded" />
      )}
    </div>
  );
};

export default ResizableComponent;

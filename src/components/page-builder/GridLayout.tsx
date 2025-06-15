
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ComponentType } from '@/lib/page-builder-types';

interface GridLayoutProps {
  onAddToGrid: (startCol: number, endCol: number, type: ComponentType) => void;
  selectedComponentType: ComponentType | null;
}

const GridLayout: React.FC<GridLayoutProps> = ({ onAddToGrid, selectedComponentType }) => {
  const [selectedStart, setSelectedStart] = React.useState<number | null>(null);
  const [hoveredEnd, setHoveredEnd] = React.useState<number | null>(null);

  const gridSizes = [
    { label: '1/12 (Narrow)', cols: 1 },
    { label: '2/12 (Small)', cols: 2 },
    { label: '3/12 (Quarter)', cols: 3 },
    { label: '4/12 (Third)', cols: 4 },
    { label: '6/12 (Half)', cols: 6 },
    { label: '8/12 (Two-thirds)', cols: 8 },
    { label: '9/12 (Three-quarters)', cols: 9 },
    { label: '12/12 (Full)', cols: 12 }
  ];

  const handleGridClick = (start: number, size: number) => {
    if (selectedComponentType) {
      onAddToGrid(start, start + size - 1, selectedComponentType);
    }
  };

  const renderGridCell = (index: number) => {
    const isSelected = selectedStart !== null && hoveredEnd !== null && 
                      index >= selectedStart && index <= hoveredEnd;
    
    return (
      <div
        key={index}
        className={`h-16 border border-gray-300 flex items-center justify-center text-xs font-medium cursor-pointer transition-all ${
          isSelected ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'
        }`}
        onMouseDown={() => setSelectedStart(index)}
        onMouseEnter={() => {
          if (selectedStart !== null) {
            setHoveredEnd(index);
          }
        }}
        onMouseUp={() => {
          if (selectedStart !== null && hoveredEnd !== null && selectedComponentType) {
            const start = Math.min(selectedStart, hoveredEnd);
            const end = Math.max(selectedStart, hoveredEnd);
            onAddToGrid(start, end, selectedComponentType);
            setSelectedStart(null);
            setHoveredEnd(null);
          }
        }}
      >
        {index + 1}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white border-b">
      <h3 className="text-lg font-semibold mb-4">Grid Layout (12 Kolom)</h3>
      
      {/* Quick Size Buttons */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Pilih ukuran cepat:</p>
        <div className="flex flex-wrap gap-2">
          {gridSizes.map((size) => (
            <Button
              key={size.cols}
              variant="outline"
              size="sm"
              disabled={!selectedComponentType}
              onClick={() => handleGridClick(0, size.cols)}
              className="text-xs"
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Visual Grid */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {selectedComponentType ? 
            `Klik dan drag untuk menempatkan ${selectedComponentType}:` : 
            'Pilih komponen dari palette terlebih dahulu'
          }
        </p>
        <div className="grid grid-cols-12 gap-1 max-w-4xl">
          {Array.from({ length: 12 }, (_, i) => renderGridCell(i))}
        </div>
      </div>

      {selectedComponentType && (
        <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
          <Plus className="inline h-4 w-4 mr-1" />
          Komponen terpilih: <strong>{selectedComponentType}</strong>
        </div>
      )}
    </div>
  );
};

export default GridLayout;

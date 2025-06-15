
import React from 'react';

interface TableBlockProps {
  title: string;
  headers: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export const TableBlockTemplate: React.FC<TableBlockProps> = ({
  title,
  headers,
  bgColor,
  textColor,
  borderColor
}) => {
  const headerList = headers.split(',').map(h => h.trim());
  
  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4">
        <h3 style={{ color: textColor }} className="text-lg font-semibold mb-4">{title}</h3>
        <div 
          style={{ backgroundColor: bgColor, borderColor: borderColor }} 
          className="border rounded-lg overflow-hidden shadow-md"
        >
          <table className="w-full">
            <thead style={{ backgroundColor: borderColor }}>
              <tr>
                {headerList.map((header, index) => (
                  <th key={index} style={{ color: textColor }} className="px-4 py-3 text-left text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }, (_, rowIndex) => (
                <tr key={rowIndex} className="border-t" style={{ borderColor: borderColor }}>
                  {headerList.map((_, colIndex) => (
                    <td key={colIndex} style={{ color: textColor }} className="px-4 py-3 text-sm">
                      Data {rowIndex + 1}-{colIndex + 1}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

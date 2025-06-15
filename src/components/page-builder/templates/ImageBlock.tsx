
import React from 'react';

interface ImageBlockProps {
  src: string;
  alt: string;
  width: string;
  height: string;
}

export const ImageBlockTemplate: React.FC<ImageBlockProps> = ({
  src,
  alt,
  width,
  height
}) => {
  return (
    <div className="w-full py-4">
      <div className="container mx-auto px-4">
        <img
          src={src}
          alt={alt}
          style={{ 
            width: width,
            height: height,
            objectFit: 'cover'
          }}
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

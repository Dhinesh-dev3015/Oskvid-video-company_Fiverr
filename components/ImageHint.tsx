import React, { useRef, useEffect, useState } from 'react';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageDiffCanvasProps {
  draftImageUrl: string;
  diffBoxes: BoundingBox[];
  // New prop: Index of the box to zoom into. Use -1 or null for the default (full page) view.
  activeBoxIndex: number | null; 
  zoomPadding: number; // Padding around the box in pixels (e.g., 50)
}

/**
 * Renders the draft page image on a canvas, either full-page or zoomed into an active box.
 */
export default function ImageHint({ 
  draftImageUrl, 
  diffBoxes, 
  activeBoxIndex, 
  zoomPadding
}: ImageDiffCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState<{ width: number, height: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    // img.crossOrigin = "anonymous"; 
    img.src = draftImageUrl;

    img.onload = () => {
      // Store the original image size once
      setImageSize({ width: img.width, height: img.height });

      // --- 1. Determine the Source (S) and Destination (D) Coordinates ---
      let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height; // Source (Image) coordinates
      let dx = 0, dy = 0, dWidth = img.width, dHeight = img.height; // Destination (Canvas) coordinates
      
      const activeBox = activeBoxIndex !== null && activeBoxIndex >= 0 && activeBoxIndex < diffBoxes.length 
                        ? diffBoxes[activeBoxIndex] 
                        : null;

      if (activeBox) {
        // Calculate the zoomed view area (Source coordinates)
        sx = Math.max(0, activeBox.x - zoomPadding);
        sy = Math.max(0, activeBox.y - zoomPadding);
        sWidth = activeBox.width + 2 * zoomPadding;
        sHeight = activeBox.height + 2 * zoomPadding;

        // Ensure we don't zoom past the original image boundaries
        if (sx + sWidth > img.width) sWidth = img.width - sx;
        if (sy + sHeight > img.height) sHeight = img.height - sy;
        
        // When zoomed, the canvas should show only the zoomed region
        canvas.width = sWidth;
        canvas.height = sHeight;
        
        // The destination size (dWidth/dHeight) is the same as the canvas size (sWidth/sHeight)
        dWidth = sWidth;
        dHeight = sHeight;
      } else {
        // Full Page View
        canvas.width = img.width;
        canvas.height = img.height;
      }

      // --- 2. Draw the Image ---
      // The 9-argument drawImage method: drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      // --- 3. Draw the Highlighted Diff Boxes ---
      
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = 'rgba(255, 193, 7, 0.5)';
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.lineWidth = 2;

      diffBoxes.forEach((box, index) => {
        // Only draw the box if we are zoomed in on it, or if we are in the full view
        if (activeBox === null || index === activeBoxIndex) {
          
          // Calculate the box's position relative to the current canvas viewport (sx, sy)
          const relativeX = box.x - sx;
          const relativeY = box.y - sy;
          
          // Draw the filled highlight box
          ctx.fillRect(relativeX, relativeY, box.width, box.height);
          
          // Draw the border
          ctx.strokeRect(relativeX, relativeY, box.width, box.height);
        }
      });
      
      ctx.globalAlpha = 1.0;
    };

  }, [draftImageUrl, diffBoxes, activeBoxIndex, zoomPadding]); // Dependencies for re-run

  return (
    <div className='block h-50 w-50 absolute flex flex-col justify-center items-center z-[500]'>
      {!imageSize && <p>Loading draft image... {draftImageUrl}</p>}
      <canvas className='stretch object-fit' ref={canvasRef} />
      {/* Optional: Add navigation controls here to change activeBoxIndex */}
    </div>
  );
}
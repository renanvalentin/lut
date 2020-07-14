import React, { useState, useRef, useCallback } from 'react';
import { useDeepCompareEffect } from 'react-use';
import isEqual from 'lodash/isEqual';
import throttle from 'lodash/throttle';
import { ColorModel } from './ColorModel';

interface Props {
  id: string;
  colorReference: ColorModel[];
  colors: ColorModel[];
  onChange: (image: string, id: string) => void;
}

export function GenerateCanvas({
  id,
  colorReference,
  colors,
  onChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const delayedTrigger = useRef(throttle(onChange, 300));

  useDeepCompareEffect(() => {
    const canvasObj = canvasRef.current;

    if (!canvasObj) return;

    const ctx = canvasObj.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);

    colorReference.forEach((reference, i) => {
      const color = colors[i];
      const rgba = color.toRgba();
      const grayscale = reference.toGrayscale();

      ctx.beginPath();

      ctx.fillStyle = rgba;
      ctx.fillRect(grayscale, 0, 5, canvasObj.height);

      ctx.stroke();
    });

    delayedTrigger.current(canvasObj.toDataURL('image/png'), id);
  }, [colors.map((c) => c.data)]);

  return (
    <>
      <canvas ref={canvasRef} style={{ height: '32px', width: '256px' }} />
    </>
  );
}

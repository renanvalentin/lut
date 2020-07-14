import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { ColorModel } from './ColorModel';
import { Color } from './Color';

interface State {
  imagePreview?: string;
  grayscaledPreview?: string;
  originalColors: number[];
  grayscaledColors: number[];
  remap: Map<string, number>;
}

const initialState: State = {
  originalColors: [],
  grayscaledColors: [],
  remap: new Map(),
};

interface Props {
  id: string;
  colors: ColorModel[];
  onChange: (color: ColorModel, id: string, index: number) => void;
}

export function Palette({ id, colors, onChange }: Props) {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        {id}
        <Color
          color={new ColorModel([255, 255, 255, 1])}
          picker
          onChange={(c) => {
            colors.map((_, index) => onChange(c, id, index));
          }}
        />
      </Box>
      <Box display="flex">
        {colors.map((color, index) => (
          <Color
            key={`color:${id}:${String(index)}`}
            color={color}
            picker
            onChange={(c) => onChange(c, id, index)}
          />
        ))}
      </Box>
    </>
  );
}

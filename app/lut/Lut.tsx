import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';

import { FileUpload } from './FileUpload';
import { Thumb } from './Thumb';
import { Palette } from './Palette';
import { ColorModel } from './ColorModel';
import { ImageProcessing } from './ImageProcessing';
import { Color } from './Color';
import { PalettesModel, palettes } from './PalettesModel';
import { PersistSystem } from './PersistSystem';
import { AppState } from './types';

const initialState: AppState = PersistSystem.load();

export function Lut() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    PersistSystem.save(state);
  }, [state]);

  async function setColorPalette(preview: string) {
    const grayscaledColor = await ImageProcessing.toGrayscale(preview);

    const extractedPalette = await ImageProcessing.extractPalette(preview);

    const colors = extractedPalette.map((color) => new ColorModel(color));

    setState((s) => ({
      ...s,
      imagePreview: preview,
      grayscaledPreview: grayscaledColor,
      originalColors: colors,
      paletteMap: new PalettesModel([...colors]),
    }));
  }

  function updatePalette(color: ColorModel, id: string, index: number) {
    const { paletteMap } = state;

    paletteMap.update(color, id, index);

    setState((s) => ({ ...s, paletteMap }));
  }

  return (
    <>
      <FileUpload onChange={setColorPalette} />
      <Box display="flex">
        <Thumb preview={state.imagePreview} />
        <Thumb preview={state.grayscaledPreview} />
      </Box>

      <Box display="flex">
        {state.originalColors.map((color) => (
          <Box
            width={40}
            height={80}
            key={`lut:${color.toHex()}`}
            display="flex"
            flexDirection="column"
          >
            <Color color={color} />

            <Color color={ColorModel.createAsGrayscale(color)} />
          </Box>
        ))}
      </Box>

      {palettes.map((id) => {
        return (
          <Box key={`palette:${id}`} mt={4}>
            <Palette
              id={id}
              colors={state.paletteMap.getColorsById(id)}
              onChange={updatePalette}
            />
          </Box>
        );
      })}
    </>
  );
}

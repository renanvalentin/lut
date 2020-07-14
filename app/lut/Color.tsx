import React, { useState } from 'react';
import Box from '@material-ui/core/Box';

import { SketchPicker } from 'react-color';
import OutsideClickHandler from 'react-outside-click-handler';

import { ColorModel } from './ColorModel';

interface Props {
  color: ColorModel;
  onChange?: (color: ColorModel) => void;
  picker?: boolean;
}

export function Color({
  color,
  onChange = () => false,
  picker = false,
}: Props) {
  const [showingPicker, setPicker] = useState(false);
  const [currentColor, setColor] = useState(color.toObject());

  return (
    <>
      <Box
        width={40}
        height={40}
        onClick={() => picker && setPicker(true)}
        style={{ backgroundColor: color.toRgba() }}
      />
      {picker && showingPicker && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setPicker(false);
          }}
        >
          <SketchPicker
            color={currentColor}
            onChange={({ rgb: { r, g, b, a } }) => {
              onChange(new ColorModel([r, g, b, a || 255]));
              setColor({ r, g, b, a });
            }}
          />
        </OutsideClickHandler>
      )}
    </>
  );
}

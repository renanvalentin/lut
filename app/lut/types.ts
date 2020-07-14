import { ColorModel } from './ColorModel';
import { PalettesModel } from './PalettesModel';

export type CustomFile = File & { preview: string };

export interface AppState {
  imagePreview?: string;
  grayscaledPreview?: string;
  originalColors: ColorModel[];
  grayscaledColors: number[];
  paletteMap: PalettesModel;
}

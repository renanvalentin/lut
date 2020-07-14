import { AppState } from './types';
import { PalettesModel } from './PalettesModel';
import { ColorModel } from './ColorModel';

export class PersistSystem {
  static save(data: AppState) {
    return localStorage.setItem(
      'app',
      JSON.stringify({
        ...data,
        originalColors: data.originalColors.map((color) => color.serialize()),
        paletteMap: data.paletteMap.serialize(),
      })
    );
  }

  static load(): AppState {
    try {
      const {
        originalColors,
        grayscaledPreview,
        imagePreview,
        paletteMap,
      } = (JSON.parse(localStorage.getItem('app') as string) as unknown) as {
        originalColors: number[][];
        grayscaledPreview: string;
        imagePreview: string;
        paletteMap: {
          [key: string]: {
            colors: number[][];
            id: string;
          };
        };
      };

      return {
        grayscaledPreview,
        imagePreview,
        originalColors: ColorModel.deserialize(originalColors),
        grayscaledColors: [],
        paletteMap: PalettesModel.deserialize(paletteMap),
      };
    } catch (err) {
      return {
        originalColors: [],
        grayscaledColors: [],
        paletteMap: new PalettesModel([]),
      };
    }
  }
}

import { ColorModel } from './ColorModel';
import { PaletteModel } from './PaletteModel';

export const palettes = [
  'main_world_inner_light',
  'main_world_outter_light',
  'other_world_inner_light',
  'other_world_outter_light',
  'opacities',
];

export class PalettesModel {
  data: Map<string, PaletteModel>;

  constructor(colors: ColorModel[]) {
    const paletteMap = palettes.reduce(
      (map, id) => map.set(id, new PaletteModel({ id, colors: [...colors] })),
      new Map()
    );

    this.data = paletteMap;
  }

  update(color: ColorModel, id: string, index: number) {
    const palette = this.data.get(id);

    if (!palette) {
      throw new Error(`Palette ${id} not initialized`);
    }

    this.data.set(id, palette.update(color, index));
  }

  getColorsById(id: string) {
    const palette = this.data.get(id);

    if (!palette) {
      throw new Error(`Palette ${id} doesn't exist`);
    }

    return palette.colors;
  }

  serialize() {
    const data: any = {};

    this.data.forEach((value, key) => {
      data[key] = value.serialize();
    });

    return data;
  }

  static deserialize(data: {
    [key: string]: {
      colors: number[][];
      id: string;
    };
  }) {
    const mapper = Object.entries(data).reduce(
      (map, [key, { id, colors }]) =>
        map.set(
          key,
          new PaletteModel({ id, colors: ColorModel.deserialize(colors) })
        ),
      new Map()
    );

    const palettesModel = new PalettesModel([]);

    palettesModel.data = mapper;

    return palettesModel;
  }
}

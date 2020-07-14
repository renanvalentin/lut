import { ColorModel } from './ColorModel';

export class PaletteModel {
  id: string;

  colors: ColorModel[];

  constructor({ id, colors }: { id: string; colors: ColorModel[] }) {
    this.id = id;
    this.colors = colors;
  }

  update(color: ColorModel, index: number) {
    this.colors[index] = color;
    return new PaletteModel({ id: this.id, colors: this.colors });
  }

  serialize() {
    return {
      id: this.id,
      colors: this.colors.map((color) => [...color.data]),
    };
  }
}

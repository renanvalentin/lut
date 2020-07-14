import Colr from 'colr';

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export class ColorModel {
  data: number[];

  constructor(props: number[]) {
    this.data = props;
  }

  toObject(): RGB {
    const [r, g, b, a] = this.data;
    return {
      r,
      g,
      b,
      a,
    };
  }

  toGrayscale() {
    const colr = Colr.fromRgbArray(this.toRgb());
    const grayscale = colr.toGrayscale();

    return grayscale as number;
  }

  toHex() {
    const colr = Colr.fromRgbArray(this.toRgb());
    return colr.toHex();
  }

  toRgba() {
    const [r, g, b, a] = this.data;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  toRgb() {
    const [r, g, b] = this.data;
    return [r, g, b];
  }

  static createFromObject({ r, g, b, a }: Record<string, number>) {
    return new ColorModel([r, g, b, a]);
  }

  static createAsGrayscale(color: ColorModel) {
    const r = color.toGrayscale();

    return new ColorModel([r, r, r, 255]);
  }

  serialize() {
    return [...this.data];
  }

  static deserialize(colors: number[][]) {
    return colors.map((c) => new ColorModel(c));
  }
}

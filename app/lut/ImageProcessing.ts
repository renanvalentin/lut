import Jimp from 'jimp';
import palette from 'image-palette';
import pixels from 'image-pixels';

function prepareBuffer(input: string) {
  const [, content] = input.split(',');
  return content as string;
}

export class ImageProcessing {
  static async toGrayscale(blob: string) {
    const file = await Jimp.read(Buffer.from(prepareBuffer(blob), 'base64'));
    return file.grayscale().getBase64Async(Jimp.MIME_PNG);
  }

  static async extractPalette(blob: string) {
    const { colors } = palette(await pixels(blob), Number.MAX_SAFE_INTEGER);

    return colors as number[][];
  }
}

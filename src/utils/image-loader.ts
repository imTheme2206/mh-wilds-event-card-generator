import { loadImage, Image } from 'canvas';
import { resolve } from 'path';

export async function loadAssetImage(relativePath: string): Promise<Image> {
  const fullPath = resolve(__dirname, '../assets', relativePath);
  return loadImage(fullPath);
}

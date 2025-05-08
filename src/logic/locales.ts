import { createCanvas, loadImage } from 'canvas';
import { EventQuestItem } from 'types';

export const LocalesBuilder = async (quest: EventQuestItem) => {
  const canvasWidth = 200;
  const canvasHeight = 200;
  const canvas = createCanvas(canvasWidth, canvasHeight);

  const ctx = canvas.getContext('2d');

  const formattedLocalesName = quest.locales.toLowerCase().split(' ').join('_');
  const localesImgPath = `assets/icons/locales/${formattedLocalesName}.png`;

  const icon = await loadImage(localesImgPath);

  const outlineWidth = 0;
  const iconWidth = 200;
  const iconHeight = 200;

  ctx.drawImage(icon, outlineWidth, outlineWidth, iconWidth, iconHeight);

  return canvas;
};

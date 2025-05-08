import { createCanvas } from 'canvas';
import { drawOutlinedImage } from './draw-outline';
import { EventQuestItem } from '../types';
import { LocalesBuilder } from './locales';
import { questTargetBuilder } from './quest';
import { loadAssetImage } from '../utils/image-loader';

const iconWidth = 256;
const iconHeight = 256;

export const generateQuestCard = async (quest: EventQuestItem) => {
  const width = 1400;
  const height = 700;
  const iconX = 100;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const bg = await loadAssetImage(`card/card-bg.png`);

  ctx.drawImage(bg, 0, 0, width, height);

  const middleY = height / 2 - iconHeight / 2;

  ctx.fillStyle = '#111';
  const fontSize = 72;
  ctx.font = `${fontSize}px Arial`;
  const lineHeight = fontSize * 1.3;

  ctx.drawImage(await questTargetBuilder(quest), 90, 100, width, 100);

  let currentY = middleY;
  currentY += lineHeight;

  ctx.fillStyle = '#FE4511';
  ctx.font = `${fontSize - 10}px Arial`;
  ctx.fillText(`${'⭐ '.repeat(quest.difficulty)}`, 400, currentY);
  currentY += lineHeight;

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = '#111';

  ctx.fillText(`Locales: ${quest.locales}`, 400, currentY);

  ctx.drawImage(
    await drawOutlinedImage(quest),
    iconX,
    middleY,
    iconWidth,
    iconHeight
  );

  ctx.drawImage(
    await LocalesBuilder(quest),
    width - iconWidth - 20,
    height - iconHeight - 20,
    iconWidth,
    iconHeight
  );

  return canvas;
};

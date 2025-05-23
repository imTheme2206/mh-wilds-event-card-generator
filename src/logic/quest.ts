import { createCanvas, loadImage } from 'canvas';
import { EventQuestItem } from '../types';

export const questTargetBuilder = async (quest: EventQuestItem) => {
  const canvasWidth = 1400;
  const canvasHeight = 100;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  const questTypeImagePath = `assets/icons/quest/${quest.questType}.png`;

  const questTypeImage = await loadImage(questTypeImagePath);

  ctx.drawImage(questTypeImage, 0, 0, 100, 100);

  ctx.fillStyle = '#111';
  const fontSize = 72;
  ctx.font = `${fontSize}px Arial`;

  ctx.fillText(
    `${questTypeToText(quest.questType)}${
      quest.amount > 1 ? `${quest.amount} ` : ''
    }${variantToText(quest.variant!)}${quest.targetMonster}`,
    120,
    canvasHeight / 2 + fontSize / 2 - 10
  );

  return canvas;
};

const variantToText = (variant: 'arch-tempered' | 'normal' | 'tempered') => {
  switch (variant) {
    case 'arch-tempered':
      return 'Arch-Tempered ';
    case 'normal':
      return '';
    case 'tempered':
      return 'Tempered ';
    default:
      return '';
  }
};

const questTypeToText = (variant: 'hunt' | 'slay' | 'capture') => {
  switch (variant) {
    case 'hunt':
      return 'Hunt ';
    case 'slay':
      return 'Slay ';
    case 'capture':
      return 'Capture ';
    default:
      return '';
  }
};

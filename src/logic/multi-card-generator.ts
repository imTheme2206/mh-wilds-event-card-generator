import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import { generateQuestCard } from './generate-card';
import { EventQuestItem } from '../types';

export async function generateQuestSheet(quests: EventQuestItem[]) {
  if (quests.length === 0) {
    console.log('No quests to generate.');
    return;
  }
  const cardsPerRow = 2;
  const cardWidth = 1400;
  const cardHeight = 700;
  const padding = 20;
  const totalRows = Math.ceil(quests.length / cardsPerRow);

  const canvas = createCanvas(
    cardsPerRow * cardWidth + (cardsPerRow + 1) * padding,
    totalRows * cardHeight + (totalRows + 1) * padding
  );
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < quests.length; i++) {
    const quest = quests[i];
    const cardCanvas = await generateQuestCard(quest as any);

    const row = Math.floor(i / cardsPerRow);
    const col = i % cardsPerRow;

    const x = padding + col * (cardWidth + padding);
    const y = padding + row * (cardHeight + padding);

    ctx.drawImage(cardCanvas, x, y, cardWidth, cardHeight);
  }

  const buffer = canvas.toBuffer('image/png');
  // fs.writeFileSync('./output-multicard.png', buffer);
  // console.log('Multi-card image generated: output-multicard.png');

  return buffer;
}

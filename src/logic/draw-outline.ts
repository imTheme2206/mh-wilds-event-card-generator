import { createCanvas, loadImage } from 'canvas';
import { EventQuestItem } from '../types';
import { loadAssetImage } from '../utils/image-loader';

const iconWidth = 256;
const iconHeight = 256;

export const drawOutlinedImage = async ({
  targetMonster,
  variant,
}: EventQuestItem) => {
  const formattedMonsterName = targetMonster.split(' ').join('_');
  const icon = await loadAssetImage(
    `icons/large/${formattedMonsterName}_Icon.png`
  );

  const outlineWidth = 0.25;
  const outlineColor = variant === 'arch-tempered' ? '#FE4511' : 'purple';

  const canvas = createCanvas(
    iconWidth + outlineWidth,
    iconHeight + outlineWidth
  );

  const ctx = canvas.getContext('2d');

  ctx.drawImage(icon, outlineWidth, outlineWidth, iconWidth, iconHeight);
  if (variant === 'normal') {
    return canvas;
  }

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width: w, height: h } = imageData;

  ctx.fillStyle = outlineColor;

  for (let offsetX = -outlineWidth; offsetX <= outlineWidth; offsetX++) {
    for (let offsetY = -outlineWidth; offsetY <= outlineWidth; offsetY++) {
      if (offsetX === 0 && offsetY === 0) continue;

      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const idx = (py * w + px) * 4;
          const alpha = data[idx + 3];
          if (alpha > 0) {
            ctx.fillRect(0 + px + offsetX, 0 + py + offsetY, 1, 1);
          }
        }
      }
    }
  }

  ctx.drawImage(icon, outlineWidth, outlineWidth, iconWidth, iconHeight);

  return canvas;
};

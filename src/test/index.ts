import { generateQuestSheet } from '../logic/multi-card-generator';
import { MOCK_QUEST_DATA, MOCK_QUEST_DATA_2 } from './data';
import fs from 'fs';

// generateQuestCard({
//   questName: MOCK_QUEST_DATA_2.questName,
//   difficulty: MOCK_QUEST_DATA_2.difficulty,
//   targetMonster: MOCK_QUEST_DATA_2.targetMonster,
//   locale: MOCK_QUEST_DATA_2.locales,
//   variant: MOCK_QUEST_DATA_2.variant as 'arch-tempered' | 'normal' | 'tempered',
//   questType: MOCK_QUEST_DATA_2.questType as 'hunt' | 'slay' | 'capture',
// });

async function run() {
  const events = (await MOCK_QUEST_DATA).flatMap((quest) => quest);

  const buffer = await generateQuestSheet(events as any);

  if (!buffer) {
    console.error('Failed to generate image');
    return;
  }

  fs.writeFileSync('./output-multicard.png', buffer);
  console.log('Multi-card image generated: output-multicard.png');
}

run();

import { generateEventCards } from '../src/lib/generator';
import fs from 'fs';
import { MOCK_QUEST_DATA } from '../example/data';

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

  const { eventBoardBuffer } = await generateEventCards({
    eventQuests: events,
    freeChallengeQuests: [],
    startDate: new Date('2025-07-05T00:00:00.000Z'),
    endDate: new Date('2026-09-04T23:59:00.000Z'),
  });

  if (!eventBoardBuffer) {
    console.error('Failed to generate image');
    return;
  }

  fs.writeFileSync('./output-multicard.png', eventBoardBuffer);
  console.log('Multi-card image generated: output-multicard.png');
}

run();

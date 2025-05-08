import { generateQuestSheet } from '../logic/multi-card-generator';
import { MHWIldsEventResponse } from '../types';

export const generateEventCards = async (event: MHWIldsEventResponse) => {
  const { eventQuests, freeChallengeQuests } = event;

  const eventBoardBuffer = await generateQuestSheet(eventQuests);
  const freeChallengeBoardBuffer = await generateQuestSheet(
    freeChallengeQuests
  );

  return {
    eventBoardBuffer,
    freeChallengeBoardBuffer,
  };
};

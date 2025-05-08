import { generateQuestSheet } from '../logic/multi-card-generator';
import { MHWIldsEventResponse } from '../types';

export const generateEventCards = (event: MHWIldsEventResponse) => {
  const { eventQuests, freeChallengeQuests } = event;

  const eventBoardBuffer = generateQuestSheet(eventQuests);
  const freeChallengeBoardBuffer = generateQuestSheet(freeChallengeQuests);

  return {
    eventBoardBuffer,
    freeChallengeBoardBuffer,
  };
};

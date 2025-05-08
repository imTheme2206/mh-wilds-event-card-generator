# mh-wilds-event-card-generator

A tool for generating visual event cards for Monster Hunter Wilds event quests.

## Overview

This project creates visual card representations of Monster Hunter Wilds event quests. It uses Node.js and the canvas library to generate image cards that display important quest information such as:

- Quest name
- Target monster (with special visuals for tempered/arch-tempered variants)
- Quest type (hunt, slay, or capture)
- Difficulty (star rating)
- Location
- Time period

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mh-wilds-event-card-generator.git
cd mh-wilds-event-card-generator
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Make sure to have the required assets:
   - Place monster icons in large
   - Place locale/map icons in locales
   - Place quest type icons in quest
   - Place card background in card-bg.png

## Usage

### Generate a Single Quest Card

```typescript
import { generateQuestCard } from 'logic/generate-card';

await generateQuestCard({
  img: 'image_url',
  questName: 'The Shining Storm Rages',
  difficulty: 8,
  requiredRank: 50,
  startAt: '2025-07-05T00:00:00.000Z',
  endAt: '2026-09-04T23:59:00.000Z',
  locales: 'Windward Plains',
  targetMonster: 'Rey Dau',
  variant: 'arch-tempered', // 'normal', 'tempered', or 'arch-tempered'
  questType: 'slay', // 'hunt', 'slay', or 'capture'
  amount: 1,
});
```

### Generate a Sheet of Multiple Quest Cards

```typescript
import { generateQuestSheet } from 'lib/multi-card-generator';

const quests = [
  {
    img: 'image_url_1',
    questName: 'The Shining Storm Rages',
    difficulty: 8,
    requiredRank: 50,
    startAt: '2025-07-05T00:00:00.000Z',
    endAt: '2026-09-04T23:59:00.000Z',
    locales: 'Windward Plains',
    targetMonster: 'Rey Dau',
    variant: 'arch-tempered',
    questType: 'slay',
    amount: 1,
  },
  {
    img: 'image_url_2',
    questName: 'Sand-Scarred Soul',
    difficulty: 5,
    requiredRank: 9,
    startAt: '2026-02-05T00:00:00.000Z',
    endAt: '2026-09-04T23:59:00.000Z',
    locales: 'Windward Plains',
    targetMonster: 'Doshaguma',
    variant: 'normal',
    questType: 'hunt',
    amount: 1,
  },
];

await generateQuestSheet(quests);
```

## Card Anatomy

Each generated card includes:

- Monster icon with special outline for tempered/arch-tempered variants
- Quest type icon (hunt/slay/capture)
- Target monster name and count
- Difficulty stars
- Location name and icon
- Card background

## Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Build the project:

```bash
npm run build
# or
pnpm build
```

## License

ISC

## Dependencies

- Node.js
- canvas - for image generation
- axios - for HTTP requests (if fetching from API)
- TypeScript for type safety

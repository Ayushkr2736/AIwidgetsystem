import {SuggestionInput} from './types';

export const generateMockSignals = (overrides?: Partial<SuggestionInput>): SuggestionInput => {
  const now = new Date();
  
  return {
    currentTime: now,
    calendarEvents: [
      {
        id: '1',
        title: 'Team Sync',
        startTime: new Date(now.getTime() + 15 * 60000), // in 15 mins
        endTime: new Date(now.getTime() + 45 * 60000),
        location: 'Zoom',
      },
      {
        id: '2',
        title: 'Lunch Break',
        startTime: new Date(now.getTime() - 2 * 60 * 60000), // 2 hours ago
        endTime: new Date(now.getTime() - 1 * 60 * 60000),
      }
    ],
    appUsage: [
      {
        packageName: 'com.instagram.android',
        lastUsed: new Date(),
        totalTimeToday: 135, // 2h 15m
      },
      {
        packageName: 'com.slack',
        lastUsed: new Date(),
        totalTimeToday: 45,
      }
    ],
    health: {
      steps: 3200,
      activeMinutes: 12,
      sleepHours: 7.2,
    },
    contacts: [
      {
        id: 'c1',
        name: 'John Doe',
        isFavorite: true,
        lastContacted: new Date(now.getTime() - 24 * 60 * 60000),
      }
    ],
    ...overrides
  };
};

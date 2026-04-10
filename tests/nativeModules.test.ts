import {NativeModules} from 'react-native';
import {nativeBridge} from '../app/services/NativeBridge';

// Mock NativeModules
jest.mock('react-native', () => ({
  NativeModules: {
    CalendarModule: {
      getEvents: jest.fn(),
    },
    AppUsageModule: {
      getUsageStats: jest.fn(),
    },
    ContactsModule: {
      getContacts: jest.fn(),
    },
  },
}));

describe('NativeBridge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should aggregate data from all native modules', async () => {
    (NativeModules.CalendarModule.getEvents as jest.Mock).mockResolvedValue([
      {id: '1', title: 'Meeting', startTime: Date.now()},
    ]);
    (NativeModules.AppUsageModule.getUsageStats as jest.Mock).mockResolvedValue([
      {packageName: 'com.test', totalTime: 10},
    ]);
    (NativeModules.ContactsModule.getContacts as jest.Mock).mockResolvedValue([
      {id: 'c1', name: 'John'},
    ]);

    const signals = await nativeBridge.getSystemSignals();

    expect(signals.calendarEvents).toHaveLength(1);
    expect(signals.appUsage).toHaveLength(1);
    expect(signals.contacts).toHaveLength(1);
    expect(signals.calendarEvents[0].title).toBe('Meeting');
  });

  test('should handle native module failures gracefully', async () => {
    (NativeModules.CalendarModule.getEvents as jest.Mock).mockRejectedValue(new Error('Native error'));
    (NativeModules.AppUsageModule.getUsageStats as jest.Mock).mockResolvedValue([]);
    (NativeModules.ContactsModule.getContacts as jest.Mock).mockResolvedValue([]);

    const signals = await nativeBridge.getSystemSignals();

    // Should return empty arrays instead of crashing
    expect(signals.calendarEvents).toHaveLength(0);
    expect(signals.appUsage).toHaveLength(0);
  });
});

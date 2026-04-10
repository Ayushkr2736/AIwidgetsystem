import {NativeModules} from 'react-native';
import {SuggestionInput, CalendarEvent, AppUsage, Contact} from './suggestionEngine/types';

const {CalendarModule, AppUsageModule, ContactsModule} = NativeModules;

class NativeBridge {
  async getSystemSignals(): Promise<SuggestionInput> {
    try {
      const calendarData: any[] = await CalendarModule.getEvents();
      const appUsageData: any[] = await AppUsageModule.getUsageStats();
      const contactData: any[] = await ContactsModule.getContacts();

      const calendarEvents: CalendarEvent[] = calendarData.map(e => ({
        id: e.id,
        title: e.title,
        startTime: new Date(e.startTime),
        endTime: new Date(e.startTime + 3600000), // Default 1hr
      }));

      const appUsage: AppUsage[] = appUsageData.map(u => ({
        packageName: u.packageName,
        lastUsed: new Date(),
        totalTimeToday: u.totalTime,
      }));

      const contacts: Contact[] = contactData.map(c => ({
        id: c.id,
        name: c.name,
        lastContacted: new Date(),
        isFavorite: false,
      }));

      return {
        calendarEvents,
        appUsage,
        contacts,
        currentTime: new Date(),
      };
    } catch (error) {
      console.error('Failed to fetch real native signals, falling back to mock.', error);
      return {
        currentTime: new Date(),
        calendarEvents: [],
        appUsage: [],
        contacts: [],
      };
    }
  }

  async updateWidgetData(data: any): Promise<void> {
    console.log('Pushing data to Native Widget Group:', data);
    // NativeModules.WidgetModule.setWidgetData(JSON.stringify(data));
  }
}

export const nativeBridge = new NativeBridge();

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  location?: string;
}

export interface AppUsage {
  packageName: string;
  lastUsed: Date;
  totalTimeToday: number; // in minutes
}

export interface Contact {
  id: string;
  name: string;
  lastContacted: Date;
  isFavorite: boolean;
}

export interface HealthData {
  steps: number;
  activeMinutes: number;
  sleepHours: number;
}

export interface SuggestionInput {
  calendarEvents?: CalendarEvent[];
  appUsage?: AppUsage[];
  contacts?: Contact[];
  health?: HealthData;
  currentTime: Date;
}

export interface Suggestion {
  id: string;
  message: string;
  relevanceScore: number; // 0.0 to 1.0
  source: 'calendar' | 'app_usage' | 'contacts' | 'health' | 'system';
  deepLink?: string;
}

export interface SuggestionProvider {
  name: string;
  getSuggestions(input: SuggestionInput): Promise<Suggestion[]>;
}

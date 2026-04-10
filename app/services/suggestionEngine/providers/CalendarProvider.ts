import {Suggestion, SuggestionInput, SuggestionProvider} from '../types';

export class CalendarProvider implements SuggestionProvider {
  name = 'calendar';

  async getSuggestions(input: SuggestionInput): Promise<Suggestion[]> {
    const {calendarEvents, currentTime} = input;
    if (!calendarEvents || calendarEvents.length === 0) return [];

    const suggestions: Suggestion[] = [];

    calendarEvents.forEach(event => {
      const timeDiff = event.startTime.getTime() - currentTime.getTime();
      const minutesToEvent = Math.floor(timeDiff / (1000 * 60));

      // Upcoming event in the next 30 minutes
      if (minutesToEvent > 0 && minutesToEvent <= 30) {
        suggestions.push({
          id: `calendar-${event.id}`,
          message: `Upcoming: "${event.title}" starts in ${minutesToEvent} mins.`,
          relevanceScore: 0.9 - (minutesToEvent / 100), // Higher score as it gets closer
          source: 'calendar',
          deepLink: `app://calendar/event/${event.id}`,
        });
      }

      // Ongoing event
      if (currentTime >= event.startTime && currentTime <= event.endTime) {
        suggestions.push({
          id: `calendar-${event.id}-now`,
          message: `Currently: "${event.title}" until ${event.endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`,
          relevanceScore: 0.95,
          source: 'calendar',
        });
      }
    });

    return suggestions;
  }
}

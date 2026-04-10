import {Suggestion, SuggestionInput, SuggestionProvider} from './types';
import {CalendarProvider} from './providers/CalendarProvider';
import {AppUsageProvider} from './providers/AppUsageProvider';
import {HealthProvider} from './providers/HealthProvider';

export class SuggestionEngine {
  private providers: SuggestionProvider[] = [];

  constructor() {
    this.registerProvider(new CalendarProvider());
    this.registerProvider(new AppUsageProvider());
    this.registerProvider(new HealthProvider());
  }

  public registerProvider(provider: SuggestionProvider) {
    this.providers.push(provider);
  }

  public async generateSuggestions(input: SuggestionInput): Promise<Suggestion[]> {
    try {
      const allSuggestionsPromises = this.providers.map(async provider => {
        try {
          return await provider.getSuggestions(input);
        } catch (error) {
          console.error(`Error in provider ${provider.name}:`, error);
          return [];
        }
      });

      const results = await Promise.all(allSuggestionsPromises);
      const flattened = results.flat();

      // Sort by relevance score descending
      return flattened.sort((a, b) => b.relevanceScore - a.relevanceScore);
    } catch (error) {
      console.error('Fatal error in SuggestionEngine:', error);
      return [];
    }
  }
}

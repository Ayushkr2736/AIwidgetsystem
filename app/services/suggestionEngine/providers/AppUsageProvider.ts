import {Suggestion, SuggestionInput, SuggestionProvider} from '../types';

export class AppUsageProvider implements SuggestionProvider {
  name = 'app_usage';

  async getSuggestions(input: SuggestionInput): Promise<Suggestion[]> {
    const {appUsage} = input;
    if (!appUsage || appUsage.length === 0) return [];

    const suggestions: Suggestion[] = [];

    appUsage.forEach(usage => {
      // Habit: If they use an app a lot, suggest a focus break
      if (usage.totalTimeToday > 120) { // More than 2 hours
        suggestions.push({
          id: `usage-${usage.packageName}-limit`,
          message: `Screen Time: You've used ${usage.packageName} for ${usage.totalTimeToday}m today. Take a break?`,
          relevanceScore: 0.7,
          source: 'app_usage',
        });
      }

      // Late night usage
      const hour = input.currentTime.getHours();
      if ((hour >= 23 || hour <= 4) && usage.totalTimeToday > 30) {
        suggestions.push({
          id: `usage-late-night`,
          message: "It's late. Blue light can affect your sleep. Wind down?",
          relevanceScore: 0.85,
          source: 'app_usage',
        });
      }
    });

    return suggestions;
  }
}

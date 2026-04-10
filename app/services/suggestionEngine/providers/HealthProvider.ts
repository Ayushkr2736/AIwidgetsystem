import {Suggestion, SuggestionInput, SuggestionProvider} from '../types';

export class HealthProvider implements SuggestionProvider {
  name = 'health';

  async getSuggestions(input: SuggestionInput): Promise<Suggestion[]> {
    const {health} = input;
    if (!health) return [];

    const suggestions: Suggestion[] = [];

    // Step goal progress
    if (health.steps < 5000 && input.currentTime.getHours() > 17) {
      suggestions.push({
        id: 'health-steps-low',
        message: `Activity: Only ${health.steps} steps so far. A quick walk?`,
        relevanceScore: 0.75,
        source: 'health',
      });
    }

    if (health.activeMinutes >= 30) {
      suggestions.push({
        id: 'health-goal-met',
        message: "Goal Met: You've reached your daily activity goal. Well done!",
        relevanceScore: 0.6,
        source: 'health',
      });
    }

    return suggestions;
  }
}

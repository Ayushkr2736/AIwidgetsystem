import {SuggestionEngine} from '../app/services/suggestionEngine/engine';
import {generateMockSignals} from '../app/services/suggestionEngine/mockData';

describe('SuggestionEngine', () => {
  let engine: SuggestionEngine;

  beforeEach(() => {
    engine = new SuggestionEngine();
  });

  test('should generate calendar suggestions when an event is close', async () => {
    const mockInput = generateMockSignals();
    const suggestions = await engine.generateSuggestions(mockInput);

    const calendarSuggestion = suggestions.find(s => s.source === 'calendar');
    expect(calendarSuggestion).toBeDefined();
    expect(calendarSuggestion?.message).toContain('Team Sync');
    expect(calendarSuggestion?.relevanceScore).toBeGreaterThan(0.7);
  });

  test('should suggest a break when app usage is high', async () => {
    const mockInput = generateMockSignals();
    const suggestions = await engine.generateSuggestions(mockInput);

    const appUsageSuggestion = suggestions.find(s => s.id.includes('instagram'));
    expect(appUsageSuggestion).toBeDefined();
    expect(appUsageSuggestion?.message).toContain('Take a break');
  });

  test('should rank suggestions by relevance score', async () => {
    const mockInput = generateMockSignals();
    const suggestions = await engine.generateSuggestions(mockInput);

    if (suggestions.length >= 2) {
      expect(suggestions[0].relevanceScore).toBeGreaterThanOrEqual(suggestions[1].relevanceScore);
    }
  });

  test('should handle missing data gracefully', async () => {
    const minimalInput = {
      currentTime: new Date(),
    };
    
    // @ts-ignore - testing graceful failure on missing types
    const suggestions = await engine.generateSuggestions(minimalInput);
    expect(Array.isArray(suggestions)).toBe(true);
    expect(suggestions.length).toBe(0);
  });
});

import {useState, useEffect, useCallback, useMemo} from 'react';
import {SuggestionEngine} from '../services/suggestionEngine/engine';
import {Suggestion} from '../services/suggestionEngine/types';
import {nativeBridge} from '../services/NativeBridge';

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const useContextualSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const engine = useMemo(() => new SuggestionEngine(), []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const signals = await nativeBridge.getSystemSignals();
      const results = await engine.generateSuggestions(signals);
      setSuggestions(results);
    } catch (err) {
      setError('Failed to fetch intelligence signals');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [engine]);

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [refresh]);

  return {
    suggestions,
    isLoading,
    error,
    refresh,
  };
};

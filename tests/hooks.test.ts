import {renderHook, act} from '@testing-library/react-hooks';
import {useContextualSuggestions} from '../app/hooks/useContextualSuggestions';
import {nativeBridge} from '../app/services/NativeBridge';

// Mock NativeBridge
jest.mock('../app/services/NativeBridge', () => ({
  nativeBridge: {
    getSystemSignals: jest.fn(),
  },
}));

describe('useContextualSuggestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should load suggestions on mount', async () => {
    (nativeBridge.getSystemSignals as jest.Mock).mockResolvedValue({
      currentTime: new Date(),
      calendarEvents: [],
      appUsage: [],
      contacts: [],
    });

    const {result, waitForNextUpdate} = renderHook(() => useContextualSuggestions());

    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(Array.isArray(result.current.suggestions)).toBe(true);
  });

  test('should handle refresh correctly', async () => {
    (nativeBridge.getSystemSignals as jest.Mock).mockResolvedValue({
      currentTime: new Date(),
      calendarEvents: [],
      appUsage: [],
      contacts: [],
    });

    const {result, waitForNextUpdate} = renderHook(() => useContextualSuggestions());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.refresh();
    });

    expect(nativeBridge.getSystemSignals).toHaveBeenCalledTimes(2);
  });
});

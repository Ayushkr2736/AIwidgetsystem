import {useMemo} from 'react';
import {Suggestion} from '../services/suggestionEngine/types';
import {nativeBridge} from '../services/NativeBridge';

export type WidgetSize = 'small' | 'medium' | 'large';

export interface WidgetData {
  title: string;
  items: Array<{
    id: string;
    message: string;
    source: string;
  }>;
  totalCount: number;
  lastUpdated: string;
}

export const useWidget = (suggestions: Suggestion[]) => {
  const formatWidgetData = useMemo(() => {
    const getVariant = (size: WidgetSize): WidgetData => {
      const count = size === 'small' ? 1 : size === 'medium' ? 3 : 5;
      
      return {
        title: 'Intelligence Hub',
        items: suggestions.slice(0, count).map(s => ({
          id: s.id,
          message: s.message,
          source: s.source,
        })),
        totalCount: suggestions.length,
        lastUpdated: new Date().toISOString(),
      };
    };

    return {
      small: getVariant('small'),
      medium: getVariant('medium'),
      large: getVariant('large'),
    };
  }, [suggestions]);

  const syncToNative = async () => {
    await nativeBridge.updateWidgetData(formatWidgetData);
  };

  return {
    widgetData: formatWidgetData,
    syncToNative,
  };
};

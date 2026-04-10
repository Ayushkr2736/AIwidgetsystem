import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {LayoutGrid, Bell, Search, Settings, Plus, RefreshCw, AlertCircle} from 'lucide-react-native';
import {useContextualSuggestions} from '../hooks/useContextualSuggestions';
import {useWidget} from '../hooks/useWidget';

const HomeScreen = ({navigation}: any) => {
  const {suggestions, isLoading, error, refresh} = useContextualSuggestions();
  const {syncToNative} = useWidget(suggestions);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Settings color="#666" size={24} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hello, Ayush</Text>
          <Text style={styles.subtitle}>Cross-App Intelligence</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={refresh}>
          <RefreshCw color="#6366F1" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBar}>
          <Search color="#999" size={20} />
          <Text style={styles.searchPlaceholder}>Search widgets and intelligence...</Text>
        </View>

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.loadingText}>Syncing intelligence...</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <AlertCircle color="#EF4444" size={40} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Contextual Insights</Text>
              <TouchableOpacity onPress={syncToNative}>
                <Text style={styles.seeAll}>Sync Widget</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.suggestionList}>
              {suggestions.map((suggestion) => (
                <View key={suggestion.id} style={styles.suggestionCard}>
                  <View style={[styles.sourceBadge, {backgroundColor: getSourceColor(suggestion.source)}]}>
                    <Text style={styles.sourceText}>{suggestion.source.replace('_', ' ')}</Text>
                  </View>
                  <Text style={styles.suggestionMessage}>{suggestion.message}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.intelligenceCard}>
          <Text style={styles.intelligenceTitle}>AI Intelligence</Text>
          <Text style={styles.intelligenceDesc}>
            Your cross-app data is being synchronized. Next widget update in 5 minutes.
          </Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Sync Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Plus color="#FFF" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'calendar': return '#6366F1';
    case 'app_usage': return '#F59E0B';
    case 'health': return '#10B981';
    default: return '#6B7280';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: 8,
  },
  center: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    marginTop: 12,
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 30,
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: '#999',
    fontSize: 16,
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  seeAll: {
    color: '#6366F1',
    fontWeight: '600',
  },
  suggestionList: {
    gap: 16,
  },
  suggestionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sourceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  sourceText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  suggestionMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 24,
  },
  intelligenceCard: {
    marginTop: 24,
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
  },
  intelligenceTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  intelligenceDesc: {
    color: '#AAA',
    fontSize: 15,
    marginTop: 8,
    lineHeight: 22,
  },
  actionButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
});

export default HomeScreen;

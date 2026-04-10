import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ChevronLeft, Settings, Shield, Bell, HardDrive} from 'lucide-react-native';
import {permissionService} from '../services/PermissionService';

const SettingsScreen = ({navigation}: any) => {
  const sections = [
    {
      title: 'Intelligence Access',
      icon: Shield,
      items: [
        {id: 'calendar', label: 'Calendar Signals', status: 'Enabled'},
        {id: 'contacts', label: 'Contacts Insights', status: 'Disabled'},
        {id: 'usage', label: 'App Tracking', status: 'Enabled'},
      ]
    },
    {
      title: 'Widget Preferences',
      icon: Settings,
      items: [
        {id: 'refresh', label: 'Update Interval', status: '15 Mins'},
        {id: 'preview', label: 'Message Preview', status: 'On'},
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#1A1A1A" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {sections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <View style={styles.sectionHeader}>
              <section.icon color="#666" size={18} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            <View style={styles.card}>
              {section.items.map((item, itemIdx) => (
                <View key={item.id} style={[
                  styles.item,
                  itemIdx !== section.items.length - 1 && styles.border
                ]}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <TouchableOpacity 
                    style={styles.statusBadge}
                    onPress={() => permissionService.openSettings()}
                  >
                    <Text style={[
                      styles.statusText,
                      item.status === 'Disabled' && {color: '#EF4444'}
                    ]}>{item.status}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={() => permissionService.openSettings()}
        >
          <Text style={styles.dangerText}>Reset All Permissions</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    paddingHorizontal: 16,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366F1',
  },
  dangerButton: {
    marginTop: 8,
    padding: 20,
    alignItems: 'center',
  },
  dangerText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {Calendar, Users, BarChart3, ChevronRight, ShieldCheck} from 'lucide-react-native';
import {permissionService, AppPermission} from '../services/PermissionService';

const {width} = Dimensions.get('window');

const OnboardingScreen = ({navigation}: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      id: 'calendar',
      title: 'Calendar Intelligence',
      desc: 'Connect your schedule to see upcoming meetings directly on your home screen.',
      icon: Calendar,
      color: '#6366F1'
    },
    {
      id: 'contacts',
      title: 'Contextual Contacts',
      desc: 'Enable contact access to prioritize messages from people who matter most.',
      icon: Users,
      color: '#10B981'
    },
    {
      id: 'usage',
      title: 'App Usage Insights',
      desc: 'Understand your digital habits and get suggestions for better productivity.',
      icon: BarChart3,
      color: '#F59E0B'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('Home');
    }
  };

  const currentData = steps[currentStep];
  const Icon = currentData.icon;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        {steps.map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.progressBar, 
              {backgroundColor: i <= currentStep ? '#6366F1' : '#EEE'}
            ]} 
          />
        ))}
      </View>

      <View style={styles.content}>
        <View style={[styles.iconCircle, {backgroundColor: currentData.color + '20'}]}>
          <Icon color={currentData.color} size={60} />
        </View>
        
        <Text style={styles.title}>{currentData.title}</Text>
        <Text style={styles.description}>{currentData.desc}</Text>

        <View style={styles.permissionCard}>
          <ShieldCheck color="#666" size={20} />
          <Text style={styles.policyText}>We never upload your personal data to our servers. All processing happens on-device.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Enable Access'}
          </Text>
          <ChevronRight color="#FFF" size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
          <Text style={styles.skipText}>Not now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginTop: 20,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  permissionCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FB',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    alignItems: 'center',
  },
  policyText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    gap: 16,
  },
  button: {
    backgroundColor: '#1A1A1A',
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;

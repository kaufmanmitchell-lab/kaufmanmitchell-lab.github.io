import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Timer,
  TrendingUp,
  Heart,
  Award,
  Sparkles,
  ArrowRight,
  Apple,
  Smartphone,
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface JourneyStep {
  day: string;
  title: string;
  description: string;
}

export default function LandingPage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const features: Feature[] = [
    {
      icon: <Timer size={32} color="#fff" />,
      title: 'Smart Fasting Timer',
      description: 'Track your fasting windows with precision and get real-time progress updates',
      color: '#6366F1',
    },
    {
      icon: <TrendingUp size={32} color="#fff" />,
      title: 'Progress Analytics',
      description: 'Visualize your metabolic journey with detailed insights and trends',
      color: '#8B5CF6',
    },
    {
      icon: <Heart size={32} color="#fff" />,
      title: 'Health Insights',
      description: 'Understand how fasting affects your body with personalized health metrics',
      color: '#EC4899',
    },
    {
      icon: <Award size={32} color="#fff" />,
      title: 'Achievements',
      description: 'Stay motivated with milestones and rewards for your dedication',
      color: '#14B8A6',
    },
  ];

  const journeySteps: JourneyStep[] = [
    {
      day: 'Day 1-3',
      title: 'Beginning',
      description: 'Your body adapts to the new eating pattern',
    },
    {
      day: 'Day 4-7',
      title: 'Adjustment',
      description: 'Increased energy and mental clarity',
    },
    {
      day: 'Week 2-4',
      title: 'Transformation',
      description: 'Metabolic flexibility and fat adaptation',
    },
    {
      day: 'Month 2+',
      title: 'Mastery',
      description: 'Sustained benefits and lifestyle integration',
    },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: headerOpacity,
              transform: [{ scale: headerScale }],
            },
          ]}
        >
          <LinearGradient
            colors={['#1E1B4B', '#312E81', '#4C1D95']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroContent}>
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <View style={styles.badge}>
                  <Sparkles size={16} color="#FCD34D" />
                  <Text style={styles.badgeText}>Transform Your Health</Text>
                </View>

                <Text style={styles.heroTitle}>
                  Your Metabolic{'\n'}Journey Starts Here
                </Text>
                <Text style={styles.heroSubtitle}>
                  Experience the power of intermittent fasting with{'\n'}
                  intelligent tracking and personalized insights
                </Text>

                <TouchableOpacity
                  style={styles.ctaButton}
                  activeOpacity={0.8}
                  onPress={() => console.log('Download pressed')}
                >
                  <Text style={styles.ctaButtonText}>Start Your Journey</Text>
                  <ArrowRight size={20} color="#fff" style={styles.ctaIcon} />
                </TouchableOpacity>

                <View style={styles.downloadButtons}>
                  <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
                    <Apple size={24} color="#fff" />
                    <View style={styles.downloadButtonText}>
                      <Text style={styles.downloadButtonLabel}>Download on</Text>
                      <Text style={styles.downloadButtonStore}>App Store</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
                    <Smartphone size={24} color="#fff" />
                    <View style={styles.downloadButtonText}>
                      <Text style={styles.downloadButtonLabel}>Get it on</Text>
                      <Text style={styles.downloadButtonStore}>Google Play</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Powerful Features</Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need for a successful fasting journey
          </Text>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  {feature.icon}
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.journeySection}>
          <LinearGradient
            colors={['#F9FAFB', '#EFF6FF', '#F3E8FF']}
            style={styles.journeyGradient}
          >
            <Text style={styles.sectionTitle}>Your Transformation Timeline</Text>
            <Text style={styles.sectionSubtitle}>
              Track your progress through each phase
            </Text>

            <View style={styles.timeline}>
              {journeySteps.map((step, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={styles.timelineDot} />
                    {index < journeySteps.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineDay}>{step.day}</Text>
                    <Text style={styles.timelineTitle}>{step.title}</Text>
                    <Text style={styles.timelineDescription}>{step.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>App Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50M+</Text>
            <Text style={styles.statLabel}>Fasting Hours</Text>
          </View>
        </View>

        <View style={styles.finalCTA}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6', '#A855F7']}
            style={styles.finalCTAGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Sparkles size={40} color="#FCD34D" style={styles.finalCTAIcon} />
            <Text style={styles.finalCTATitle}>Ready to Transform?</Text>
            <Text style={styles.finalCTASubtitle}>
              Join millions who have discovered the power of metabolic health
            </Text>
            <TouchableOpacity
              style={styles.finalCTAButton}
              activeOpacity={0.8}
              onPress={() => console.log('Get Started pressed')}
            >
              <Text style={styles.finalCTAButtonText}>Get Started Free</Text>
              <ArrowRight size={20} color="#6366F1" style={styles.ctaIcon} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Metafast Journey</Text>
          <Text style={styles.footerSubtext}>
            Transform your health, one fast at a time
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    width: SCREEN_WIDTH,
    minHeight: Platform.OS === 'web' ? 700 : SCREEN_HEIGHT * 0.85,
  },
  heroGradient: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 80 : 60,
    paddingBottom: 60,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(252, 211, 77, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    gap: 8,
  },
  badgeText: {
    color: '#FCD34D',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  heroTitle: {
    fontSize: Platform.OS === 'web' ? 56 : 42,
    fontWeight: '800' as const,
    color: '#fff',
    marginBottom: 16,
    lineHeight: Platform.OS === 'web' ? 64 : 50,
  },
  heroSubtitle: {
    fontSize: Platform.OS === 'web' ? 20 : 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 32,
    lineHeight: 28,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#1E1B4B',
    fontSize: 18,
    fontWeight: '700' as const,
  },
  ctaIcon: {
    marginLeft: 8,
  },
  downloadButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    gap: 12,
    flex: Platform.OS === 'web' ? 0 : 1,
    minWidth: Platform.OS === 'web' ? 180 : undefined,
  },
  downloadButtonText: {
    flexDirection: 'column',
  },
  downloadButtonLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
  },
  downloadButtonStore: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '800' as const,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 48,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  featureCard: {
    width: Platform.OS === 'web' ? 260 : (SCREEN_WIDTH - 68) / 2,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  journeySection: {
    paddingVertical: 80,
  },
  journeyGradient: {
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  timeline: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 20,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#6366F1',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 0,
  },
  timelineDay: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#6366F1',
    marginBottom: 4,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  timelineTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#1F2937',
    marginBottom: 6,
  },
  timelineDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 60,
    gap: 20,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statCard: {
    flex: 1,
    minWidth: Platform.OS === 'web' ? 200 : 100,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 40,
    fontWeight: '800' as const,
    color: '#6366F1',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600' as const,
  },
  finalCTA: {
    marginHorizontal: 24,
    marginVertical: 60,
    borderRadius: 24,
    overflow: 'hidden',
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  finalCTAGradient: {
    padding: 48,
    alignItems: 'center',
  },
  finalCTAIcon: {
    marginBottom: 20,
  },
  finalCTATitle: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  finalCTASubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  finalCTAButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  finalCTAButtonText: {
    color: '#6366F1',
    fontSize: 18,
    fontWeight: '700' as const,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Card, Title, Paragraph, Button, Surface, Avatar, Chip, Divider } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { EmergencyButton } from '@/components/EmergencyButton';
import { theme } from '@/theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const { translations } = useAppContext();

  const quickActions = [
    {
      title: 'Resources',
      icon: 'book-open-variant',
      description: 'Study materials & guides',
      color: theme.colors.primary,
    },
    {
      title: 'Reminders',
      icon: 'bell-outline',
      description: 'Important deadlines',
      color: theme.colors.primary,
    },
    {
      title: 'Progress',
      icon: 'chart-line',
      description: 'Track your GPA',
      color: theme.colors.primary,
    },
    {
      title: 'Emergency',
      icon: 'phone-alert',
      description: 'Quick assistance',
      color: theme.colors.primary,
    },
  ];

  const highlights = [
    { icon: 'file-document-outline', label: 'Assignments', value: 5, color: theme.colors.primary },
    { icon: 'star-outline', label: 'GPA', value: 3.8, color: theme.colors.secondary },
    { icon: 'clock-outline', label: 'Hours Studied', value: 12, color: theme.colors.tertiary },
  ];

  const recentActivities = [
    { text: '3 new assignments posted', time: '2 hours ago', type: 'assignment', icon: 'file-document-outline', color: theme.colors.primary },
    { text: 'CS Society meeting tomorrow', time: '1 day ago', type: 'event', icon: 'calendar-outline', color: theme.colors.secondary },
    { text: '2 job postings available', time: '2 days ago', type: 'job', icon: 'briefcase-outline', color: theme.colors.tertiary },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View style={[styles.gradientHeader, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.headerContent}>
            <View style={styles.welcomeSection}>
              <Title style={styles.welcomeTitle}>Good Morning, Yonali!</Title>
              <Paragraph style={styles.welcomeSubtitle}>
                Here's what's happening today
                </Paragraph>
            </View>
            <Avatar.Image
              size={64}
              source={require('../../assets/images/icon.png')}
              style={styles.avatar}
              />
            </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          {quickActions.map((action, index) => (
            <Card key={index} style={[styles.quickActionCard, { backgroundColor: action.color }]} elevation={4}>
              <Card.Content style={styles.quickActionContent}>
                <MaterialCommunityIcons name={action.icon} size={28} color={theme.colors.onPrimary} style={styles.quickActionIcon} />
                <Paragraph style={styles.quickActionLabel}>{action.title}</Paragraph>
                <Paragraph style={styles.quickActionDesc}>{action.description}</Paragraph>
          </Card.Content>
        </Card>
          ))}
        </View>

        {/* Highlights Card */}
        <Card style={styles.highlightsCard} elevation={3}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Today’s Highlights</Title>
            <View style={styles.highlightsRow}>
              {highlights.map((item, idx) => (
                <View key={idx} style={styles.highlightItem}>
                  <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
                  <Title style={styles.highlightValue}>{item.value}</Title>
                  <Paragraph style={styles.highlightLabel}>{item.label}</Paragraph>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Recent Activity Timeline */}
        <Card style={styles.sectionCard} elevation={2}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Recent Activity</Title>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIconWrap}>
                  <MaterialCommunityIcons name={activity.icon} size={22} color={activity.color} />
                </View>
                <View style={styles.activityTextWrap}>
                  <Paragraph style={styles.activityText}>{activity.text}</Paragraph>
                  <View style={styles.activityMetaRow}>
                    <Chip style={[styles.activityChip, { backgroundColor: activity.color, opacity: 0.1 }]} textStyle={{ color: activity.color, fontSize: 10 }}>
                      {activity.type}
                    </Chip>
                    <Paragraph style={styles.activityTime}>{activity.time}</Paragraph>
                  </View>
                </View>
              </View>
            ))}
            <Button
              mode="outlined"
              onPress={() => console.log('View all activities')}
              style={styles.viewAllButton}
              labelStyle={styles.viewAllButtonLabel}
            >
              View All
            </Button>
          </Card.Content>
        </Card>

        <View style={{ height: 32 }} />
      </ScrollView>
      <EmergencyButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  gradientHeader: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 16,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeTitle: {
    color: theme.colors.onPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: theme.colors.onPrimary,
    opacity: 0.9,
    fontSize: 16,
  },
  avatar: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 20,
    gap: 12,
  },
  quickActionCard: {
    width: '47%',
    borderRadius: 18,
    marginBottom: 12,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.outline, // was '#000', now using theme color
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  quickActionContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickActionIcon: {
    marginBottom: 8,
  },
  quickActionLabel: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  quickActionDesc: {
    color: theme.colors.onPrimary,
    fontSize: 12,
    opacity: 0.85,
    textAlign: 'center',
  },
  highlightsCard: {
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    elevation: 3,
  },
  highlightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  highlightItem: {
    alignItems: 'center',
    flex: 1,
  },
  highlightValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 2,
  },
  highlightLabel: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.colors.onSurface,
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityText: {
    color: theme.colors.onSurface,
    fontSize: 14,
    marginBottom: 2,
  },
  activityMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityChip: {
    marginRight: 8,
    borderRadius: 14,
    height: 32,
    paddingVertical: 0,
  },
  activityTime: {
    fontSize: 11,
    color: theme.colors.onSurfaceVariant,
    opacity: 0.8,
  },
  viewAllButton: {
    marginTop: 12,
    borderRadius: 12,
    borderColor: theme.colors.primary,
  },
  viewAllButtonLabel: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
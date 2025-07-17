import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Switch, Divider, List, Surface } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { theme } from '@/theme/theme';

export default function SettingsScreen() {
  const { isOffline, setIsOffline } = useAppContext();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Surface style={styles.header}>
          <Title style={styles.headerTitle}>Settings</Title>
          <Paragraph style={styles.headerSubtitle}>Customize your experience</Paragraph>
        </Surface>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>App Preferences</Title>
            <List.Item
              title="Language"
              description="Switch between English and Sinhala"
              left={props => <List.Icon {...props} icon="translate" />}
              right={() => <LanguageToggle />}
            />
            <Divider style={styles.divider} />
            <List.Item
              title="Offline Mode"
              description={isOffline ? 'Using cached data' : 'Connected to internet'}
              left={props => <List.Icon {...props} icon="wifi-off" />}
              right={() => (
                <Switch
                  value={isOffline}
                  onValueChange={setIsOffline}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>About</Title>
            <List.Item
              title="Version"
              description="1.0.0"
              left={props => <List.Icon {...props} icon="information" />}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    backgroundColor: theme.colors.primary,
    marginBottom: 16,
  },
  headerTitle: {
    color: theme.colors.surface,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: theme.colors.surface,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.onSurface,
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    marginVertical: 8,
  },
}); 
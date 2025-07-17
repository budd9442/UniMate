import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Switch, Divider, List, Surface } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { LanguageToggle } from '@/components/LanguageToggle';

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
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    backgroundColor: '#3b82f6',
    marginBottom: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1e293b',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    marginVertical: 8,
  },
}); 
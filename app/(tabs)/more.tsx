import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Surface, Title } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { theme } from '@/theme/theme';

export default function MoreScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <Title style={styles.headerTitle}>More</Title>
      </Surface>
      <List.Section>
        <List.Item
          title="Clubs"
          left={props => <List.Icon {...props} icon="account-group-outline" />}
          onPress={() => router.push('/more-screens/clubs')}
        />
        <List.Item
          title="Complaints"
          left={props => <List.Icon {...props} icon="alert-circle-outline" />}
          onPress={() => router.push('/more-screens/complaints')}
        />
        <List.Item
          title="Jobs"
          left={props => <List.Icon {...props} icon="briefcase-outline" />}
          onPress={() => router.push('/more-screens/jobs')}
        />
        <List.Item
          title="Lost & Found"
          left={props => <List.Icon {...props} icon="magnify" />}
          onPress={() => router.push('/more-screens/lost-found')}
        />
        <List.Item
          title="Settings"
          left={props => <List.Icon {...props} icon="cog-outline" />}
          onPress={() => router.push('/more-screens/settings')}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: theme.colors.primary,
    marginBottom: 16,
  },
  headerTitle: {
    color: theme.colors.surface,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 
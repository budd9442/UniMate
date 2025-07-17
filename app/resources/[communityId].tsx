import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Chip, Avatar, Surface } from 'react-native-paper';
import { mockCommunities } from '@/services/mockData';
import { theme } from '@/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommunityResourcesScreen() {
  const { communityId } = useLocalSearchParams();
  const community = mockCommunities.find(c => c.id === communityId);
  const [searchQuery, setSearchQuery] = useState('');

  if (!community) {
    return (
      <View style={styles.container}>
        <Title>Community not found</Title>
      </View>
    );
  }

  const filteredResources = community.resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <Surface style={styles.header}>
          <View style={styles.headerRow}>
            <Avatar.Image size={48} source={{ uri: community.image }} />
            <View style={styles.headerInfo}>
              <Title style={styles.title}>{community.name}</Title>
              <Paragraph style={styles.subtitle}>{community.description}</Paragraph>
              <View style={styles.communityMeta}>
                <MaterialCommunityIcons name="account-group" size={16} color={theme.colors.onSurfaceVariant} />
                <Paragraph style={styles.memberCount}>{community.memberCount} members</Paragraph>
              </View>
            </View>
          </View>
        </Surface>

        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Upcoming Community Notifications</Title>
          <Paragraph style={styles.placeholder}>No upcoming notifications.</Paragraph>
        </View>

        <View style={styles.section}>
          <Searchbar
            placeholder={`Search ${community.name} resources...`}
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
          <Title style={styles.sectionTitle}>Community Files ({filteredResources.length})</Title>
          {filteredResources.map((resource) => (
            <Card key={resource.id} style={styles.resourceCard}>
              <Card.Content>
                <View style={styles.resourceHeader}>
                  <MaterialCommunityIcons 
                    name={resource.type === 'PDF' ? 'file-pdf-box' : 'folder-zip'} 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                  <View style={styles.resourceInfo}>
                    <Title style={styles.resourceTitle}>{resource.title}</Title>
                    <Paragraph style={styles.resourceDescription}>{resource.description}</Paragraph>
                  </View>
                </View>
                <View style={styles.resourceMeta}>
                  <Paragraph style={styles.resourceMetaText}>
                    By {resource.uploadedBy} • {resource.uploadedAt} • {resource.downloads} downloads • {resource.fileSize}
                  </Paragraph>
                </View>
                <View style={styles.resourceActions}>
                  <Button
                    mode="contained"
                    onPress={() => Alert.alert('Download', `Downloading ${resource.title}...`)}
                    style={styles.actionButton}
                    icon="download"
                  >
                    Download
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => Alert.alert('Share', `Sharing ${resource.title}...`)}
                    style={styles.actionButton}
                    icon="share"
                  >
                    Share
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: theme.colors.primary,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: theme.colors.onPrimary,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colors.onPrimary,
    opacity: 0.9,
  },
  communityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    color: theme.colors.onPrimary,
    marginLeft: 4,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 18,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  placeholder: {
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  searchbar: {
    backgroundColor: theme.colors.surface,
    marginBottom: 12,
  },
  resourceCard: {
    marginBottom: 12,
    backgroundColor: theme.colors.surfaceVariant,
  },
  resourceHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  resourceInfo: {
    flex: 1,
    marginLeft: 8,
  },
  resourceTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  resourceDescription: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  resourceTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tagChip: {
    marginRight: 4,
    marginBottom: 4,
    height: 24,
    borderRadius: 12,
  },
  resourceMeta: {
    marginBottom: 8,
  },
  resourceMetaText: {
    fontSize: 11,
    color: theme.colors.onSurfaceVariant,
  },
  resourceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
}); 
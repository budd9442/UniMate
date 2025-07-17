import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Chip, FAB, Portal, Modal, TextInput, Menu, Avatar, Surface } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { mockCommunities } from '@/services/mockData';
import { theme } from '@/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

export default function ResourcesScreen() {
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadCommunity, setUploadCommunity] = useState('');
  const [communityMenuVisible, setCommunityMenuVisible] = useState(false);
  const [expandedCommunity, setExpandedCommunity] = useState<string | null>(null);
  const [communitySearch, setCommunitySearch] = useState<{ [communityId: string]: string }>({});
  const { translations, isOffline } = useAppContext();
  const router = useRouter();

  // Get all unique tags from all communities
  const allTags = Array.from(new Set(
    mockCommunities.flatMap(community => 
      community.resources.flatMap(resource => resource.tags)
    )
  ));

  // Get all communities for the menu
  const allCommunities = ['All', ...mockCommunities.map(c => c.name)];

  // Filter communities based on tag filter
  const filteredCommunities = mockCommunities.filter(community => {
    const matchesCommunity = selectedCommunity === 'All' || community.name === selectedCommunity;
    const matchesTags = selectedTags.length === 0 || 
      community.resources.some(resource => 
        selectedTags.some(tag => resource.tags.includes(tag))
      );
    return matchesCommunity && matchesTags;
  });

  // Example mock notifications for demonstration
  const mockNotifications: Record<string, { id: string; text: string; date: string }[]> = {
    '1': [
      { id: 'n1', text: 'Exam schedule released', date: '2024-06-01' },
      { id: 'n2', text: 'Project submission deadline extended', date: '2024-05-28' },
    ],
    '2': [
      { id: 'n3', text: 'Guest lecture on AI tomorrow', date: '2024-06-02' },
    ],
    '3': [],
    '4': [],
  };

  const handleUpload = () => {
    if (!uploadTitle.trim() || !uploadCommunity.trim() || uploadCommunity === 'All') {
      Alert.alert('Error', 'Please fill in all required fields and select a community');
      return;
    }
    Alert.alert(
      'Upload Successful',
      'Your resource has been uploaded successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowUploadModal(false);
            setUploadTitle('');
            setUploadDescription('');
            setUploadTags('');
            setUploadCommunity('');
          },
        },
      ]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleExpand = (communityId: string) => {
    setExpandedCommunity(prev => (prev === communityId ? null : communityId));
  };

  const handleCommunitySearch = (communityId: string, query: string) => {
    setCommunitySearch(prev => ({ ...prev, [communityId]: query }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <Surface style={styles.header}>
          <Title style={styles.title}>Communities</Title>
          <Paragraph style={styles.subtitle}>Connect and share within your communities</Paragraph>
        {isOffline && (
          <Paragraph style={styles.offlineText}>{translations.offlineData}</Paragraph>
        )}
        </Surface>

        {/* Community Filter */}
        <View style={styles.filterSection}>
          <Paragraph style={styles.filterLabel}>Communities:</Paragraph>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {allCommunities.map((community) => (
          <Chip
                key={community}
                selected={selectedCommunity === community}
                onPress={() => setSelectedCommunity(community)}
                style={styles.filterChip}
          >
                {community}
          </Chip>
        ))}
      </ScrollView>
        </View>

        {/* Flat Community Cards */}
        <View style={styles.contentContainer}>
          {filteredCommunities.slice(0, 2).map((community) => (
            <Card key={community.id} style={styles.communityCard}>
            <Card.Content>
                <View style={styles.communityHeader}>
                  <Avatar.Image size={56} source={{ uri: community.image }} />
                  <View style={styles.communityInfo}>
                    <Title style={styles.communityName}>{community.name}</Title>
                    <Paragraph style={styles.communityDescription}>{community.description}</Paragraph>
                    <View style={styles.communityMeta}>
                      <MaterialCommunityIcons name="account-group" size={16} color={theme.colors.onSurfaceVariant} />
                      <Paragraph style={styles.memberCount}>{community.memberCount} members</Paragraph>
                    </View>
                  </View>
                </View>
                {/* Latest 2 files/resources preview */}
                <View style={styles.previewSection}>
                  <Paragraph style={styles.previewLabel}>Latest Files</Paragraph>
                  {community.resources.slice(0, 2).map((resource) => (
                    <View key={resource.id} style={styles.previewResourceRow}>
                      <MaterialCommunityIcons
                        name={resource.type === 'PDF' ? 'file-pdf-box' : 'folder-zip'}
                        size={22}
                        color={theme.colors.primary}
                        style={{ marginRight: 8 }}
                      />
                      <View style={{ flex: 1 }}>
                        <Paragraph style={styles.previewResourceTitle}>{resource.title}</Paragraph>
                        <Paragraph style={styles.previewResourceMeta}>
                          By {resource.uploadedBy} • {resource.uploadedAt}
              </Paragraph>
                      </View>
                    </View>
                  ))}
                  {community.resources.length > 2 && (
                <Button
                      mode="text"
                      onPress={() => router.push({ pathname: '/resources/[communityId]', params: { communityId: community.id } })}
                      style={styles.viewAllButton}
                      icon="chevron-right"
                    >
                      View All
                </Button>
                  )}
                </View>
                {/* Notifications preview */}
                <View style={styles.previewSection}>
                  <Paragraph style={styles.previewLabel}>Notifications</Paragraph>
                  {(mockNotifications[community.id as string] && mockNotifications[community.id as string].length > 0) ? (
                    mockNotifications[community.id as string].slice(0, 2).map((notif) => (
                      <View key={notif.id} style={styles.previewNotificationRow}>
                        <MaterialCommunityIcons name="bell-outline" size={20} color={theme.colors.secondary} style={{ marginRight: 8 }} />
                        <View style={{ flex: 1 }}>
                          <Paragraph style={styles.previewNotificationText}>{notif.text}</Paragraph>
                          <Paragraph style={styles.previewNotificationMeta}>{notif.date}</Paragraph>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Paragraph style={styles.previewNotificationEmpty}>No notifications</Paragraph>
                  )}
                </View>
                {/* Card click anywhere also navigates */}
                <Button
                  mode="outlined"
                  onPress={() => router.push({ pathname: '/resources/[communityId]', params: { communityId: community.id } })}
                  style={styles.cardActionButton}
                  icon="arrow-right"
                >
                  Open Community
                </Button>
            </Card.Content>
          </Card>
        ))}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        label="Upload Resource"
        style={styles.fab}
        onPress={() => setShowUploadModal(true)}
      />

      <Portal>
        <Modal
          visible={showUploadModal}
          onDismiss={() => setShowUploadModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <Title style={styles.modalTitle}>Upload Resource</Title>
              <TextInput
                label="Title *"
                value={uploadTitle}
                onChangeText={setUploadTitle}
                mode="outlined"
                style={styles.input}
              />
              <Menu
                visible={communityMenuVisible}
                onDismiss={() => setCommunityMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setCommunityMenuVisible(true)}
                    style={styles.categoryButton}
                  >
                    {uploadCommunity || 'Select Community *'}
                  </Button>
                }
              >
                {mockCommunities.map((community) => (
                  <Menu.Item
                    key={community.id}
                    onPress={() => {
                      setUploadCommunity(community.name);
                      setCommunityMenuVisible(false);
                    }}
                    title={community.name}
                  />
                ))}
              </Menu>
              <TextInput
                label="Description"
                value={uploadDescription}
                onChangeText={setUploadDescription}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
              />
              <TextInput
                label="Tags (comma separated)"
                value={uploadTags}
                onChangeText={setUploadTags}
                mode="outlined"
                style={styles.input}
                placeholder="e.g., Notes, PDF, Tutorial"
              />
              <View style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={() => setShowUploadModal(false)}
                  style={styles.modalButton}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleUpload}
                  style={styles.modalButton}
                >
                  Upload
                </Button>
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
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
  title: {
    color: theme.colors.onPrimary,
    marginBottom: 4,
    fontSize: 26, // was default, now larger
  },
  subtitle: {
    color: theme.colors.onPrimary,
    opacity: 0.9,
    fontSize: 18, // was default, now larger
  },
  offlineText: {
    color: theme.colors.warning,
    fontSize: 14, // was 12
    marginTop: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchbar: {
    backgroundColor: theme.colors.surface,
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabel: {
    paddingHorizontal: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: theme.colors.onSurface,
    fontSize: 18, // was default, now larger
  },
  filterScroll: {
    paddingHorizontal: 8,
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 14,
    height: 32,
    paddingVertical: 0,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  communityCard: {
    marginBottom: 20,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  communityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  communityName: {
    fontSize: 22, // was 18
    marginBottom: 4,
    fontWeight: 'bold',
  },
  communityDescription: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
    fontSize: 16, // was default, now larger
  },
  communityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 14, // was 12
    color: theme.colors.onSurfaceVariant,
    marginLeft: 4,
  },
  expandButton: {
    marginLeft: 10,
  },
  resourcesSection: {
    marginTop: 8,
  },
  resourcesTitle: {
    fontSize: 20, // was 16
    marginBottom: 12,
    color: theme.colors.onSurface,
    fontWeight: 'bold',
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
    fontSize: 18, // was 14
    marginBottom: 2,
    fontWeight: 'bold',
  },
  resourceDescription: {
    fontSize: 15, // was 12
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  modalContainer: {
    backgroundColor: theme.colors.modalOverlay, // was 'rgba(0, 0, 0, 0.5)'
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: theme.colors.surface,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  categoryButton: {
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  previewSection: {
    marginTop: 16,
    marginBottom: 16,
  },
  previewLabel: {
    fontSize: 16, // was 14
    fontWeight: '600',
    marginBottom: 8,
    color: theme.colors.onSurface,
  },
  previewResourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewResourceTitle: {
    fontSize: 15, // was 13
    fontWeight: '500',
    color: theme.colors.onSurface,
  },
  previewResourceMeta: {
    fontSize: 13, // was 11
    color: theme.colors.onSurfaceVariant,
  },
  viewAllButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  cardActionButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  previewNotificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewNotificationText: {
    fontSize: 15, // was 13
    fontWeight: '500',
    color: theme.colors.onSurface,
  },
  previewNotificationMeta: {
    fontSize: 13, // was 11
    color: theme.colors.onSurfaceVariant,
  },
  previewNotificationEmpty: {
    fontSize: 15, // was 13
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
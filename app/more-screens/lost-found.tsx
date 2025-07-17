import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Chip, FAB, Portal, Modal, TextInput, RadioButton } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { mockLostFound } from '@/services/mockData';
import { theme } from '@/theme/theme';

export default function LostFoundScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [postContact, setPostContact] = useState('');
  const [postCategory, setPostCategory] = useState('lost');
  const { translations, isOffline } = useAppContext();

  const categories = ['All', 'lost', 'found'];

  const filteredItems = mockLostFound.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostItem = () => {
    if (!postTitle.trim() || !postDescription.trim() || !postLocation.trim() || !postContact.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Item Posted',
      `Your ${postCategory} item has been posted successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowPostModal(false);
            setPostTitle('');
            setPostDescription('');
            setPostLocation('');
            setPostContact('');
            setPostCategory('lost');
          },
        },
      ]
    );
  };

  const handleContactOwner = (title: string, contact: string) => {
    Alert.alert(
      'Contact Owner',
      `Contact information for "${title}":\n\n${contact}`,
      [
        {
          text: 'Close',
        },
        {
          text: 'Send Message',
          onPress: () => {
            Alert.alert('Message Sent', 'Your message has been sent to the owner.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Lost & Found</Title>
        {isOffline && (
          <Paragraph style={styles.offlineText}>{translations.offlineData}</Paragraph>
        )}
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search items..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryChip}
          >
            {category === 'All' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView style={styles.itemsList}>
        {filteredItems.map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Card.Content>
              <View style={styles.itemHeader}>
                <Title style={styles.itemTitle}>{item.title}</Title>
                <Chip
                  style={[
                    styles.statusChip,
                    { backgroundColor: item.category === 'lost' ? theme.colors.error : theme.colors.success }
                  ]}
                  textStyle={{ color: theme.colors.surface }}
                >
                  {item.category.toUpperCase()}
                </Chip>
              </View>
              
              <Paragraph style={styles.itemDescription}>{item.description}</Paragraph>
              
              <View style={styles.itemDetails}>
                <Paragraph style={styles.detailItem}>
                  📍 {item.location}
                </Paragraph>
                <Paragraph style={styles.detailItem}>
                  📅 {item.date}
                </Paragraph>
              </View>

              <View style={styles.itemActions}>
                <Button
                  mode="contained"
                  onPress={() => handleContactOwner(item.title, item.contact)}
                  style={styles.actionButton}
                >
                  Contact Owner
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => Alert.alert('Share', `Sharing ${item.title}...`)}
                  style={styles.actionButton}
                >
                  {translations.share}
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        label={translations.postItem}
        style={styles.fab}
        onPress={() => setShowPostModal(true)}
      />

      <Portal>
        <Modal
          visible={showPostModal}
          onDismiss={() => setShowPostModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <Title style={styles.modalTitle}>Post Lost/Found Item</Title>
              
              <View style={styles.categorySelector}>
                <Paragraph style={styles.selectorTitle}>Item Status:</Paragraph>
                <RadioButton.Group
                  onValueChange={setPostCategory}
                  value={postCategory}
                >
                  <View style={styles.radioRow}>
                    <View style={styles.radioItem}>
                      <RadioButton value="lost" />
                      <Paragraph>Lost</Paragraph>
                    </View>
                    <View style={styles.radioItem}>
                      <RadioButton value="found" />
                      <Paragraph>Found</Paragraph>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <TextInput
                label="Title *"
                value={postTitle}
                onChangeText={setPostTitle}
                mode="outlined"
                style={styles.input}
              />

              <TextInput
                label="Description *"
                value={postDescription}
                onChangeText={setPostDescription}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
              />

              <TextInput
                label="Location *"
                value={postLocation}
                onChangeText={setPostLocation}
                mode="outlined"
                style={styles.input}
              />

              <TextInput
                label="Contact Information *"
                value={postContact}
                onChangeText={setPostContact}
                mode="outlined"
                style={styles.input}
              />

              <View style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={() => setShowPostModal(false)}
                  style={styles.modalButton}
                >
                  {translations.cancel}
                </Button>
                <Button
                  mode="contained"
                  onPress={handlePostItem}
                  style={styles.modalButton}
                >
                  Post Item
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
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  title: {
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  offlineText: {
    color: theme.colors.warning,
    fontSize: 12,
  },
  searchContainer: {
    padding: 16,
  },
  searchbar: {
    backgroundColor: theme.colors.surface,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
    borderRadius: 14,
    height: 32,
    paddingVertical: 0,
  },
  itemsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 12,
  },
  itemTitle: {
    fontSize: 16,
    flex: 1,
  },
  statusChip: {
    marginLeft: 8,
    borderRadius: 14,
    height: 32,
    paddingVertical: 0,
  },
  itemDescription: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
    lineHeight: 20,
  },
  itemDetails: {
    marginBottom: 16,
  },
  detailItem: {
    fontSize: 14,
    marginBottom: 4,
    color: theme.colors.onSurfaceVariant,
  },
  itemActions: {
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
    backgroundColor: (theme.colors as any).modalOverlay, // type workaround for modalOverlay
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
  categorySelector: {
    marginBottom: 16,
  },
  selectorTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
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
});
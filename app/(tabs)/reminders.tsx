import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Portal, Modal, TextInput, Menu, Chip } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { mockReminders } from '@/services/mockData';
import { theme } from '@/theme/theme';

export default function RemindersScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newCategory, setNewCategory] = useState('assignment');
  const [priorityMenuVisible, setPriorityMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const { translations, isOffline } = useAppContext();

  const priorities = ['high', 'medium', 'low'];
  const categories = ['assignment', 'event', 'exam', 'meeting'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const handleAddReminder = () => {
    if (!newTitle.trim() || !newDueDate.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Reminder Added',
      'Your reminder has been added successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowAddModal(false);
            setNewTitle('');
            setNewDescription('');
            setNewDueDate('');
            setNewPriority('medium');
            setNewCategory('assignment');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>{translations.reminders}</Title>
        {isOffline && (
          <Paragraph style={styles.offlineText}>{translations.offlineData}</Paragraph>
        )}
      </View>

      <ScrollView style={styles.remindersList} contentContainerStyle={{ paddingBottom: 120 }}>
        {mockReminders.map((reminder) => (
          <Card key={reminder.id} style={styles.reminderCard}>
            <Card.Content>
              <View style={styles.reminderHeader}>
                <Title style={styles.reminderTitle}>{reminder.title}</Title>
                <Chip
                  style={[styles.priorityChip, { backgroundColor: getPriorityColor(reminder.priority) }]}
                  textStyle={{ color: theme.colors.surface }}
                >
                  {reminder.priority.toUpperCase()}
                </Chip>
              </View>
              <Paragraph style={styles.reminderDescription}>{reminder.description}</Paragraph>
              <View style={styles.reminderMeta}>
                <Paragraph style={styles.reminderDate}>Due: {reminder.dueDate}</Paragraph>
                <Paragraph style={styles.reminderCategory}>{reminder.category}</Paragraph>
              </View>
              <View style={styles.reminderActions}>
                <Button
                  mode="contained"
                  onPress={() => Alert.alert('Mark Complete', `Marking ${reminder.title} as complete...`)}
                  style={styles.actionButton}
                >
                  Mark Complete
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => Alert.alert('Edit', `Editing ${reminder.title}...`)}
                  style={styles.actionButton}
                >
                  {translations.edit}
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        label={translations.addReminder}
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      />

      <Portal>
        <Modal
          visible={showAddModal}
          onDismiss={() => setShowAddModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <Title style={styles.modalTitle}>Add Reminder</Title>
              
              <TextInput
                label="Title *"
                value={newTitle}
                onChangeText={setNewTitle}
                mode="outlined"
                style={styles.input}
              />

              <TextInput
                label="Description"
                value={newDescription}
                onChangeText={setNewDescription}
                mode="outlined"
                multiline
                numberOfLines={3}
                style={styles.input}
              />

              <TextInput
                label="Due Date (YYYY-MM-DD) *"
                value={newDueDate}
                onChangeText={setNewDueDate}
                mode="outlined"
                style={styles.input}
              />

              <Menu
                visible={priorityMenuVisible}
                onDismiss={() => setPriorityMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setPriorityMenuVisible(true)}
                    style={styles.menuButton}
                  >
                    Priority: {newPriority}
                  </Button>
                }
              >
                {priorities.map((priority) => (
                  <Menu.Item
                    key={priority}
                    onPress={() => {
                      setNewPriority(priority);
                      setPriorityMenuVisible(false);
                    }}
                    title={priority}
                  />
                ))}
              </Menu>

              <Menu
                visible={categoryMenuVisible}
                onDismiss={() => setCategoryMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setCategoryMenuVisible(true)}
                    style={styles.menuButton}
                  >
                    Category: {newCategory}
                  </Button>
                }
              >
                {categories.map((category) => (
                  <Menu.Item
                    key={category}
                    onPress={() => {
                      setNewCategory(category);
                      setCategoryMenuVisible(false);
                    }}
                    title={category}
                  />
                ))}
              </Menu>

              <View style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={() => setShowAddModal(false)}
                  style={styles.modalButton}
                >
                  {translations.cancel}
                </Button>
                <Button
                  mode="contained"
                  onPress={handleAddReminder}
                  style={styles.modalButton}
                >
                  Add Reminder
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
  remindersList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  reminderCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reminderTitle: {
    fontSize: 16,
    flex: 1,
  },
  priorityChip: {
    marginLeft: 8,
    borderRadius: 14,
    height: 32,
    paddingVertical: 0,
  },
  reminderDescription: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
  },
  reminderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reminderDate: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  reminderCategory: {
    color: theme.colors.primary,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  reminderActions: {
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
  input: {
    marginBottom: 16,
  },
  menuButton: {
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
});
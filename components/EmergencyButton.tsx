import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { FAB, Portal, Modal, Card, Title, Paragraph, Button, TextInput, RadioButton } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { theme } from '@/theme/theme';

export const EmergencyButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [emergencyType, setEmergencyType] = useState('medical');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const { translations } = useAppContext();

  const handleEmergencySubmit = () => {
    if (!description.trim() || !contactInfo.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Mock emergency submission
    Alert.alert(
      'Emergency Request Sent',
      'Your emergency request has been submitted. Help is on the way.',
      [
        {
          text: 'OK',
          onPress: () => {
            setVisible(false);
            setDescription('');
            setContactInfo('');
            setEmergencyType('medical');
          },
        },
      ]
    );
  };

  return (
    <>
      <FAB
        icon="phone"
        label="Emergency"
        style={styles.fab}
        color={theme.colors.surface}
        onPress={() => setVisible(true)}
      />
      
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Emergency Help Request</Title>
              <Paragraph style={styles.subtitle}>
                Please describe your emergency and provide contact information
              </Paragraph>

              <View style={styles.section}>
                <Paragraph style={styles.sectionTitle}>Emergency Type:</Paragraph>
                <RadioButton.Group
                  onValueChange={setEmergencyType}
                  value={emergencyType}
                >
                  <View style={styles.radioItem}>
                    <RadioButton value="medical" />
                    <Paragraph>Medical Emergency</Paragraph>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="safety" />
                    <Paragraph>Safety Concern</Paragraph>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="harassment" />
                    <Paragraph>Harassment/Ragging</Paragraph>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="other" />
                    <Paragraph>Other</Paragraph>
                  </View>
                </RadioButton.Group>
              </View>

              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={styles.input}
                mode="outlined"
              />

              <TextInput
                label="Your Contact Information"
                value={contactInfo}
                onChangeText={setContactInfo}
                style={styles.input}
                mode="outlined"
              />

              <View style={styles.buttonContainer}>
                <Button
                  mode="outlined"
                  onPress={() => setVisible(false)}
                  style={styles.button}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleEmergencySubmit}
                  style={styles.button}
                  buttonColor={theme.colors.error}
                >
                  Send Emergency Request
                </Button>
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 4,
    backgroundColor: theme.colors.error,
  },
  modalContainer: {
    backgroundColor: (theme.colors as any).modalOverlay, // type workaround for modalOverlay
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
  },
  title: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colors.onSurfaceVariant,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
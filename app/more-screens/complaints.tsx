import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Portal, Modal, TextInput, RadioButton, Checkbox, Surface } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { theme } from '@/theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ComplaintsScreen() {
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintType, setComplaintType] = useState('ragging');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [contactInfo, setContactInfo] = useState('');
  const { translations, isOffline } = useAppContext();

  const complaintTypes = [
    { value: 'ragging', label: 'Ragging' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'discrimination', label: 'Discrimination' },
    { value: 'bullying', label: 'Bullying' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmitComplaint = () => {
    if (!complaintDescription.trim() || !location.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!isAnonymous && !contactInfo.trim()) {
      Alert.alert('Error', 'Please provide contact information or select anonymous reporting');
      return;
    }
    Alert.alert(
      'Complaint Submitted',
      'Your complaint has been submitted successfully. It will be reviewed by the appropriate authorities.',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowComplaintModal(false);
            setComplaintDescription('');
            setLocation('');
            setContactInfo('');
            setComplaintType('ragging');
            setIsAnonymous(true);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[theme.colors.error, theme.colors.errorContainer]}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons name="alert-circle-outline" size={32} color={theme.colors.onPrimary} style={{ marginRight: 12 }} />
        <Title style={styles.title}>Anonymous Complaints</Title>
        </View>
        {isOffline && (
          <Paragraph style={styles.offlineText}>{translations.offlineData}</Paragraph>
        )}
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 32 }}>
        <Card style={styles.infoCard} elevation={3}>
          <Card.Content>
            <Title style={styles.infoTitle}>Safe Reporting</Title>
            <Paragraph style={styles.infoText}>
              This platform provides a safe space to report incidents of ragging, harassment, 
              and other concerning behaviors. Your identity will be protected if you choose 
              anonymous reporting.
            </Paragraph>
            <View style={styles.infoPoints}>
              <View style={styles.infoPointRow}><MaterialCommunityIcons name="lock-outline" size={18} color={theme.colors.primary} /><Paragraph style={styles.infoPoint}>Your privacy is protected</Paragraph></View>
              <View style={styles.infoPointRow}><MaterialCommunityIcons name="lightning-bolt-outline" size={18} color={theme.colors.warning} /><Paragraph style={styles.infoPoint}>Fast response from authorities</Paragraph></View>
              <View style={styles.infoPointRow}><MaterialCommunityIcons name="phone-in-talk-outline" size={18} color={theme.colors.success} /><Paragraph style={styles.infoPoint}>24/7 support available</Paragraph></View>
              <View style={styles.infoPointRow}><MaterialCommunityIcons name="shield-check-outline" size={18} color={theme.colors.secondary} /><Paragraph style={styles.infoPoint}>All reports are taken seriously</Paragraph></View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.emergencyCard} elevation={2}>
          <Card.Content>
            <Title style={styles.emergencyTitle}>Emergency Contacts</Title>
            <View style={styles.emergencyContact}><MaterialCommunityIcons name="security" size={18} color={theme.colors.primary} /><Paragraph style={styles.contactTitle}>University Security</Paragraph><Paragraph style={styles.contactNumber}>+94 11 234 5678</Paragraph></View>
            <View style={styles.emergencyContact}><MaterialCommunityIcons name="account-heart-outline" size={18} color={theme.colors.secondary} /><Paragraph style={styles.contactTitle}>Student Counseling</Paragraph><Paragraph style={styles.contactNumber}>+94 11 234 5679</Paragraph></View>
            <View style={styles.emergencyContact}><MaterialCommunityIcons name="shield-alert-outline" size={18} color={theme.colors.error} /><Paragraph style={styles.contactTitle}>Anti-Ragging Unit</Paragraph><Paragraph style={styles.contactNumber}>+94 11 234 5680</Paragraph></View>
          </Card.Content>
        </Card>

        <Card style={styles.tipsCard} elevation={2}>
          <Card.Content>
            <Title style={styles.tipsTitle}>Reporting Tips</Title>
            <Paragraph style={styles.tipText}>• Be as detailed as possible in your description</Paragraph>
            <Paragraph style={styles.tipText}>• Include date, time, and location of the incident</Paragraph>
            <Paragraph style={styles.tipText}>• If possible, include names of witnesses</Paragraph>
            <Paragraph style={styles.tipText}>• Save any evidence (screenshots, photos, etc.)</Paragraph>
            <Paragraph style={styles.tipText}>• Choose anonymous reporting if you feel unsafe</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="alert"
        label={translations.fileComplaint}
        style={styles.fab}
        onPress={() => setShowComplaintModal(true)}
        color={theme.colors.onPrimary}
      />

      <Portal>
        <Modal
          visible={showComplaintModal}
          onDismiss={() => setShowComplaintModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView>
            <Card style={styles.modalCard} elevation={3}>
              <Card.Content>
                <Title style={styles.modalTitle}>File a Complaint</Title>
                <View style={styles.typeSelector}>
                  <Paragraph style={styles.selectorTitle}>Type of Complaint:</Paragraph>
                  <RadioButton.Group
                    onValueChange={setComplaintType}
                    value={complaintType}
                  >
                    {complaintTypes.map((type) => (
                      <View key={type.value} style={styles.radioItem}>
                        <RadioButton value={type.value} />
                        <Paragraph>{type.label}</Paragraph>
                      </View>
                    ))}
                  </RadioButton.Group>
                </View>
                <TextInput
                  label="Description *"
                  value={complaintDescription}
                  onChangeText={setComplaintDescription}
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                  placeholder="Please provide detailed information about the incident..."
                />
                <TextInput
                  label="Location *"
                  value={location}
                  onChangeText={setLocation}
                  mode="outlined"
                  style={styles.input}
                  placeholder="Where did this incident occur?"
                />
                <View style={styles.anonymousSection}>
                  <Checkbox.Item
                    label="Submit anonymously"
                    status={isAnonymous ? 'checked' : 'unchecked'}
                    onPress={() => setIsAnonymous(!isAnonymous)}
                    style={styles.checkbox}
                  />
                  <Paragraph style={styles.anonymousText}>
                    Anonymous complaints are handled with the same priority but may limit 
                    follow-up communication.
                  </Paragraph>
                </View>
                {!isAnonymous && (
                  <TextInput
                    label="Contact Information *"
                    value={contactInfo}
                    onChangeText={setContactInfo}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Email or phone number (for follow-up)"
                  />
                )}
                <View style={styles.modalActions}>
                  <Button
                    mode="outlined"
                    onPress={() => setShowComplaintModal(false)}
                    style={styles.modalButton}
                  >
                    {translations.cancel}
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmitComplaint}
                    style={styles.modalButton}
                    buttonColor={theme.colors.primary}
                  >
                    {translations.submit}
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </ScrollView>
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
  gradientHeader: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 0,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: theme.colors.onPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  offlineText: {
    color: theme.colors.warning,
    fontSize: 12,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  infoCard: {
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    elevation: 3,
  },
  infoTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  infoPoints: {
    marginTop: 8,
  },
  infoPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  infoPoint: {
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
    marginLeft: 6,
  },
  emergencyCard: {
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  emergencyTitle: {
    color: theme.colors.error,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emergencyContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  contactTitle: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginRight: 8,
  },
  contactNumber: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
  },
  tipsCard: {
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  tipsTitle: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipText: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 2,
    fontSize: 13,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: theme.colors.error,
    borderRadius: 32,
    elevation: 4,
  },
  modalContainer: {
    margin: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 0,
    elevation: 4,
  },
  modalCard: {
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    elevation: 3,
  },
  modalTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 20,
  },
  typeSelector: {
    marginBottom: 12,
  },
  selectorTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.onSurface,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  input: {
    marginBottom: 12,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 8,
  },
  anonymousSection: {
    marginBottom: 12,
  },
  anonymousText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginLeft: 8,
  },
  checkbox: {
    marginLeft: -8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 2,
  },
});
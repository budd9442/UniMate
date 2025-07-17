import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Portal, Modal, TextInput, DataTable } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { mockGrades } from '@/services/mockData';
import { theme } from '@/theme/theme';

export default function ProgressScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newCredits, setNewCredits] = useState('');
  const [newSemester, setNewSemester] = useState('');
  const { translations, isOffline } = useAppContext();

  const calculateOverallGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    mockGrades.forEach(grade => {
      totalPoints += grade.gpa * grade.credits;
      totalCredits += grade.credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getGradePoints = (grade: string) => {
    const gradeMap: { [key: string]: number } = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    return gradeMap[grade] || 0.0;
  };

  const handleAddGrade = () => {
    if (!newSubject.trim() || !newGrade.trim() || !newCredits.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Grade Added',
      'Your grade has been added successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowAddModal(false);
            setNewSubject('');
            setNewGrade('');
            setNewCredits('');
            setNewSemester('');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Academic Progress</Title>
        {isOffline && (
          <Paragraph style={styles.offlineText}>{translations.offlineData}</Paragraph>
        )}
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.gpaCard}>
          <Card.Content>
            <Title style={styles.gpaTitle}>Overall GPA</Title>
            <Paragraph style={styles.gpaValue}>{calculateOverallGPA()}</Paragraph>
            <Paragraph style={styles.gpaSubtext}>Based on {mockGrades.length} subjects</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.gradesCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Grades</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Subject</DataTable.Title>
                <DataTable.Title>Grade</DataTable.Title>
                <DataTable.Title numeric>Credits</DataTable.Title>
                <DataTable.Title numeric>GPA</DataTable.Title>
              </DataTable.Header>

              {mockGrades.map((grade, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{grade.subject}</DataTable.Cell>
                  <DataTable.Cell>{grade.grade}</DataTable.Cell>
                  <DataTable.Cell numeric>{grade.credits}</DataTable.Cell>
                  <DataTable.Cell numeric>{grade.gpa.toFixed(1)}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.semesterCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Semester Breakdown</Title>
            <View style={styles.semesterItem}>
              <Paragraph style={styles.semesterName}>Fall 2023</Paragraph>
              <Paragraph style={styles.semesterGPA}>GPA: {calculateOverallGPA()}</Paragraph>
            </View>
            <View style={styles.semesterItem}>
              <Paragraph style={styles.semesterName}>Spring 2023</Paragraph>
              <Paragraph style={styles.semesterGPA}>GPA: 3.4</Paragraph>
            </View>
            <View style={styles.semesterItem}>
              <Paragraph style={styles.semesterName}>Fall 2022</Paragraph>
              <Paragraph style={styles.semesterGPA}>GPA: 3.6</Paragraph>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Statistics</Title>
            <View style={styles.statRow}>
              <Paragraph style={styles.statLabel}>Total Credits:</Paragraph>
              <Paragraph style={styles.statValue}>
                {mockGrades.reduce((sum, grade) => sum + grade.credits, 0)}
              </Paragraph>
            </View>
            <View style={styles.statRow}>
              <Paragraph style={styles.statLabel}>Subjects Completed:</Paragraph>
              <Paragraph style={styles.statValue}>{mockGrades.length}</Paragraph>
            </View>
            <View style={styles.statRow}>
              <Paragraph style={styles.statLabel}>Class Standing:</Paragraph>
              <Paragraph style={styles.statValue}>
                {calculateOverallGPA() >= '3.7' ? 'Excellent' : 
                 calculateOverallGPA() >= '3.0' ? 'Good' : 'Satisfactory'}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        label="Add Grade"
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
              <Title style={styles.modalTitle}>Add Grade</Title>
              
              <TextInput
                label="Subject *"
                value={newSubject}
                onChangeText={setNewSubject}
                mode="outlined"
                style={styles.input}
              />

              <TextInput
                label="Grade (A+, A, A-, B+, etc.) *"
                value={newGrade}
                onChangeText={setNewGrade}
                mode="outlined"
                style={styles.input}
              />

              <TextInput
                label="Credits *"
                value={newCredits}
                onChangeText={setNewCredits}
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
              />

              <TextInput
                label="Semester"
                value={newSemester}
                onChangeText={setNewSemester}
                mode="outlined"
                style={styles.input}
              />

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
                  onPress={handleAddGrade}
                  style={styles.modalButton}
                >
                  Add Grade
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  gpaCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.primaryContainer,
  },
  gpaTitle: {
    textAlign: 'center',
    color: theme.colors.onPrimaryContainer,
  },
  gpaValue: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
    marginVertical: 8,
  },
  gpaSubtext: {
    textAlign: 'center',
    color: theme.colors.onPrimaryContainer,
    fontSize: 12,
  },
  gradesCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    marginBottom: 12,
    color: theme.colors.onSurface,
  },
  semesterCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  semesterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  semesterName: {
    fontWeight: 'bold',
  },
  semesterGPA: {
    color: theme.colors.primary,
  },
  statsCard: {
    marginBottom: 100,
    backgroundColor: theme.colors.surface,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontWeight: 'bold',
  },
  statValue: {
    color: theme.colors.primary,
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
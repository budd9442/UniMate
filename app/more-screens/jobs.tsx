import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Chip } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { mockJobs } from '@/services/mockData';
import { theme } from '@/theme/theme';

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const { translations, isOffline } = useAppContext();

  const jobTypes = ['All', 'Part-time', 'Full-time', 'Internship', 'Contract'];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleApplyJob = (jobTitle: string, company: string) => {
    Alert.alert(
      'Apply for Job',
      `Are you sure you want to apply for "${jobTitle}" at ${company}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Apply',
          onPress: () => {
            Alert.alert(
              'Application Submitted',
              'Your application has been submitted successfully! You will be contacted if selected.'
            );
          },
        },
      ]
    );
  };

  const handleShareJob = (jobTitle: string) => {
    Alert.alert(
      'Share Job',
      `Job "${jobTitle}" has been shared with your network.`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Job Portal</Title>
        {isOffline && (
          <Paragraph style={styles.offlineText}>{translations.offlineData}</Paragraph>
        )}
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search jobs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
        {jobTypes.map((type) => (
          <Chip
            key={type}
            selected={selectedType === type}
            onPress={() => setSelectedType(type)}
            style={styles.typeChip}
          >
            {type}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView style={styles.jobsList}>
        {filteredJobs.map((job) => (
          <Card key={job.id} style={styles.jobCard}>
            <Card.Content>
              <View style={styles.jobHeader}>
                <Title style={styles.jobTitle}>{job.title}</Title>
                <Chip
                  style={styles.typeChip}
                  mode="outlined"
                >
                  {job.type}
                </Chip>
              </View>
              
              <Paragraph style={styles.company}>{job.company}</Paragraph>
              <Paragraph style={styles.location}>📍 {job.location}</Paragraph>
              <Paragraph style={styles.salary}>💰 {job.salary}</Paragraph>
              
              <Paragraph style={styles.description}>{job.description}</Paragraph>
              
              <View style={styles.requirements}>
                <Paragraph style={styles.requirementsTitle}>Requirements:</Paragraph>
                <Paragraph style={styles.requirementsText}>{job.requirements}</Paragraph>
              </View>

              <View style={styles.jobMeta}>
                <Paragraph style={styles.contact}>📧 {job.contact}</Paragraph>
                <Paragraph style={styles.posted}>Posted: {job.postedDate}</Paragraph>
              </View>

              <View style={styles.jobActions}>
                <Button
                  mode="contained"
                  onPress={() => handleApplyJob(job.title, job.company)}
                  style={styles.actionButton}
                >
                  {translations.apply}
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleShareJob(job.title)}
                  style={styles.actionButton}
                >
                  {translations.share}
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
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
  typeScroll: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  typeChip: {
    marginRight: 8,
    borderRadius: 14,
    height: 32,
    paddingVertical: 0,
  },
  jobsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  jobCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    flex: 1,
  },
  company: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  salary: {
    color: theme.colors.success,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 16,
  },
  requirements: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  requirementsText: {
    color: theme.colors.onSurfaceVariant,
    lineHeight: 18,
  },
  jobMeta: {
    marginBottom: 16,
  },
  contact: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 4,
  },
  posted: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
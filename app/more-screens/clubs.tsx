import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Chip, Surface } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';
import { mockClubs } from '@/services/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ClubsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { translations, isOffline } = useAppContext();

  const categories = ['All', 'Academic', 'Arts', 'Service', 'Sports', 'Cultural'];

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinClub = (clubName: string) => {
    Alert.alert(
      'Join Club',
      `Are you sure you want to join ${clubName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Join', onPress: () => Alert.alert('Success', `You have successfully joined ${clubName}!`) },
      ]
    );
  };

  const handleRequestInfo = (clubName: string) => {
    Alert.alert(
      'Information Request',
      `Your request for more information about ${clubName} has been sent to the club organizers.`
    );
  };

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons name="account-group-outline" size={32} color={theme.colors.onPrimary} style={{ marginRight: 12 }} />
        <Title style={styles.title}>Clubs & Societies</Title>
        </View>
        {isOffline && (
          <Paragraph style={styles.offlineText}>{translations.offlineData}</Paragraph>
        )}
      </LinearGradient>

      {/* Floating Searchbar and Categories */}
      <Surface style={styles.floatingBar} elevation={4}>
        <Searchbar
          placeholder="Search clubs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
              style={[styles.categoryChip, selectedCategory === category && { backgroundColor: theme.colors.primary, elevation: 2 }]}
              textStyle={{ color: selectedCategory === category ? theme.colors.onPrimary : theme.colors.onSurface }}
              elevation={selectedCategory === category ? 2 : 0}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>
      </Surface>

      <ScrollView style={styles.clubsList} contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}>
        {filteredClubs.map((club) => (
          <Card key={club.id} style={styles.clubCard} elevation={4}>
            <Image source={{ uri: club.image }} style={styles.clubImage} />
            <Card.Content>
              <Title style={styles.clubName}>{club.name}</Title>
              <Paragraph style={styles.clubCategory}>{club.category}</Paragraph>
              <Paragraph style={styles.clubDescription}>{club.description}</Paragraph>
              <View style={styles.clubDetailsRow}>
                <View style={styles.clubDetailItem}>
                  <MaterialCommunityIcons name="account-multiple" size={18} color={theme.colors.primary} />
                  <Paragraph style={styles.detailText}>{club.members} members</Paragraph>
                </View>
                <View style={styles.clubDetailItem}>
                  <MaterialCommunityIcons name="calendar-clock" size={18} color={theme.colors.secondary} />
                  <Paragraph style={styles.detailText}>{club.meetingTime}</Paragraph>
                </View>
                <View style={styles.clubDetailItem}>
                  <MaterialCommunityIcons name="email-outline" size={18} color={theme.colors.tertiary} />
                  <Paragraph style={styles.detailText}>{club.contact}</Paragraph>
                </View>
              </View>
              <View style={styles.clubActions}>
                <Button
                  mode="contained"
                  onPress={() => handleJoinClub(club.name)}
                  style={styles.actionButton}
                  buttonColor={theme.colors.primary}
                  textColor={theme.colors.onPrimary}
                >
                  {translations.join}
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleRequestInfo(club.name)}
                  style={styles.actionButton}
                  textColor={theme.colors.primary}
                >
                  {translations.request} Info
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
    backgroundColor: '#f8fafc',
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
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  offlineText: {
    color: '#f59e0b',
    fontSize: 12,
    marginTop: 4,
  },
  floatingBar: {
    marginHorizontal: 16,
    marginTop: -28,
    marginBottom: 8,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    padding: 12,
    elevation: 4,
    zIndex: 2,
  },
  searchbar: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 12,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryChip: {
    marginRight: 8,
    borderRadius: 14,
    height: 32,
    paddingVertical: 0,
  },
  clubsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  clubCard: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    elevation: 4,
    shadowColor: '#cbd5e1',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  clubImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    resizeMode: 'cover',
  },
  clubName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 12,
    color: '#3b82f6',
  },
  clubCategory: {
    color: '#8b5cf6',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  clubDescription: {
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 20,
  },
  clubDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  clubDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#64748b',
    marginLeft: 4,
  },
  clubActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 8,
    elevation: 0,
  },
});
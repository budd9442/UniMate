import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { mockCommunities } from '@/services/mockData';
import { useRouter } from 'expo-router';
import { 
  Search, 
  Users, 
  FileText, 
  Bell, 
  ArrowRight, 
  Plus,
  Filter,
  BookOpen,
  Download
} from 'lucide-react-native';

export default function ResourcesScreen() {
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { translations, isOffline } = useAppContext();
  const router = useRouter();

  const allCommunities = ['All', ...mockCommunities.map(c => c.name)];

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesCommunity = selectedCommunity === 'All' || community.name === selectedCommunity;
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCommunity && matchesSearch;
  });

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

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View className="bg-gradient-to-br from-primary-600 to-primary-700 pt-16 pb-8 px-6 rounded-b-4xl">
          <Text className="text-white text-3xl font-bold mb-2">Communities</Text>
          <Text className="text-primary-100 text-lg opacity-90">
            Connect and share within your communities
          </Text>
          {isOffline && (
            <Text className="text-warning-300 text-sm mt-2">{translations.offlineData}</Text>
          )}
        </View>

        {/* Search and Filter */}
        <View className="px-4 -mt-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-soft">
            <View className="flex-row items-center bg-neutral-50 rounded-xl px-4 py-3 mb-4">
              <Search size={20} color="#737373" strokeWidth={2} />
              <TextInput
                placeholder="Search communities..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-3 text-neutral-700"
              />
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-3">
                {allCommunities.map((community) => (
                  <TouchableOpacity
                    key={community}
                    onPress={() => setSelectedCommunity(community)}
                    className={`px-4 py-2 rounded-xl ${
                      selectedCommunity === community
                        ? 'bg-primary-500'
                        : 'bg-neutral-100'
                    }`}
                  >
                    <Text className={`font-medium ${
                      selectedCommunity === community
                        ? 'text-white'
                        : 'text-neutral-700'
                    }`}>
                      {community}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Community Cards */}
        <View className="px-4">
          {filteredCommunities.slice(0, 2).map((community) => (
            <View key={community.id} className="bg-white rounded-2xl p-6 mb-6 shadow-soft">
              <View className="flex-row items-center mb-4">
                <Image 
                  source={{ uri: community.image }} 
                  className="w-14 h-14 rounded-xl"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-neutral-800 text-xl font-bold">{community.name}</Text>
                  <Text className="text-neutral-600 text-base mt-1">{community.description}</Text>
                  <View className="flex-row items-center mt-2">
                    <Users size={16} color="#737373" strokeWidth={2} />
                    <Text className="text-neutral-500 text-sm ml-1">{community.memberCount} members</Text>
                  </View>
                </View>
              </View>

              {/* Latest Files Preview */}
              <View className="mb-4">
                <Text className="text-neutral-800 font-semibold text-base mb-3">Latest Files</Text>
                {community.resources.slice(0, 2).map((resource) => (
                  <View key={resource.id} className="flex-row items-center py-3 border-b border-neutral-100 last:border-b-0">
                    <View className="w-10 h-10 bg-primary-50 rounded-xl items-center justify-center mr-3">
                      <FileText size={18} color="#0ea5e9" strokeWidth={2} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-neutral-800 font-medium">{resource.title}</Text>
                      <Text className="text-neutral-500 text-sm">
                        By {resource.uploadedBy} • {resource.uploadedAt}
                      </Text>
                    </View>
                    <TouchableOpacity className="w-8 h-8 bg-primary-50 rounded-lg items-center justify-center">
                      <Download size={16} color="#0ea5e9" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                ))}
                {community.resources.length > 2 && (
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: '/resources/[communityId]', params: { communityId: community.id } })}
                    className="flex-row items-center justify-center py-3 mt-2"
                  >
                    <Text className="text-primary-600 font-semibold mr-2">View All Files</Text>
                    <ArrowRight size={16} color="#0ea5e9" strokeWidth={2} />
                  </TouchableOpacity>
                )}
              </View>

              {/* Notifications Preview */}
              <View className="mb-4">
                <Text className="text-neutral-800 font-semibold text-base mb-3">Notifications</Text>
                {(mockNotifications[community.id as string] && mockNotifications[community.id as string].length > 0) ? (
                  mockNotifications[community.id as string].slice(0, 2).map((notif) => (
                    <View key={notif.id} className="flex-row items-center py-2">
                      <View className="w-8 h-8 bg-secondary-50 rounded-lg items-center justify-center mr-3">
                        <Bell size={14} color="#d946ef" strokeWidth={2} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-800 font-medium text-sm">{notif.text}</Text>
                        <Text className="text-neutral-500 text-xs">{notif.date}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text className="text-neutral-500 text-center py-4">No notifications</Text>
                )}
              </View>

              {/* Action Button */}
              <TouchableOpacity
                onPress={() => router.push({ pathname: '/resources/[communityId]', params: { communityId: community.id } })}
                className="bg-primary-500 py-4 rounded-xl flex-row items-center justify-center"
              >
                <Text className="text-white font-semibold mr-2">Open Community</Text>
                <ArrowRight size={16} color="white" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-primary-500 w-16 h-16 rounded-2xl items-center justify-center shadow-strong">
        <Plus size={24} color="white" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}
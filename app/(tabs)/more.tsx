import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Users, 
  AlertCircle, 
  Briefcase, 
  Search, 
  Settings, 
  ChevronRight,
  Shield,
  MapPin,
  HelpCircle
} from 'lucide-react-native';

export default function MoreScreen() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'Clubs',
      description: 'Join student organizations',
      icon: Users,
      route: '/more-screens/clubs',
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
    },
    {
      title: 'Complaints',
      description: 'Report issues anonymously',
      icon: AlertCircle,
      route: '/more-screens/complaints',
      color: 'bg-error-500',
      bgColor: 'bg-error-50',
    },
    {
      title: 'Jobs',
      description: 'Find campus opportunities',
      icon: Briefcase,
      route: '/more-screens/jobs',
      color: 'bg-success-500',
      bgColor: 'bg-success-50',
    },
    {
      title: 'Lost & Found',
      description: 'Find or report lost items',
      icon: Search,
      route: '/more-screens/lost-found',
      color: 'bg-warning-500',
      bgColor: 'bg-warning-50',
    },
    {
      title: 'Settings',
      description: 'App preferences & language',
      icon: Settings,
      route: '/more-screens/settings',
      color: 'bg-neutral-500',
      bgColor: 'bg-neutral-50',
    },
  ];

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-gradient-to-br from-neutral-800 to-neutral-900 pt-16 pb-8 px-6 rounded-b-4xl">
        <Text className="text-white text-3xl font-bold mb-2">More</Text>
        <Text className="text-neutral-300 text-lg opacity-90">
          Additional features and settings
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 -mt-6" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-white rounded-2xl p-2 shadow-soft">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(item.route as any)}
                className="flex-row items-center p-4 rounded-xl active:bg-neutral-50"
                activeOpacity={0.7}
              >
                <View className={`${item.bgColor} w-12 h-12 rounded-xl items-center justify-center mr-4`}>
                  <IconComponent size={20} color={item.color.replace('bg-', '#')} strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-800 font-semibold text-base">{item.title}</Text>
                  <Text className="text-neutral-500 text-sm mt-1">{item.description}</Text>
                </View>
                <ChevronRight size={20} color="#a3a3a3" strokeWidth={2} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Help Section */}
        <View className="bg-white rounded-2xl p-6 mt-6 shadow-soft">
          <Text className="text-neutral-800 text-xl font-bold mb-4">Need Help?</Text>
          
          <TouchableOpacity className="flex-row items-center p-4 bg-primary-50 rounded-xl mb-3">
            <View className="w-10 h-10 bg-primary-500 rounded-xl items-center justify-center mr-3">
              <HelpCircle size={18} color="white" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-primary-700 font-semibold">Help Center</Text>
              <Text className="text-primary-600 text-sm">Get answers to common questions</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 bg-secondary-50 rounded-xl">
            <View className="w-10 h-10 bg-secondary-500 rounded-xl items-center justify-center mr-3">
              <Shield size={18} color="white" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-secondary-700 font-semibold">Safety Resources</Text>
              <Text className="text-secondary-600 text-sm">Emergency contacts and support</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
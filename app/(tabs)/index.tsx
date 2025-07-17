import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { EmergencyButton } from '@/components/EmergencyButton';
import { 
  BookOpen, 
  Bell, 
  TrendingUp, 
  Phone, 
  FileText, 
  Star, 
  Clock,
  ChevronRight,
  Award,
  Calendar
} from 'lucide-react-native';

export default function HomeScreen() {
  const { translations } = useAppContext();

  const quickActions = [
    {
      title: 'Resources',
      icon: BookOpen,
      description: 'Study materials & guides',
      color: 'bg-primary-500',
      textColor: 'text-white',
    },
    {
      title: 'Reminders',
      icon: Bell,
      description: 'Important deadlines',
      color: 'bg-secondary-500',
      textColor: 'text-white',
    },
    {
      title: 'Progress',
      icon: TrendingUp,
      description: 'Track your GPA',
      color: 'bg-accent-500',
      textColor: 'text-white',
    },
    {
      title: 'Emergency',
      icon: Phone,
      description: 'Quick assistance',
      color: 'bg-error-500',
      textColor: 'text-white',
    },
  ];

  const highlights = [
    { icon: FileText, label: 'Assignments', value: '5', color: 'text-primary-600', bgColor: 'bg-primary-50' },
    { icon: Star, label: 'GPA', value: '3.8', color: 'text-secondary-600', bgColor: 'bg-secondary-50' },
    { icon: Clock, label: 'Hours Studied', value: '12', color: 'text-accent-600', bgColor: 'bg-accent-50' },
  ];

  const recentActivities = [
    { 
      text: '3 new assignments posted', 
      time: '2 hours ago', 
      type: 'assignment', 
      icon: FileText, 
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    { 
      text: 'CS Society meeting tomorrow', 
      time: '1 day ago', 
      type: 'event', 
      icon: Calendar, 
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50'
    },
    { 
      text: '2 job postings available', 
      time: '2 days ago', 
      type: 'job', 
      icon: Award, 
      color: 'text-accent-600',
      bgColor: 'bg-accent-50'
    },
  ];

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="bg-gradient-to-br from-primary-600 to-primary-700 pt-16 pb-8 px-6 rounded-b-4xl">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-white text-3xl font-bold mb-2">Good Morning, Yonali!</Text>
              <Text className="text-primary-100 text-lg opacity-90">
                Here's what's happening today
              </Text>
            </View>
            <View className="w-16 h-16 rounded-2xl bg-white/20 items-center justify-center">
              <Image
                source={require('../../assets/images/icon.png')}
                className="w-12 h-12 rounded-xl"
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 -mt-6 mb-6">
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity 
                  key={index} 
                  className={`${action.color} w-[48%] rounded-2xl p-4 mb-4 shadow-soft`}
                  activeOpacity={0.8}
                >
                  <View className="items-center">
                    <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center mb-3">
                      <IconComponent size={24} color="white" strokeWidth={2} />
                    </View>
                    <Text className={`${action.textColor} font-bold text-base mb-1`}>
                      {action.title}
                    </Text>
                    <Text className={`${action.textColor} text-sm opacity-80 text-center`}>
                      {action.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Highlights Card */}
        <View className="mx-4 mb-6 bg-white rounded-2xl p-6 shadow-soft">
          <Text className="text-neutral-800 text-xl font-bold mb-4">Today's Highlights</Text>
          <View className="flex-row justify-between">
            {highlights.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <View key={idx} className="items-center flex-1">
                  <View className={`${item.bgColor} w-12 h-12 rounded-xl items-center justify-center mb-2`}>
                    <IconComponent size={20} color={item.color.replace('text-', '#')} strokeWidth={2} />
                  </View>
                  <Text className="text-neutral-800 text-2xl font-bold">{item.value}</Text>
                  <Text className="text-neutral-500 text-sm mt-1">{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mx-4 mb-6 bg-white rounded-2xl p-6 shadow-soft">
          <Text className="text-neutral-800 text-xl font-bold mb-4">Recent Activity</Text>
          {recentActivities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <View key={index} className="flex-row items-start mb-4 last:mb-0">
                <View className={`${activity.bgColor} w-10 h-10 rounded-xl items-center justify-center mr-3 mt-1`}>
                  <IconComponent size={16} color={activity.color.replace('text-', '#')} strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-800 text-base font-medium mb-1">
                    {activity.text}
                  </Text>
                  <View className="flex-row items-center">
                    <View className={`${activity.bgColor} px-2 py-1 rounded-lg mr-2`}>
                      <Text className={`${activity.color} text-xs font-medium`}>
                        {activity.type}
                      </Text>
                    </View>
                    <Text className="text-neutral-400 text-xs">{activity.time}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          <TouchableOpacity className="mt-4 flex-row items-center justify-center py-3 border border-primary-200 rounded-xl">
            <Text className="text-primary-600 font-semibold mr-2">View All</Text>
            <ChevronRight size={16} color="#0ea5e9" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <EmergencyButton />
    </View>
  );
}
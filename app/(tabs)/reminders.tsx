import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { mockReminders } from '@/services/mockData';
import { Bell, Plus, Calendar, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, CreditCard as Edit3, X, ChevronDown } from 'lucide-react-native';

export default function RemindersScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newCategory, setNewCategory] = useState('assignment');
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const { translations, isOffline } = useAppContext();

  const priorities = [
    { value: 'high', label: 'High Priority', color: 'bg-error-500', textColor: 'text-error-600' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-warning-500', textColor: 'text-warning-600' },
    { value: 'low', label: 'Low Priority', color: 'bg-success-500', textColor: 'text-success-600' },
  ];

  const categories = [
    { value: 'assignment', label: 'Assignment', icon: Edit3 },
    { value: 'event', label: 'Event', icon: Calendar },
    { value: 'exam', label: 'Exam', icon: AlertCircle },
    { value: 'meeting', label: 'Meeting', icon: Clock },
  ];

  const getPriorityStyle = (priority: string) => {
    const priorityConfig = priorities.find(p => p.value === priority);
    return priorityConfig || priorities[1];
  };

  const getCategoryIcon = (category: string) => {
    const categoryConfig = categories.find(c => c.value === category);
    return categoryConfig?.icon || Edit3;
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
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-gradient-to-br from-secondary-600 to-secondary-700 pt-16 pb-8 px-6 rounded-b-4xl">
        <Text className="text-white text-3xl font-bold mb-2">{translations.reminders}</Text>
        <Text className="text-secondary-100 text-lg opacity-90">
          Stay on top of your deadlines
        </Text>
        {isOffline && (
          <Text className="text-warning-300 text-sm mt-2">{translations.offlineData}</Text>
        )}
      </View>

      <ScrollView className="flex-1 px-4 -mt-6" contentContainerStyle={{ paddingBottom: 120 }}>
        {mockReminders.map((reminder) => {
          const priorityStyle = getPriorityStyle(reminder.priority);
          const CategoryIcon = getCategoryIcon(reminder.category);
          
          return (
            <View key={reminder.id} className="bg-white rounded-2xl p-6 mb-4 shadow-soft">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-neutral-800 text-xl font-bold mb-2">{reminder.title}</Text>
                  <View className={`${priorityStyle.color} self-start px-3 py-1 rounded-full`}>
                    <Text className="text-white text-xs font-semibold uppercase">
                      {reminder.priority}
                    </Text>
                  </View>
                </View>
                <View className="w-12 h-12 bg-secondary-50 rounded-xl items-center justify-center">
                  <CategoryIcon size={20} color="#d946ef" strokeWidth={2} />
                </View>
              </View>
              
              <Text className="text-neutral-600 text-base mb-4 leading-6">
                {reminder.description}
              </Text>
              
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Calendar size={16} color="#737373" strokeWidth={2} />
                  <Text className="text-neutral-500 text-sm ml-2">Due: {reminder.dueDate}</Text>
                </View>
                <View className="bg-secondary-50 px-3 py-1 rounded-full">
                  <Text className="text-secondary-600 text-xs font-medium capitalize">
                    {reminder.category}
                  </Text>
                </View>
              </View>
              
              <View className="flex-row space-x-3">
                <TouchableOpacity 
                  className="flex-1 bg-success-500 py-3 rounded-xl items-center"
                  onPress={() => Alert.alert('Mark Complete', `Marking ${reminder.title} as complete...`)}
                >
                  <View className="flex-row items-center">
                    <CheckCircle2 size={16} color="white" strokeWidth={2} />
                    <Text className="text-white font-semibold ml-2">Complete</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-1 bg-neutral-100 py-3 rounded-xl items-center"
                  onPress={() => Alert.alert('Edit', `Editing ${reminder.title}...`)}
                >
                  <View className="flex-row items-center">
                    <Edit3 size={16} color="#737373" strokeWidth={2} />
                    <Text className="text-neutral-700 font-semibold ml-2">{translations.edit}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-secondary-500 w-16 h-16 rounded-2xl items-center justify-center shadow-strong"
        onPress={() => setShowAddModal(true)}
      >
        <Plus size={24} color="white" strokeWidth={2} />
      </TouchableOpacity>

      {/* Add Reminder Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-6">
          <View className="bg-white rounded-3xl p-6 shadow-strong max-h-[80%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-800 text-2xl font-bold">Add Reminder</Text>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                className="w-8 h-8 items-center justify-center"
              >
                <X size={20} color="#737373" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4">
                <Text className="text-neutral-800 font-semibold mb-2">Title *</Text>
                <TextInput
                  value={newTitle}
                  onChangeText={setNewTitle}
                  className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                  placeholder="Enter reminder title"
                />
              </View>

              <View className="mb-4">
                <Text className="text-neutral-800 font-semibold mb-2">Description</Text>
                <TextInput
                  value={newDescription}
                  onChangeText={setNewDescription}
                  multiline
                  numberOfLines={3}
                  className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                  placeholder="Enter description"
                  textAlignVertical="top"
                />
              </View>

              <View className="mb-4">
                <Text className="text-neutral-800 font-semibold mb-2">Due Date *</Text>
                <TextInput
                  value={newDueDate}
                  onChangeText={setNewDueDate}
                  className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View className="mb-4">
                <Text className="text-neutral-800 font-semibold mb-2">Priority</Text>
                <TouchableOpacity
                  onPress={() => setShowPriorityMenu(!showPriorityMenu)}
                  className="border border-neutral-300 rounded-xl p-4 bg-neutral-50 flex-row items-center justify-between"
                >
                  <Text className="text-neutral-700 capitalize">{newPriority} Priority</Text>
                  <ChevronDown size={20} color="#737373" strokeWidth={2} />
                </TouchableOpacity>
                {showPriorityMenu && (
                  <View className="mt-2 bg-white border border-neutral-200 rounded-xl overflow-hidden">
                    {priorities.map((priority) => (
                      <TouchableOpacity
                        key={priority.value}
                        onPress={() => {
                          setNewPriority(priority.value);
                          setShowPriorityMenu(false);
                        }}
                        className="p-4 border-b border-neutral-100 last:border-b-0"
                      >
                        <Text className="text-neutral-700">{priority.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View className="mb-6">
                <Text className="text-neutral-800 font-semibold mb-2">Category</Text>
                <TouchableOpacity
                  onPress={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="border border-neutral-300 rounded-xl p-4 bg-neutral-50 flex-row items-center justify-between"
                >
                  <Text className="text-neutral-700 capitalize">{newCategory}</Text>
                  <ChevronDown size={20} color="#737373" strokeWidth={2} />
                </TouchableOpacity>
                {showCategoryMenu && (
                  <View className="mt-2 bg-white border border-neutral-200 rounded-xl overflow-hidden">
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.value}
                        onPress={() => {
                          setNewCategory(category.value);
                          setShowCategoryMenu(false);
                        }}
                        className="p-4 border-b border-neutral-100 last:border-b-0"
                      >
                        <Text className="text-neutral-700">{category.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>

            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                className="flex-1 bg-neutral-100 py-4 rounded-xl items-center"
              >
                <Text className="text-neutral-700 font-semibold">{translations.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddReminder}
                className="flex-1 bg-secondary-500 py-4 rounded-xl items-center"
              >
                <Text className="text-white font-semibold">Add Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
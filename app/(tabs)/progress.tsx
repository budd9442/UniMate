import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { mockGrades } from '@/services/mockData';
import { 
  TrendingUp, 
  Plus, 
  Award, 
  BookOpen, 
  Target,
  X,
  ChevronDown,
  BarChart3
} from 'lucide-react-native';

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

  const getGradeColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-success-600';
    if (gpa >= 3.0) return 'text-warning-600';
    return 'text-error-600';
  };

  const getGradeBgColor = (gpa: number) => {
    if (gpa >= 3.7) return 'bg-success-50';
    if (gpa >= 3.0) return 'bg-warning-50';
    return 'bg-error-50';
  };

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-gradient-to-br from-accent-600 to-accent-700 pt-16 pb-8 px-6 rounded-b-4xl">
        <Text className="text-white text-3xl font-bold mb-2">Academic Progress</Text>
        <Text className="text-accent-100 text-lg opacity-90">
          Track your academic journey
        </Text>
        {isOffline && (
          <Text className="text-warning-300 text-sm mt-2">{translations.offlineData}</Text>
        )}
      </View>

      <ScrollView className="flex-1 px-4 -mt-6" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* GPA Card */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-soft">
          <View className="items-center">
            <View className="w-20 h-20 bg-accent-50 rounded-2xl items-center justify-center mb-4">
              <Award size={32} color="#f97316" strokeWidth={2} />
            </View>
            <Text className="text-neutral-600 text-lg mb-2">Overall GPA</Text>
            <Text className="text-accent-600 text-5xl font-bold mb-2">{calculateOverallGPA()}</Text>
            <Text className="text-neutral-500 text-sm">Based on {mockGrades.length} subjects</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row space-x-4 mb-6">
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-soft">
            <View className="w-12 h-12 bg-primary-50 rounded-xl items-center justify-center mb-3">
              <BookOpen size={20} color="#0ea5e9" strokeWidth={2} />
            </View>
            <Text className="text-2xl font-bold text-neutral-800">
              {mockGrades.reduce((sum, grade) => sum + grade.credits, 0)}
            </Text>
            <Text className="text-neutral-500 text-sm">Total Credits</Text>
          </View>
          
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-soft">
            <View className="w-12 h-12 bg-secondary-50 rounded-xl items-center justify-center mb-3">
              <Target size={20} color="#d946ef" strokeWidth={2} />
            </View>
            <Text className="text-2xl font-bold text-neutral-800">{mockGrades.length}</Text>
            <Text className="text-neutral-500 text-sm">Subjects</Text>
          </View>
        </View>

        {/* Grades List */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-soft">
          <Text className="text-neutral-800 text-xl font-bold mb-4">Subject Grades</Text>
          
          <View className="space-y-4">
            {mockGrades.map((grade, index) => (
              <View key={index} className="flex-row items-center justify-between py-3 border-b border-neutral-100 last:border-b-0">
                <View className="flex-1">
                  <Text className="text-neutral-800 font-semibold text-base">{grade.subject}</Text>
                  <Text className="text-neutral-500 text-sm">{grade.credits} credits • {grade.semester}</Text>
                </View>
                <View className="items-end">
                  <View className={`${getGradeBgColor(grade.gpa)} px-3 py-1 rounded-full mb-1`}>
                    <Text className={`${getGradeColor(grade.gpa)} font-bold text-sm`}>
                      {grade.grade}
                    </Text>
                  </View>
                  <Text className="text-neutral-600 text-xs">{grade.gpa.toFixed(1)} GPA</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Semester Breakdown */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-soft">
          <Text className="text-neutral-800 text-xl font-bold mb-4">Semester Performance</Text>
          
          <View className="space-y-4">
            <View className="flex-row items-center justify-between py-3 border-b border-neutral-100">
              <View>
                <Text className="text-neutral-800 font-semibold">Fall 2023</Text>
                <Text className="text-neutral-500 text-sm">Current semester</Text>
              </View>
              <View className="items-end">
                <Text className="text-accent-600 font-bold text-lg">{calculateOverallGPA()}</Text>
                <Text className="text-neutral-500 text-xs">GPA</Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between py-3 border-b border-neutral-100">
              <View>
                <Text className="text-neutral-800 font-semibold">Spring 2023</Text>
                <Text className="text-neutral-500 text-sm">Previous semester</Text>
              </View>
              <View className="items-end">
                <Text className="text-neutral-600 font-bold text-lg">3.4</Text>
                <Text className="text-neutral-500 text-xs">GPA</Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between py-3">
              <View>
                <Text className="text-neutral-800 font-semibold">Fall 2022</Text>
                <Text className="text-neutral-500 text-sm">Previous semester</Text>
              </View>
              <View className="items-end">
                <Text className="text-neutral-600 font-bold text-lg">3.6</Text>
                <Text className="text-neutral-500 text-xs">GPA</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-accent-500 w-16 h-16 rounded-2xl items-center justify-center shadow-strong"
        onPress={() => setShowAddModal(true)}
      >
        <Plus size={24} color="white" strokeWidth={2} />
      </TouchableOpacity>

      {/* Add Grade Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-6">
          <View className="bg-white rounded-3xl p-6 shadow-strong">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-800 text-2xl font-bold">Add Grade</Text>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                className="w-8 h-8 items-center justify-center"
              >
                <X size={20} color="#737373" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-neutral-800 font-semibold mb-2">Subject *</Text>
              <TextInput
                value={newSubject}
                onChangeText={setNewSubject}
                className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                placeholder="Enter subject name"
              />
            </View>

            <View className="mb-4">
              <Text className="text-neutral-800 font-semibold mb-2">Grade *</Text>
              <TextInput
                value={newGrade}
                onChangeText={setNewGrade}
                className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                placeholder="A+, A, A-, B+, etc."
              />
            </View>

            <View className="mb-4">
              <Text className="text-neutral-800 font-semibold mb-2">Credits *</Text>
              <TextInput
                value={newCredits}
                onChangeText={setNewCredits}
                className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                placeholder="Enter credit hours"
                keyboardType="numeric"
              />
            </View>

            <View className="mb-6">
              <Text className="text-neutral-800 font-semibold mb-2">Semester</Text>
              <TextInput
                value={newSemester}
                onChangeText={setNewSemester}
                className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                placeholder="e.g., Fall 2023"
              />
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                className="flex-1 bg-neutral-100 py-4 rounded-xl items-center"
              >
                <Text className="text-neutral-700 font-semibold">{translations.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddGrade}
                className="flex-1 bg-accent-500 py-4 rounded-xl items-center"
              >
                <Text className="text-white font-semibold">Add Grade</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
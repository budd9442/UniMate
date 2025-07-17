import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { Phone, X, TriangleAlert as AlertTriangle, Shield, Heart, CircleHelp as HelpCircle } from 'lucide-react-native';

export const EmergencyButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [emergencyType, setEmergencyType] = useState('medical');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const { translations } = useAppContext();

  const emergencyTypes = [
    { value: 'medical', label: 'Medical Emergency', icon: Heart, color: 'bg-error-500' },
    { value: 'safety', label: 'Safety Concern', icon: Shield, color: 'bg-warning-500' },
    { value: 'harassment', label: 'Harassment/Ragging', icon: AlertTriangle, color: 'bg-secondary-500' },
    { value: 'other', label: 'Other', icon: HelpCircle, color: 'bg-neutral-500' },
  ];

  const handleEmergencySubmit = () => {
    if (!description.trim() || !contactInfo.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

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
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-error-500 w-16 h-16 rounded-2xl items-center justify-center shadow-strong"
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Phone size={24} color="white" strokeWidth={2} />
      </TouchableOpacity>
      
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-6">
          <View className="bg-white rounded-3xl p-6 shadow-strong">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-error-600 text-2xl font-bold">Emergency Help</Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                className="w-8 h-8 items-center justify-center"
              >
                <X size={20} color="#737373" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <Text className="text-neutral-600 text-base mb-6">
              Please describe your emergency and provide contact information
            </Text>

            <View className="mb-6">
              <Text className="text-neutral-800 font-semibold mb-3">Emergency Type:</Text>
              <View className="space-y-3">
                {emergencyTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <TouchableOpacity
                      key={type.value}
                      className={`flex-row items-center p-4 rounded-xl border-2 ${
                        emergencyType === type.value 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-neutral-200 bg-white'
                      }`}
                      onPress={() => setEmergencyType(type.value)}
                    >
                      <View className={`${type.color} w-10 h-10 rounded-xl items-center justify-center mr-3`}>
                        <IconComponent size={18} color="white" strokeWidth={2} />
                      </View>
                      <Text className={`font-medium ${
                        emergencyType === type.value ? 'text-primary-700' : 'text-neutral-700'
                      }`}>
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-neutral-800 font-semibold mb-2">Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                placeholder="Please provide detailed information about the emergency..."
                textAlignVertical="top"
              />
            </View>

            <View className="mb-6">
              <Text className="text-neutral-800 font-semibold mb-2">Your Contact Information</Text>
              <TextInput
                value={contactInfo}
                onChangeText={setContactInfo}
                className="border border-neutral-300 rounded-xl p-4 text-neutral-700 bg-neutral-50"
                placeholder="Phone number or email"
              />
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setVisible(false)}
                className="flex-1 bg-neutral-100 py-4 rounded-xl items-center"
              >
                <Text className="text-neutral-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEmergencySubmit}
                className="flex-1 bg-error-500 py-4 rounded-xl items-center"
              >
                <Text className="text-white font-semibold">Send Emergency Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
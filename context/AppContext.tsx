import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'si';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  translations: Record<string, string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    resources: 'Resources',
    reminders: 'Reminders',
    progress: 'Progress',
    clubs: 'Clubs',
    lostFound: 'Lost & Found',
    complaints: 'Complaints',
    jobs: 'Jobs',
    emergency: 'Emergency Help',
    welcome: 'Welcome to Unimate',
    subtitle: 'Your smart student companion',
    offlineMode: 'Offline Mode',
    language: 'Language',
    english: 'English',
    sinhala: 'Sinhala',
    quickAccess: 'Quick Access',
    viewAll: 'View All',
    uploadFile: 'Upload File',
    addReminder: 'Add Reminder',
    calculateGPA: 'Calculate GPA',
    postItem: 'Post Item',
    fileComplaint: 'File Complaint',
    askQuestion: 'Ask Question',
    apply: 'Apply',
    share: 'Share',
    join: 'Join',
    request: 'Request',
    search: 'Search',
    filter: 'Filter',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'Error occurred',
    success: 'Success',
    noData: 'No data available',
    offlineData: 'Offline data shown',
  },
  si: {
    home: 'මුල් පිටුව',
    resources: 'සම්පත්',
    reminders: 'මතක් කිරීම්',
    progress: 'ප්‍රගතිය',
    clubs: 'සමාජ',
    lostFound: 'නැති වූ සහ සොයා ගත්',
    complaints: 'පැමිණිලි',
    jobs: 'රැකියා',
    emergency: 'හදිසි උපකාර',
    welcome: 'Unimate වෙත සාදරයෙන් පිළිගනිමු',
    subtitle: 'ඔබේ බුද්ධිමත් ශිෂ්‍ය සහචරයා',
    offlineMode: 'නොබැඳි ක්‍රමය',
    language: 'භාෂාව',
    english: 'ඉංග්‍රීසි',
    sinhala: 'සිංහල',
    quickAccess: 'ඉක්මන් ප්‍රවේශය',
    viewAll: 'සියල්ල බලන්න',
    uploadFile: 'ගොනුව උඩුගත කරන්න',
    addReminder: 'මතක් කිරීමක් එකතු කරන්න',
    calculateGPA: 'GPA ගණනය කරන්න',
    postItem: 'අයිතමය පළ කරන්න',
    fileComplaint: 'පැමිණිල්ලක් ගොනු කරන්න',
    askQuestion: 'ප්‍රශ්නයක් අසන්න',
    apply: 'අයදුම් කරන්න',
    share: 'බෙදාගන්න',
    join: 'සම්බන්ධ වන්න',
    request: 'ඉල්ලීම',
    search: 'සෙවීම',
    filter: 'පෙරහන',
    submit: 'ඉදිරිපත් කරන්න',
    cancel: 'අවලංගු කරන්න',
    save: 'සුරකින්න',
    delete: 'මකන්න',
    edit: 'සංස්කරණය',
    loading: 'පූරණය වෙමින්...',
    error: 'දෝෂයක් සිදුවී ඇත',
    success: 'සාර්ථකයි',
    noData: 'දත්ත නොමැත',
    offlineData: 'නොබැඳි දත්ත පෙන්වා ඇත',
  },
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      const savedOfflineMode = await AsyncStorage.getItem('offlineMode');
      
      if (savedLanguage) {
        setLanguage(savedLanguage as Language);
      }
      if (savedOfflineMode) {
        setIsOffline(JSON.parse(savedOfflineMode));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSetLanguage = async (lang: Language) => {
    setLanguage(lang);
    try {
      await AsyncStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const handleSetOffline = async (offline: boolean) => {
    setIsOffline(offline);
    try {
      await AsyncStorage.setItem('offlineMode', JSON.stringify(offline));
    } catch (error) {
      console.error('Error saving offline mode:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        isOffline,
        setIsOffline: handleSetOffline,
        translations: translations[language],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};
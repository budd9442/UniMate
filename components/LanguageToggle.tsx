import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Paragraph } from 'react-native-paper';
import { useAppContext } from '@/context/AppContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, translations } = useAppContext();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            icon="translate"
            style={styles.button}
          >
            {language === 'en' ? 'English' : 'සිංහල'}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setLanguage('en');
            closeMenu();
          }}
          title="English"
        />
        <Menu.Item
          onPress={() => {
            setLanguage('si');
            closeMenu();
          }}
          title="සිංහල"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
  },
});
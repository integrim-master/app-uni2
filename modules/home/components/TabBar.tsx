import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TabBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.customTabBar, { backgroundColor: colors.card }]}>
      <Pressable
        onPress={() => setActiveTab('first')}
        style={[
          styles.tabItem, 
          { backgroundColor: colors.card },
          activeTab === 'first' && { backgroundColor: colors.primary }
        ]}
      >
        <Text style={[
          styles.tabText, 
          { color: colors.text },
          activeTab === 'first' && { color: '#fff' }
        ]}>Primera</Text>
      </Pressable>
      <Pressable
        onPress={() => setActiveTab('second')}
        style={[
          styles.tabItem,
          { backgroundColor: colors.card },
          activeTab === 'second' && { backgroundColor: colors.primary }
        ]}
      >
        <Text style={[
          styles.tabText,
          { color: colors.text },
          activeTab === 'second' && { color: '#fff' }
        ]}>Segunda</Text>
      </Pressable>
      <Pressable
        onPress={() => setActiveTab('third')}
        style={[
          styles.tabItem,
          { backgroundColor: colors.card },
          activeTab === 'third' && { backgroundColor: colors.primary }
        ]}
      >
        <Text style={[
          styles.tabText,
          { color: colors.text },
          activeTab === 'third' && { color: '#fff' }
        ]}>Tercera</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 4,
    width: '90%',
    justifyContent: 'space-between',
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontWeight: 'bold',
  },
});

export default TabBar;

import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


type TabOption = {
  key: string;
  label: string;
};

type TabBarProps = {
  options: TabOption[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({ options, activeTab, setActiveTab }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.customTabBar, { backgroundColor: colors.card }]}> 
      {options.map(option => (
        <Pressable
          key={option.key}
          onPress={() => setActiveTab(option.key)}
          style={[
            styles.tabItem,
            { backgroundColor: activeTab === option.key ? colors.primaryLight : colors.card, flex: 1 },
            options.length === 2 && { marginHorizontal: 8 },
            options.length === 3 && { marginHorizontal: 4 },
          ]}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === option.key ? '#fff' : colors.text }
          ]}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    flexDirection: 'row',
    borderRadius: 999,
    paddingVertical: 3,

    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 8,
  },
  tabItem: {
    paddingVertical: 7,
    paddingHorizontal: 0,
    borderRadius: 20,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    flexGrow: 1,
    flexShrink: 1,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default TabBar;

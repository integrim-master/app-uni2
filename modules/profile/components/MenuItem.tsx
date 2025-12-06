import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export type MenuItemProps = {
  icon: string;
  label: string;
  color: string;
  textColor: string;
  borderColor: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => void;
};

export function MenuItem({
  icon,
  label,
  color,
  textColor,
  borderColor,
  isLast,
  onPress,
}: MenuItemProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.menuItem,
        isLast && styles.menuItemLast,
        {
          borderColor,
          backgroundColor: colors.backgroundLight,
        },
      ]}
    >
      <View style={styles.menuContent}>
        <Ionicons
          name={icon as any}
          size={24}
          color={color}
          style={styles.menuIcon}
        />
        <Text style={[styles.menuText, { color: textColor }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

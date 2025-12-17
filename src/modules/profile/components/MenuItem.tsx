import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export type MenuItemProps = {
  icon?: string;
  title?: string;
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
  title,
  onPress,
}: MenuItemProps) {
  const { colors } = useTheme();
  const Container = onPress ? Pressable : View;
  return (
    <Container
      {...(onPress ? { onPress } : {})}
      style={[
        styles.menuItem,
        isLast && styles.menuItemLast,
        { backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0, borderRadius: 0, marginBottom: 0 },
      ]}
    >
      <View style={styles.menuContent}>
        {icon && (
          <Ionicons
            name={icon as any}
            size={24}
            color={color}
            style={styles.menuIcon}
          />
        )}
        <View>
          {title && (
            <Text style={[styles.menuTitle, { color: colors.secondaryDark, opacity: 0.7 }]}>{title}</Text>
          )}
          <Text style={[styles.menuText, { color: textColor }]}>{label}</Text>
        </View>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={20} color={color} />}
    </Container>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

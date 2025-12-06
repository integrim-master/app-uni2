import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { MenuItem, MenuItemProps } from './MenuItem';

interface MenuSectionProps {
  title: string;
  items: Omit<MenuItemProps, 'color' | 'textColor' | 'borderColor'>[];
}

export function MenuSection({ title, items }: MenuSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <View
        style={[
          styles.menuGroup,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            color={colors.primary}
            textColor={colors.text}
            borderColor={colors.border}
            isLast={index === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  menuGroup: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
});

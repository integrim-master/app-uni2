import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export default function BenefitsListSkeleton() {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 90 }}
      style={styles.container}
    >
      {[1, 2, 3, 4].map((item, index) => (
        <MotiView
          key={item}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 400,
            delay: index * 100,
          }}
        >
          <LinearGradient
            colors={[colors.gradientCardStart, colors.gradientCardEnd]}
            start={{ x: 0.1, y: 2.5 }}
            end={{ x: 0.9, y: 0.9 }}
            style={[
              styles.card,
              {
                shadowColor: colors.shadow || '#000',
                borderColor: colors.gradientCardStart || '#ddd',
              },
            ]}
          >
            <View style={styles.topSection}>
              <View style={styles.titleColumn}>
                <Skeleton width="85%" height={22} radius={6} />
                <Skeleton width="95%" height={16} radius={6} />
                <Skeleton width="70%" height={16} radius={6} />
              </View>
              <Skeleton width={95} height={32} radius={18} />
            </View>

            <View style={[styles.divider, { borderColor: colors.border || '#E5E5E5' }]} />

            <View style={styles.bottomSection}>
              <View style={styles.infoPills}>
                <Skeleton width={85} height={32} radius={16} />
                <Skeleton width={110} height={32} radius={16} />
              </View>
              <Skeleton width={90} height={40} radius={12} />
            </View>
          </LinearGradient>
        </MotiView>
      ))}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,

  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
  },
  titleColumn: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  divider: {
    marginVertical: 14,
    borderTopWidth: 1.5,
    borderStyle: 'dashed',
    opacity: 0.35,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  infoPills: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

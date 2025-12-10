import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';


interface CardProps {
  href?: string;
  className?: string;
  style?: ViewStyle;
  children?: ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  pressedOpacity?: number;
}


export function Card({
  href,
  className,
  style,
  children,
  onPress,
  backgroundColor,
  borderColor,
  pressedOpacity = 0.5,
}: CardProps) {
  const { colors } = useTheme();

  const cardContent = (
    <Pressable onPress={onPress} className={className}>
      {({ pressed }) => (
        <LinearGradient
          colors={colors.gradientCard || colors.gradientCard as  any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.container, style, { borderColor: borderColor || colors.border, opacity: pressed ? pressedOpacity : 1 }]}
        >
          {children}
        </LinearGradient>
      )}
    </Pressable>
  );

  if (href) {
    return <Link asChild href={href}>{cardContent}</Link>;
  }
  return cardContent;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 0.4,
    elevation: 1,
    borderRadius: 12,
    gap: 8,
  },

});
import { Link } from 'expo-router';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

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
        <View
          style={[
            styles.container,
            style,
            {
              backgroundColor: backgroundColor || colors.card,
              borderColor: borderColor || colors.border,
              opacity: pressed ? pressedOpacity : 1,
            },
          ]}
        >
          {children}
        </View>
      )}
    </Pressable>
  );

  if (href) {
    return (
      <Link asChild href={href}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    width: 174,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 8,
    gap: 8,
  },
});

import React from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  withTopInset?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
  className?: string;
}

export function Screen({ 
  children, 
  withTopInset = true, 
  style, 
  backgroundColor = '#f5f5f5',
  className
}: ScreenProps) {
  const edges = withTopInset ? ['top', 'left', 'right'] : ['left', 'right'];
  
  return (
    <SafeAreaView 
      edges={edges as any}
      className={className}
      style={[
        { 
          flex: 1, 
          backgroundColor,
          paddingHorizontal: 16
        }, 
        style
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
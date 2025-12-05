import { Link } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../../context/ThemeContext'
import { AccesoDirectoProps } from '../types/home.types'

export function AccesoDirecto({
  item, 
  icon: Icon, 
  routPage, 
  dark, 
  light, 
  colorFondo
}: AccesoDirectoProps) {
  const { colors } = useTheme();
  
  return (
    <Link asChild href={`/(tabs)/${routPage}`}>
      <Pressable>
        {({ pressed }) => (
          <View style={[
            styles.container,
            { 
              backgroundColor: colors.card, 
              borderColor: colors.border,
              opacity: pressed ? 0.5 : 1 
            }
          ]}>
            <View style={styles.iconContainer}>
              <Icon color={colors.primary} />
            </View>
            <Text style={[styles.text, { color: colors.text }]}>{item}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 170,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 8,
    gap: 8,
  },
  iconContainer: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
})
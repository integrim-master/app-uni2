import { View, Text } from 'react-native'
import React from 'react'

export default function SectionContainer({children, ...props}) {
  return (
    <View {...props} className='py-3'>
      {children}
    </View>
  )
}
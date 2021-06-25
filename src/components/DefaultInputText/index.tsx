import React from 'react'
import { View, Text, TextInput, StyleProp, ViewStyle } from 'react-native'

import styles from './styles'

interface InputProps {
  label?: string
  value: string
  editable?: boolean
  placeholder?: string
  error?: string
  onChange?: (v: string) => void
  containerStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]
  inputStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]
}

export default function DefaultInputText({ label, value, onChange, placeholder, error, editable = true, containerStyle, inputStyle }: InputProps) {
  return (
    <View style={containerStyle}>
      {label && <Text style={{ color: !error ? '#64626B' : '#c00' }}>{label}</Text>}
      <TextInput onChangeText={onChange} value={value} editable={editable} placeholder={placeholder} style={[styles.input, {
        borderColor: !error ? '#bbb' : '#c00'
      }, inputStyle]} />
      {error && <Text style={styles.message}>{error}</Text>}
    </View>
  )
}
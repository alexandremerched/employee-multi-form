import React from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { TextInputMask, TextInputMaskTypeProp, TextInputMaskOptionProp } from 'react-native-masked-text'

import styles from './styles'

interface InputProps {
  label?: string
  value: string
  editable?: boolean
  placeholder?: string
  error?: string
  type: TextInputMaskTypeProp
  options?: TextInputMaskOptionProp
  onChange?: (v: string) => void
  onBlur?: () => void
  checkText?: (previous: string, next: string) => boolean
  containerStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]
  inputStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]
}

export default function DefaultMaskedInputText({
  label, value, onChange, onBlur, placeholder, error, type, options, checkText, containerStyle, inputStyle, editable = true
}: InputProps) {
  return (
    <View style={containerStyle}>
      {label && <Text style={{ color: !error && error !== '' ? '#64626B' : '#c00' }}>{label}</Text>}
      <TextInputMask
        editable={editable}
        type={type}
        options={options}
        checkText={checkText}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        style={[styles.input, {
          borderColor: !error && error !== '' ? '#bbb' : '#c00'
        }, inputStyle]}
      />
      {error ? <Text style={styles.message}>{error}</Text> : null}
    </View>
  )
}

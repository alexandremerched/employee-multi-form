import React from 'react'
import { View, Text, TextInput } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

import styles from './styles'

interface InputProps {
  label: string
  list: { key: number, label: string }[]
  value: string
  placeholder?: string
  error?: string
  onChange: (v: string) => void
}

export default function DefaultModalSelector({ label, list, value, onChange, placeholder, error }: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={{ color: !error ? '#64626B' : '#c00' }}>{label}</Text>
      <ModalSelector
        data={list}
        onChange={list => onChange(list?.label)}
        cancelText='Cancelar'
      >
        <TextInput
          value={value}
          defaultValue=''
          editable={false}
          placeholder={placeholder}
          style={[styles.input, {
            borderColor: !error ? '#bbb' : '#c00'
          }]}
        />
      </ModalSelector>
      {error && <Text style={styles.message}>{error}</Text>}
    </View>
  )
}

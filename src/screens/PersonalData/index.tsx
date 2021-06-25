import React from 'react'
import { useFormState, useController } from 'react-hook-form'
import { View } from 'react-native'

import DefaultInputText from '../../components/DefaultInputText'
import DefaultMaskedInputText from '../../components/DefaultMaskedInputText'

import styles from './styles'

export default function PersonalData() {
  const { errors } = useFormState()
  const { field: { onChange: onChangeName, value: valueName } } = useController({ name: 'name' })
  const { field: { onChange: onChangeCpf, value: valueCpf } } = useController({ name: 'cpf' })
  const { field: { onChange: onChangeBirthday, value: valueBirthday } } = useController({ name: 'birthday' })

  return (
    <View style={styles.container}>
      <DefaultInputText
        label='Nome'
        value={valueName}
        onChange={onChangeName}
        error={errors.name?.message}
        containerStyle={styles.inputContainer}
      />

      <DefaultMaskedInputText
        label='CPF'
        type='cpf'
        placeholder='999.999.999-99'
        value={valueCpf}
        onChange={onChangeCpf}
        error={errors.cpf?.message}
        containerStyle={styles.inputContainer}
      />

      <DefaultMaskedInputText
        label='Data de Nascimento'
        options={{ format: 'DD/MM/YYYY' }}
        type='datetime'
        value={valueBirthday}
        onChange={onChangeBirthday}
        error={errors.birthday?.message}
        containerStyle={styles.inputContainer}
      />
    </View>
  )
}

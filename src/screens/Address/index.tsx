import React from 'react'
import { useController, useFormState } from 'react-hook-form'
import { View } from 'react-native'

import DefaultInputText from '../../components/DefaultInputText'
import DefaultMaskedInputText from '../../components/DefaultMaskedInputText'
import DefaultModalSelector from '../../components/DefaultModalSelector'

import styles from './styles'

export default function Address() {
  const { errors } = useFormState()
  const { field: { onChange: onChangeCep, value: valueCep } } = useController({ name: 'cep' })
  const { field: { onChange: onChangeState, value: valueState } } = useController({ name: 'state' })
  const { field: { onChange: onChangeCity, value: valueCity } } = useController({ name: 'city' })
  const { field: { onChange: onChangeStreet, value: valueStreet } } = useController({ name: 'street' })

  return (
    <View style={styles.container}>
      <DefaultMaskedInputText
        label='CEP'
        type='zip-code'
        value={valueCep}
        onChange={onChangeCep}
        error={errors.cep?.message}
        containerStyle={styles.inputContainer}
      />

      <DefaultModalSelector
        label='Estado'
        list={[{ key: 0, label: 'state1' }, { key: 1, label: 'state2' }, { key: 2, label: 'state3' }]}
        placeholder='Selecione um estado'
        value={valueState}
        onChange={onChangeState}
        error={errors.state?.message}
      />

      <DefaultModalSelector
        label='Cidade'
        list={[{ key: 0, label: 'city1' }, { key: 1, label: 'city2' }, { key: 2, label: 'city3' }]}
        placeholder='Selecione uma cidade'
        value={valueCity}
        onChange={onChangeCity}
        error={errors.city?.message}
      />

      <DefaultInputText
        label='Rua'
        value={valueStreet}
        onChange={onChangeStreet}
        error={errors.street?.message}
        containerStyle={styles.inputContainer}
      />
    </View>
  )
}

import React, { useState, useEffect } from 'react'
import { useFormState, useWatch } from 'react-hook-form'
import { View, Button, FlatList } from 'react-native'

import { returnCircleColor } from './utils'
import styles from './styles'

type validationType = undefined | 'warning' | 'error' | 'correct'

export default function Main({ navigation }: any) {
  const { errors } = useFormState()
  const [personalDataValidation, setPersonalDataValidation] = useState<validationType>()
  const [addressValidation, setAddressValidation] = useState<validationType>()
  const [journeyValidation, setJourneyValidation] = useState<validationType>()
  const [name, cpf, birthday, cep, state, city, street, journey] = useWatch({
    name: ['name', 'cpf', 'birthday', 'cep', 'state', 'city', 'street', 'journey']
  })

  const navigateButtons = [
    { title: 'Dados Pessoais', navigate: 'PersonalData', validation: personalDataValidation },
    { title: 'Endereço', navigate: 'Address', validation: addressValidation },
    { title: 'Jornada', navigate: 'Journey', validation: journeyValidation }
  ]

  useEffect(() => {
    validateForm({ name, cpf, birthday }, setPersonalDataValidation)
  }, [name, cpf, birthday])

  useEffect(() => {
    validateForm({ cep, state, city, street }, setAddressValidation)
  }, [cep, state, city, street])

  useEffect(() => {
    if (journey) {
      console.log(journey)
      setJourneyValidation(journey !== 'error' && journey !== 'warning' ? 'correct' : journey)
    }
  }, [journey])

  const validateForm = (data: { [key: string]: any }, setValidation: (v: validationType) => void) => {
    const dataKeys = Object.keys(data)
    const dataValuesFiltered = Object.values(data).filter(v => v)
    const dataErrors = Object.keys(errors).filter(key => dataKeys.find(k => k === key))

    setValidation(dataErrors.length > 0 ? 'error' : dataValuesFiltered.length === dataKeys.length ? 'correct' : 'warning')
  }

  return (
    <FlatList
      data={navigateButtons}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyExtractor={({ title }) => title}
      renderItem={({ item: { title, navigate, validation } }) =>
        <View style={styles.button}>
          <Button title={title} onPress={() => navigation.navigate(navigate)} />
          <View style={[styles.circle, { backgroundColor: returnCircleColor(validation) }]} />
        </View>
      }
    />
  )
}


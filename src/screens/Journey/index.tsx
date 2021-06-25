import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { useController, useWatch, useForm, FormProvider } from 'react-hook-form'

import DayJourney from './components/DayJourney'

import { weekdays } from './utils'
import styles from './styles'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

const WorkedHoursDisplay = () => {
  const workedHours = useWatch({ name: 'weekWorkedHours' })

  return <Text>JORNADA: {workedHours}</Text>
}

export default function Journey() {
  const {setValue: mainSetValue} = useFormContext()
  const { control, setValue, getValues, handleSubmit, ...formMethods } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    setValue('weekWorkedHours', 0)
  }, [])

  const { field: { onChange: onChangeIsDsr, value: valueIsDsr } } = useController({ name: 'isDsr', defaultValue: 6, control })

  const setJourney = (data: any) => {
    let haveEmptyField = false

    for (let index = 0; index < weekdays.length; index++) {
      const fieldsEmpty = [
        getValues(`in1-${index}`),
        getValues(`out1-${index}`),
        getValues(`in2-${index}`),
        getValues(`out2-${index}`),
        getValues(`break${index}`),
        getValues(`workedHours${index}`)
      ].filter(v => !v)

      if (fieldsEmpty.length > 0 && valueIsDsr !== index) {
        haveEmptyField = true
        break
      }
    }

    mainSetValue('journey', haveEmptyField ? 'warning' : JSON.stringify(data))
  }

  const onError = () => { mainSetValue('journey', 'error') }

  const setWeekWorkedHours = () => {
    const workedHoursValues = weekdays.map((_, index) => getValues(`workedHours${index}`)).filter(v => v)
    const workedHours = workedHoursValues.length
      ? workedHoursValues.reduce((acc, value) => Number(acc) + Number(value)) : 0

    setValue('weekWorkedHours', workedHours.toString())
  }

  const clearAllFieldsByIndex = (index: number) => {
    [`in1-${index}`, `out1-${index}`, `in2-${index}`, `out2-${index}`, `workedHours${index}`, `break${index}`].map(name => {
      setValue(name, undefined, { shouldValidate: true })
    })

    setWeekWorkedHours()
  }

  return (
    <FormProvider
      control={control}
      setValue={setValue}
      getValues={getValues}
      handleSubmit={handleSubmit}
      {...formMethods}
    >
      <View style={styles.container}>
        <WorkedHoursDisplay />
        <FlatList
          data={weekdays}
          keyExtractor={(item) => item}
          renderItem={({ index }) =>
            <DayJourney
              index={index}
              isDsr={valueIsDsr}
              setIsDsr={onChangeIsDsr}
              setWeekWorkedHours={setWeekWorkedHours}
              setJourney={handleSubmit(setJourney, onError)}
              clearAllFields={() => clearAllFieldsByIndex(index)}
            />
          }
        />
      </View>
    </FormProvider>
  )
}

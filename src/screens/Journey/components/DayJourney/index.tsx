import React, { useEffect } from 'react'
import { View, Text, Switch, FlatList } from 'react-native'
import HF, { useWatch, useController, useFormState, useFormContext } from 'react-hook-form'
import { MaskService } from 'react-native-masked-text'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import DefaultMaskedInputText from '../../../../components/DefaultMaskedInputText'

import { weekdays } from '../../utils'
import styles from './styles'

interface DayJourneyProps {
  index: number
  isDsr: number
  setIsDsr: (v: number) => void
  setWeekWorkedHours: () => void
  setJourney: () => void
  clearAllFields: () => void
}

interface HourInputProps {
  name: string
  index: number
  isDsr: number
  error?: string
  setHiddenFields?: () => void
}

const BreakDisplay = ({ index }: any) => {
  const breakValue = useWatch({ name: `break${index}` })

  return <Text>Intervalo: {breakValue}</Text>
}

const WorkedHoursDisplay = ({ index }: any) => {
  const workedHours = useWatch({ name: `workedHours${index}` })

  return <Text>Horas trabalhadas no dia: {workedHours}</Text>
}

const HourInput = ({ name, index, isDsr, error, setHiddenFields }: HourInputProps) => {
  const validateHoursFields = (value: any) => value ? MaskService.isValid('datetime', value, { format: 'HH:mm' }) : true
  const { field: { value, onChange } } = useController({
    name: `${name}-${index}`, rules: { validate: validateHoursFields },
    // defaultValue: name === 'in1' ? '08:00' : name === 'out1' ? '12:00' : name === 'in2' ? '13:00' : '17:00'
  })

  const hourFormatFilter = (_: string, value: string) => {
    let resultSplit: any[] = value?.split('')
    resultSplit = resultSplit.filter(val => val !== ':').map(val => Number(val))
    const [num1, num2, num3] = resultSplit

    return num1 > 2 ? false
      : (num2 > 3 && num1 === 2) ? false
        : num3 > 5 ? false
          : true
  }

  return (
    <DefaultMaskedInputText
      value={value}
      onChange={onChange}
      onBlur={setHiddenFields}
      checkText={hourFormatFilter}
      error={error}
      type='datetime'
      placeholder='00:00'
      options={{ format: 'HH:mm' }}
      inputStyle={styles.input}
      editable={isDsr !== index}
    />
  )
}

export default function DayJourney({
  index, isDsr, setIsDsr, setWeekWorkedHours, setJourney, clearAllFields
}: DayJourneyProps) {
  const { getValues, setValue, register } = useFormContext()
  const { errors } = useFormState()

  useEffect(() => {
    const validateWorkedHours = (value: any) => value ? Number(value) <= 480 : true
    const validateBreak = (value: any) => value ? Number(value) <= 120 && Number(value) >= 60 : true

    register(`workedHours${index}`, { validate: validateWorkedHours })
    register(`break${index}`, { validate: validateBreak })
  }, [])

  useEffect(() => {
    if (isDsr === index) clearAllFields()
  }, [isDsr])

  const setHiddenFields = async () => {
    const fieldsEmpty = [
      getValues(`in1-${index}`),
      getValues(`out1-${index}`),
      getValues(`in2-${index}`),
      getValues(`out2-${index}`),
    ].filter(v => !v)
    const fieldsErrors = [`in1-${index}`, `out1-${index}`, `in2-${index}`, `out2-${index}`].filter(n => errors[n])

    if (fieldsEmpty.length === 0 && fieldsErrors.length === 0
    ) {
      setBreak()
      setWorkedHours()
      setWeekWorkedHours()
      setJourney()
    } else {
      setValue(`break${index}`, undefined)
      setValue(`workedHours${index}`, undefined)
      setWeekWorkedHours()
      setJourney()
    }
  }

  const setBreak = () => {
    const out1Date = dayjs(getValues(`out1-${index}`), 'HH:mm')
    const in2Date = dayjs(getValues(`in2-${index}`), 'HH:mm')
    const diff = in2Date.diff(out1Date, 'minute')

    console.log(`break${index}`, diff.toString())
    setValue(`break${index}`, diff.toString())
  }

  const setWorkedHours = () => {
    const in1Date = dayjs(getValues(`in1-${index}`), 'HH:mm')
    const out1Date = dayjs(getValues(`out1-${index}`), 'HH:mm')
    const workedHours1 = out1Date.diff(in1Date, 'minute')

    const in2Date = dayjs(getValues(`in2-${index}`), 'HH:mm')
    const out2Date = dayjs(getValues(`out2-${index}`), 'HH:mm')
    const workedHours2 = out2Date.diff(in2Date, 'minute')

    console.log(`workedHours${index}`, (workedHours1 + workedHours2).toString())
    setValue(`workedHours${index}`, (workedHours1 + workedHours2).toString())
  }

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.headerContainer}>
        <Text style={{ color: errors[`workedHours${index}`] || errors[`break${index}`] ? '#c00' : 'black' }}>{weekdays[index]}</Text>
        <Switch onChange={() => setIsDsr(index)} value={isDsr === index} />
      </View>
      <View style={styles.fieldsContainer}>
        <FlatList
          data={['in1', 'out1', 'in2', 'out2']}
          style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}
          keyExtractor={(item, i) => `${item}-${i}`}
          renderItem={({ item }) =>
            <HourInput
              name={item}
              index={index}
              isDsr={isDsr}
              setHiddenFields={setHiddenFields}
              error={errors[`${item}-${index}`] ? '' : undefined}
            />
          }
        />
        <BreakDisplay index={index} />
        <WorkedHoursDisplay index={index} />
      </View>
      {errors[`workedHours${index}`] ? <Text style={styles.errorText}>
        Às horas trabalhadas no dia ultrapassam o limite de 8 horas
      </Text> : errors[`break${index}`] ? <Text style={styles.errorText}>
        O intervalo não pode ser maior que 1 hora ou menor que 2 horas
      </Text> : null}
    </View>
  )
}
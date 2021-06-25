import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Main from './screens/Main'
import PersonalData from './screens/PersonalData'
import Address from './screens/Address'
import Journey from './screens/Journey'

import formSchema from './schema'

const { Navigator, Screen } = createStackNavigator()

const App = () => {
  const formMethods = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange'
  })

  return (
    <NavigationContainer>
      <FormProvider {...formMethods}>
        <Navigator initialRouteName='Main'>
          <Screen name='Main' component={Main} />
          <Screen name='PersonalData' component={PersonalData} />
          <Screen name='Address' component={Address} />
          <Screen name='Journey' component={Journey} />
        </Navigator>
      </FormProvider>
    </NavigationContainer>
  )
}

export default App
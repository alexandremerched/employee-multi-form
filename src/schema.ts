import * as yup from 'yup'
import { MaskService } from 'react-native-masked-text'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const formSchema = yup.object().shape({
  /* PERSONAL DATA */

  name: yup.string(),
  cpf: yup.string().test('cpf-validation', 'CPF incorreto', value => value ? MaskService.isValid('cpf', value) : true),
  birthday: yup.string()
    .test('date-validation', 'Data incorreta', value =>
      value ? MaskService.isValid('datetime', value, { format: 'DD/MM/YYYY' }) : true)
    .test('max-date', 'Data é maior do que o dia atual', value =>
      value ? dayjs(value, 'DD/MM/YYYY').isBefore(dayjs()) : true),

  /* ADDRESS */

  cep: yup.string().test('cep-validation', 'CEP incorreto', value => value ? MaskService.isValid('zip-code', value) : true),
  state: yup.string(),
  city: yup.string(),
  street: yup.string(),

  /* JOURNEY */

  journey: yup.string()
})

export default formSchema
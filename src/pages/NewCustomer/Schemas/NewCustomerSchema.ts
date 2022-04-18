import * as yup from 'yup'
import UFList from '../../../utils/UFlist.json'

export const NewUserSchema = yup.object({
  name: yup.string().min(2, 'O nome do cliente precisa ter no mínimo 2 caracteres.').required('É necessário informar o nome do cliente.'),
  surname: yup.string().max(20, 'O apelido pode ter no máximo 20 caracteres.'),
  email: yup.string().email('O email precisa ser válido.'),
  observation: yup.string().max(500, 'A observação não pode ter mais de 500 caracteres.'),
  address: yup
    .object()
    .nullable()
    .shape({
      cep: yup.string().length(9, 'O cep é inválido.').required('É necessário informar o cep.'),
      street: yup.string().required('É necessário informar o logradouro.'),
      number: yup.string().required('É necessário informar número'),
      additionalInfo: yup.string(),
      neighborhood: yup.string().required('É necessário informar o bairro.'),
      city: yup.string().required('É necessário informar a cidade.'),
      uf: yup
        .string()
        .test('oneOfRequired', 'O estado precisa ser um valor válido.', function (item?: string) {
          let findValue = UFList.find(value => value === item)
          return !!findValue
        })
        .required('É necessário informar o estado.')
    })
})

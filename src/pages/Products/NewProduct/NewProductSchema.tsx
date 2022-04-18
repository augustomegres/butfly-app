import * as yup from 'yup'

export const schema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Digite um nome com no mínimo 3 caracteres')
      .max(80, 'O valor máximo para o nome do produto é de 80 caracteres')
      .required('O nome é obrigatório'),
    category: yup.object().nullable(),
    amount: yup.string()
  })
  .required()

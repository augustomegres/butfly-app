import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, Collapse, Grid, TextField, Tooltip, Typography, useTheme } from '@mui/material'
import { ContentCard } from 'components/ContentCard'
import { AddressForm } from 'components/Form/AddressForm'
import { PageContainer } from 'components/PageContainer'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ApiInstance } from 'services/axios'
import { NewUserSchema } from './Schemas/NewCustomerSchema'
import { NewCustomerSubmit } from './Types/NewCustomerSubmit'

export function NewCustomer() {
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      observation: '',
      address: null
    }
  })
  const { errors } = methods.formState
  const [fieldValue, setFieldValue] = useState('')
  const [useAddress, setUseAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState('')
  const { palette } = useTheme()
  useEffect(() => {
    if (!useAddress) {
      methods.setValue('address', null)
    }
  }, [useAddress])

  async function handleStoreCustomer(data: NewCustomerSubmit) {
    setIsLoading(true)
    await ApiInstance.post('/customers', data)
      .then(() => {
        setIsLoading(false)
        methods.reset()
        setFieldValue('')
        toast.success('Cliente cadastrado com sucesso.')
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('Falha ao cadastrar o cliente, contate nosso suporte.')
      })
  }

  function handleSetCollapsed() {
    setUseAddress(!useAddress)
  }

  return (
    <PageContainer mainText="Clientes" secondaryText="Aqui você cadastra de maneira fácil seus clientes.">
      <ContentCard mt={3}>
        <FormProvider {...methods}>
          <Box
            id="newCustomerForm"
            autoComplete="off"
            component="form"
            display={'flex'}
            flexDirection={{ xs: 'column', lg: 'row' }}
            onSubmit={methods.handleSubmit(handleStoreCustomer)}
          >
            <Box flex={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography fontSize={18} fontWeight={'light'} color={palette.text.primary}>
                    Dados do cliente
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...methods.register('name')}
                    id="name"
                    label="Nome"
                    required
                    fullWidth
                    onBlur={() => setFocusedInput('')}
                    onFocus={() => setFocusedInput('name')}
                    InputLabelProps={{ shrink: !!methods.watch('name') || focusedInput === 'name' }}
                    error={!!errors?.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    {...methods.register('surname')}
                    id="surname"
                    label="Apelido"
                    fullWidth
                    onBlur={() => setFocusedInput('')}
                    onFocus={() => setFocusedInput('surname')}
                    InputLabelProps={{ shrink: !!methods.watch('surname') || focusedInput === 'surname' }}
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    {...methods.register('email')}
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    onBlur={() => setFocusedInput('')}
                    onFocus={() => setFocusedInput('email')}
                    InputLabelProps={{ shrink: !!methods.watch('email') || focusedInput === 'email' }}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ width: '100%', position: 'relative' }}>
                    <TextField
                      {...methods.register('observation')}
                      fullWidth
                      id="observation"
                      rows={4}
                      multiline
                      label="Observações"
                      onChange={e => {
                        let value = e.target.value || ''
                        if (value.length > 500) value = value.substring(0, 500)
                        if (value.length <= 500) methods.setValue('observation', value)
                      }}
                      onBlur={() => setFocusedInput('')}
                      onFocus={() => setFocusedInput('observation')}
                      InputLabelProps={{ shrink: !!methods.watch('observation') || focusedInput === 'observation' }}
                      error={!!errors.observation}
                      helperText={errors.observation?.message}
                      placeholder="Uma observação para ajuda-lo a se lembrar de algo específico sobre este cliente, isso o ajudará a prestar sempre o melhor atendimento para seus clientes."
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: 'gray',
                        position: 'absolute',
                        right: 8,
                        bottom: 5
                      }}
                    >
                      {`${methods.watch('observation').length}/500`}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box flex={1} ml={{ xs: 0, lg: 4 }} mt={{ xs: 6, lg: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography fontSize={18} fontWeight={'light'} color={palette.text.primary}>
                    Dados adicionais
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    onClick={handleSetCollapsed}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      alignItems: 'center',
                      padding: 1,
                      borderRadius: 2,
                      background: palette.background.default
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }} onChange={handleSetCollapsed}>
                      <Tooltip title="Incluir endereço">
                        <Checkbox size="small" checked={useAddress} />
                      </Tooltip>
                      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
                        Endereço
                      </Typography>
                    </Box>
                  </Box>

                  <Collapse in={useAddress} timeout="auto" unmountOnExit>
                    <AddressForm />
                  </Collapse>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box display={'flex'} mt={3}>
            <LoadingButton loading={isLoading} type="submit" variant="contained" form="newCustomerForm" sx={{ ml: 'auto' }}>
              Cadastrar
            </LoadingButton>
          </Box>
        </FormProvider>
      </ContentCard>
    </PageContainer>
  )
}

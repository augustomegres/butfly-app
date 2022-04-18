import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AsyncAutoComplete } from 'components/HookFormInputs/FormAsyncAutoComplete'
import { FormCurrencyInput } from 'components/HookFormInputs/FormCurrencyInput'
import { ApiInstance } from 'services/axios'
import { schema } from './NewProductSchema'

interface NewProductDialogProps extends Omit<DialogProps, 'open'> {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (data) => void
}
export function NewProductDialog({ isOpen, onClose, onSuccess, ...props }: NewProductDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data) {
    const { name, price, category } = data
    setIsLoading(true)
    await ApiInstance.post('/products', { name, price, category })
      .then(response => {
        toast('Produto criado com sucesso', { type: 'success' })
        onClose()
        if (onSuccess) onSuccess(response.data)
      })
      .catch(err => {
        toast('Falha ao cadastrar o produto, tente novamente em alguns instantes, se o erro persistir, contate nosso suporte.', { type: 'error' })
      })
    setIsLoading(false)
  }

  async function fetchCategories() {
    const categories = await ApiInstance.get('/categories')
    return categories.data
  }
  return (
    <Dialog {...props} open={isOpen} onClose={onClose}>
      <DialogTitle>Novo produto</DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <form id="new-product-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ mt: '5px' }}
                error={errors.name}
                helperText={errors.name?.message}
                fullWidth
                label="Nome do produto"
                {...register('name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <AsyncAutoComplete control={control} fetchData={fetchCategories} label="Categoria" {...register('category')} />
            </Grid>
            <Grid item xs={12}>
              <FormCurrencyInput label="Valor padrão" control={control} {...register('amount')} />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <LoadingButton loading={isLoading} variant="contained" type="submit" form="new-product-form">
          Salvar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

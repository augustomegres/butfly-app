import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Alert, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { FormHTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ApiInstance } from '../../../services/axios'
import { NewUserSchema } from '../schemas/NewUserSchema'

export default function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  const errorMessages: {
    [value: string]: string
  } = {
    'Email already registered.': 'Email já cadastrado',
    'Invalid password.': 'Sua senha está incorreta'
  }

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(NewUserSchema)
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ display: boolean; status: 'success' | 'error' | 'warning'; message: string }>({
    display: false,
    status: 'success',
    message: ''
  })
  const submit = async (data: { [field: string]: string }) => {
    setIsLoading(true)
    await ApiInstance.post(`signup`, data, { headers: { authorization: `Bearer ${localStorage.getItem('@Butfly:token')}` } })
      .then(() => {
        toast.success('Cadastro realizado com sucesso.')
        setIsLoading(false)
        navigate('/login')
      })
      .catch(error => {
        const errorMessage = errorMessages[error.response?.data.message]
        setNotification({ display: true, message: errorMessage, status: 'error' })
        setIsLoading(false)
      })
  }
  const { palette } = useTheme()

  return (
    <form onSubmit={handleSubmit(submit)} {...props}>
      <TextField
        id="name"
        error={!!errors['name']}
        helperText={String(errors['name']?.message)}
        disabled={isLoading}
        label="Nome"
        required
        fullWidth
        {...register('name')}
      />

      <TextField
        id="email"
        error={!!errors['email']}
        helperText={String(errors['email']?.message)}
        disabled={isLoading}
        type="email"
        label="Email"
        fullWidth
        required
        sx={{ mt: 2 }}
        {...register('email')}
      />

      <TextField
        id="password"
        error={!!errors['password']}
        helperText={String(errors['password']?.message)}
        disabled={isLoading}
        type={showPassword ? 'text' : 'password'}
        label="Senha"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton tabIndex={-1} size="small" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </IconButton>
            </InputAdornment>
          )
        }}
        required
        fullWidth
        sx={{ mt: 2 }}
        {...register('password')}
      />

      <TextField
        id="confirm-password"
        error={!!errors['confirmPassword']}
        helperText={String(errors['confirmPassword']?.message)}
        disabled={isLoading}
        type={showPassword ? 'text' : 'password'}
        label="Confirmação de senha"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton tabIndex={-1} size="small" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </IconButton>
            </InputAdornment>
          )
        }}
        required
        fullWidth
        sx={{ mt: 2 }}
        {...register('confirmPassword')}
      />

      {notification.display && (
        <Alert severity={notification.status} sx={{ mt: 2 }}>
          {notification.message}
        </Alert>
      )}

      <LoadingButton fullWidth color="primary" variant="contained" type="submit" sx={{ mt: 2 }} loading={isLoading}>
        Cadastrar
      </LoadingButton>

      <Typography
        color={palette.text.secondary}
        fontWeight="light"
        sx={{
          mt: 2,
          fontSize: 13,
          fontWeight: 'normal',
          textAlign: 'center'
        }}
      >
        Ao se registrar, você concordará com os{' '}
        <Typography
          component="span"
          color="primary"
          sx={{
            mt: 2,
            fontSize: 13,
            fontWeight: 'normal',
            textAlign: 'center'
          }}
        >
          termos de serviços{' '}
        </Typography>
        e a{' '}
        <Typography
          component="span"
          color="primary"
          sx={{
            mt: 2,
            fontSize: 13,
            fontWeight: 'normal',
            textAlign: 'center'
          }}
        >
          política de privacidade
        </Typography>{' '}
        da Butfly.
      </Typography>

      <Typography
        color={palette.text.secondary}
        fontWeight="light"
        sx={{
          mt: 2,
          fontSize: 13,
          fontWeight: 'normal',
          textAlign: 'center'
        }}
      >
        Já tem uma conta?
        <Typography
          onClick={() => navigate('/login')}
          component="span"
          color="primary"
          fontWeight="bold"
          sx={{
            ml: 0.5,
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          Login
        </Typography>
      </Typography>
    </form>
  )
}

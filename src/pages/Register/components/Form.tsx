import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { FormHTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const submit = async (data: { [field: string]: string }) => {
    setIsLoading(true)
    console.log(data)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsLoading(false)
    navigate('/login')
  }
  const { palette } = useTheme()

  return (
    <form onSubmit={handleSubmit(submit)} {...props}>
      <TextField id="name" disabled={isLoading} label="Nome" required fullWidth {...register('name')} />

      <TextField id="email" disabled={isLoading} type="email" label="Email" fullWidth required sx={{ mt: 2 }} {...register('email')} />

      <TextField
        id="password"
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
          ),
        }}
        required
        fullWidth
        sx={{ mt: 2 }}
        {...register('password')}
      />

      <TextField
        id="confirm-password"
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
          ),
        }}
        required
        fullWidth
        sx={{ mt: 2 }}
        {...register('confirmPassword')}
      />

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
          textAlign: 'center',
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
            textAlign: 'center',
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
            textAlign: 'center',
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
          textAlign: 'center',
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
            cursor: 'pointer',
          }}
        >
          Login
        </Typography>
      </Typography>
    </form>
  )
}

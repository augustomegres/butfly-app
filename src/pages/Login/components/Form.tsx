import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ApiInstance } from '../../../services/axios'

export default function Form(props: any) {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLogged] = useState(false)
  const { palette } = useTheme()
  const submit = async (data: any) => {
    setIsLoading(true)
    await ApiInstance.post('/login', { email: data.email, password: data.password })
      .then(response => {
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <form onSubmit={handleSubmit(submit)} {...props}>
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

      <LoadingButton fullWidth color="primary" variant="contained" type="submit" sx={{ mt: 2, position: 'relative' }} loading={isLoading}>
        Login
        {isLogged ? (
          <motion.div
            style={{
              background: palette.primary.main,
              position: 'absolute',
              borderRadius: 5000,
              width: 0,
              height: 0,
            }}
            whileInView={{
              width: '300vh',
              height: '300vh',
              zIndex: 1,
              placeItems: 'center',
            }}
            transition={{ ease: [0.86, 0.03, 0.1, 1], duration: 2 }}
          />
        ) : (
          <></>
        )}
      </LoadingButton>

      <Typography
        color={palette.text.primary}
        fontWeight="light"
        sx={{
          mt: 2,
          fontSize: 13,
          fontWeight: 'normal',
          textAlign: 'center',
        }}
      >
        É novo por aqui?
        <Typography
          onClick={() => navigate('/registro')}
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
          Registre-se
        </Typography>
      </Typography>
    </form>
  )
}

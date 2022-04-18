import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

interface FormAsyncAutoCompleteProps extends Omit<ControllerProps, 'render'> {
  label: string
  isRequired?: boolean
  fetchData: () => Promise<{ name: string; [field: string]: any }[]>
}

export function AsyncAutoComplete({ name, fetchData, control, label, isRequired, ...props }: FormAsyncAutoCompleteProps) {
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [data, setData] = useState<{ name: string; [field: string]: any }[]>([])

  async function startFetch(_: any, value: any) {
    if (!isFocused || value.length < 3) return setData([])
    setLoading(true)
    const data = await fetchData()
    setData(data)
    setLoading(false)
  }

  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          {...props}
          onChange={(_, data) => onChange(data)}
          loading={loading}
          options={data}
          onInputChange={useDebouncedCallback(startFetch, 500)}
          getOptionLabel={(option: { name: string }) => option?.name}
          blurOnSelect
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          noOptionsText={'Nenhum resultado encontrado'}
          value={value}
          renderInput={params => (
            <TextField
              label={label}
              variant="outlined"
              required={isRequired}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="primary" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      )}
    />
  )
}

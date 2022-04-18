import styled from '@emotion/styled'
import { Box, TextField } from '@mui/material'
import { BoxProps } from '@mui/system'

interface SearchInputProps extends BoxProps {
  theme: 'dark' | 'white'
}

export function SearchInput(props: SearchInputProps) {
  const StyledTextField = styled(TextField)({
    input: { color: props.theme },
    '& ::placeholder': { color: props.theme },
    '& label.Mui-focused': { color: props.theme },
    '& .MuiInput-underline:after': { borderBottomColor: props.theme },
    '& .MuiFormLabel-root': { color: props.theme },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: props.theme },
      '&:hover fieldset': { borderColor: props.theme },
      '&.Mui-focused fieldset': { borderColor: props.theme },
    },
  })

  return (
    <Box sx={{ background: props.theme === 'white' ? '#00000026' : '', borderRadius: 2 }} {...props}>
      <StyledTextField label="Pesquisar..." fullWidth>
        SearchInput
      </StyledTextField>
    </Box>
  )
}

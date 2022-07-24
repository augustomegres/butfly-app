import { Button } from '@mui/material'
import { HiPlusSm } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export function AddAction({ addFunction }: { addFunction: VoidFunction }) {
  return (
    <>
      <Button
        fullWidth
        onClick={() => addFunction()}
        color="primary"
        variant="contained"
        style={{ height: 46, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}
      >
        <HiPlusSm size={22} />
      </Button>
    </>
  )
}

import { Button } from '@mui/material'
import { useState } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { NewProductDialog } from './NewProductDialog'

export function NewProduct() {
  const [isOpen, setIsOpen] = useState(false)
  function onClose() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        fullWidth
        onClick={() => setIsOpen(true)}
        color="primary"
        variant="contained"
        style={{ height: 46, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}
      >
        <HiPlusSm size={22} />
      </Button>
      <NewProductDialog isOpen={isOpen} onClose={onClose} />
    </>
  )
}

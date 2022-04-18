import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useContext } from 'react'
import { CheckoutContext } from '../Contexts/CheckoutContext'

interface RemoveProductProps {
  open: boolean
  setOpen: (boolean) => void
}

export function RemoveProduct({ open, setOpen }: RemoveProductProps) {
  const { selectedProduct, removeProduct } = useContext(CheckoutContext)

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      {selectedProduct && (
        <>
          <DialogTitle>Deseja remover este produto?</DialogTitle>
          <DialogContent>
            <DialogContentText>Você está removendo o produto &quot;{selectedProduct.product.name}&quot;</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button
              autoFocus
              color="error"
              variant="contained"
              onClick={() => {
                removeProduct(selectedProduct.product.uid)
                setOpen(false)
              }}
            >
              Remover
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography, useTheme } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { IoPrint } from 'react-icons/io5'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { IconLabel } from '../../../components/IconLabel'
import { currencyFormat } from '../../../utils/currencyFormat'
import { CheckoutContext } from '../Contexts/CheckoutContext'

interface FinishTransactionProps {
  open: boolean
  setOpen: (boolean) => void
}

export function FinishTransaction({ open, setOpen }: FinishTransactionProps) {
  const { useCustomer, useAddress, address, customer, products, handleSubmitCheckout, handleReset } = useContext(CheckoutContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({ content: () => componentRef.current })

  const theme = useTheme()
  const totalDiscount = products
    .map(products => {
      const discount = products.discount || 0
      const quantity = products.quantity || 0
      const amount = products.amount || 0

      if (products.discountType === 'percentage') {
        const discountPercent = discount / 100
        const discountValue = amount * discountPercent
        return discountValue * quantity
      }
      return discount * quantity
    })
    .reduce((prev, value) => prev + value)
  const subtotal = products.map(products => (products.amount || 0) * (products.quantity || 0)).reduce((prev, value) => prev + value)
  const total = subtotal - totalDiscount

  async function handleSubmit() {
    if (useAddress && !address) return toast.error('O endereço deve ser informado, caso não deseje usar um, desmarque a opção.')
    if (useCustomer && !customer) return toast.error('O cliente deve ser informado, caso não deseje usar um, desmarque a opção.')
    setIsLoading(true)
    await handleSubmitCheckout()
      .then(() => setIsFinished(true))
      .catch(e => toast.error('Falha ao concluir a venda, tente novamente ou entre em contato com nosso suporte.'))
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onClose={() => !isFinished && setOpen(false)}>
      {!isFinished && (
        <>
          <DialogTitle>Deseja concluir esta venda?</DialogTitle>
          <DialogContent>
            <DialogContentText>Confirme os dados informados antes de finalizar a venda.</DialogContentText>

            <Box display="flex" mt={3} mb={1} sx={{ background: theme.palette.background.paper }} py={1} px={2} borderRadius={2}>
              <Typography color="gray" fontSize="sm" sx={{ fontSize: 14 }}>
                Produto
              </Typography>
              <Typography ml="auto" color="gray" sx={{ fontSize: 14 }}>
                Total
              </Typography>
            </Box>
            {products.map((product, index) => (
              <Box display="flex" p={2} py={0} key={index}>
                <Typography sx={{ fontSize: 14 }}>
                  {product.product.name} x{product.quantity}
                </Typography>
                <Typography ml="auto" sx={{ fontSize: 14 }}>
                  {currencyFormat((product.amount || 0) * (product.quantity || 0))}
                </Typography>
                {!!(product.discount && product.discountType === 'money') && (
                  <Typography sx={{ fontSize: 14, ml: 1, color: theme.palette.success.main }}>(-{currencyFormat(product.discount)})</Typography>
                )}
                {!!(product.discount && product.discountType === 'percentage') && (
                  <Typography sx={{ fontSize: 14, ml: 1, color: theme.palette.success.main }}>(-{product.discount}%)</Typography>
                )}
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" p={2} py={0}>
              <Typography sx={{ fontSize: 14, fontWeight: 'light' }}>Subtotal</Typography>
              <Typography ml="auto" sx={{ fontSize: 14, fontWeight: 'light' }}>
                {currencyFormat(subtotal)}
              </Typography>
            </Box>

            <Box display="flex" p={2} py={0}>
              <Typography sx={{ fontSize: 14, fontWeight: 'light' }}>Descontos</Typography>
              <Typography ml="auto" sx={{ fontSize: 14, color: theme.palette.success.main, fontWeight: 'light' }}>
                - {currencyFormat(totalDiscount)}
              </Typography>
            </Box>

            <Box display="flex" p={2} py={0} mt={1}>
              <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>Total</Typography>
              <Typography ml="auto" sx={{ fontSize: 14, fontWeight: 'bold' }}>
                {currencyFormat(total)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <LoadingButton onClick={handleSubmit} autoFocus color="primary" variant="contained" loading={isLoading}>
              Finalizar
            </LoadingButton>
          </DialogActions>
        </>
      )}

      {isFinished && (
        <>
          <DialogTitle>Venda concluída com sucesso</DialogTitle>
          <DialogContent>
            <PrintableArea ref={componentRef}>123456789</PrintableArea>

            <IconLabel Icon={IoPrint} onSubmit={handlePrint} label="Imprimir resumo" />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleReset} color="error" variant="contained">
              Realizar outra venda
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export const PrintableArea = styled.div`
  display: none;
  @media print {
    display: block;
  }
`

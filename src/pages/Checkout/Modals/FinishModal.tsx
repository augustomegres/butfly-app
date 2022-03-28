import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { IoMail, IoReceipt } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { IconLabel } from '../../../components/IconLabel'
import { currencyFormat } from '../../../utils/currencyFormat'
import { CheckoutContext } from '../Contexts/CheckoutContext'

interface FinishModalProps {
  open: boolean
  setOpen: (boolean) => void
}

export function FinishModal({ open, setOpen }: FinishModalProps) {
  const { products, handleSubmitCheckout, handleReset } = useContext(CheckoutContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const theme = useTheme()

  const totalDiscount = products
    .map(products => {
      if (products.discountType === 'percentage') {
        const discountPercent = products.discount / 100
        const discountValue = products.amount * discountPercent
        return discountValue * products.quantity
      }
      return products.discount * products.quantity
    })
    .reduce((prev, value) => prev + value)
  const subtotal = products.map(products => products.amount * products.quantity).reduce((prev, value) => prev + value)
  const total = subtotal - totalDiscount

  async function handleSubmit() {
    setIsLoading(true)
    await handleSubmitCheckout()
      .then(() => {
        setIsFinished(true)
      })
      .catch(e => {
        toast.error('Falha ao concluir a venda, tente novamente ou entre em contato com nosso suporte.')
      })
    setIsLoading(false)
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
            {products.map(product => (
              <Box display="flex" p={2} py={0}>
                <Typography sx={{ fontSize: 14 }}>
                  {product.product.name} x{product.quantity}
                </Typography>
                <Typography ml="auto" sx={{ fontSize: 14 }}>
                  {currencyFormat(product.amount * product.quantity)}
                </Typography>
                {product.discount && product.discountType === 'money' && (
                  <Typography sx={{ fontSize: 14, ml: 1, color: theme.palette.success.main }}>(-{currencyFormat(product.discount)})</Typography>
                )}
                {product.discount && product.discountType === 'percentage' && (
                  <Typography sx={{ fontSize: 14, ml: 1, color: theme.palette.success.main }}>(-{product.discount}%)</Typography>
                )}
              </Box>
            ))}
            <Divider
              sx={{
                my: 2
              }}
            />

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
            <IconLabel Icon={IoReceipt} onSubmit={() => console.log('Recibo')} label="Visualizar resumo" />
            <IconLabel Icon={IoMail} onSubmit={() => console.log('Mail')} label="Enviar resumo por email ao cliente" />
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

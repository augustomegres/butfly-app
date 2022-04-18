import { Box, BoxProps, Button, Typography, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { CheckoutContext } from '../Contexts/CheckoutContext'
import { RemoveProduct } from '../Modals/RemoveProduct'
import { ProductCard } from './ProductCard'

interface ProductListProps extends BoxProps {
  finishModal: Dispatch<React.SetStateAction<boolean>>
}

export function ProductList(props: ProductListProps) {
  const [removeProductModalIsOpen, setRemoveProductModalIsOpen] = useState(false)
  const { products, step, setStep } = useContext(CheckoutContext)
  const { palette } = useTheme()

  function next() {
    if (products.length < 1) return toast.info('Adicione ao menos um produto para prosseguir.')
    if (step > 2) return
    if (step === 2) return props.finishModal(true)

    setStep(step + 1)
  }
  function previous() {
    if (step <= 1) return
    setStep(step - 1)
  }

  return (
    <Box {...props}>
      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary} mb={4}>
        Produtos adicionados
      </Typography>
      <Box style={{ minHeight: 'calc(100% - 82px)', height: '300px', overflowY: 'auto' }}>
        {/* @ts-expect-error */}
        <AnimatePresence initial={false}>
          {products.map((product, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100, height: 0 }}>
              <ProductCard sx={{ mb: 2 }} product={product} index={index} openRemoveProduct={setRemoveProductModalIsOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
      <RemoveProduct open={removeProductModalIsOpen} setOpen={setRemoveProductModalIsOpen} />
      <Box display="flex" justifyContent={'flex-end'}>
        <Button variant="contained" disabled={step === 1} onClick={previous}>
          Voltar
        </Button>
        <Button variant="contained" sx={{ ml: 1 }} onClick={next}>
          {step < 2 ? 'Continuar' : 'Finalizar'}
        </Button>
      </Box>
    </Box>
  )
}

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListProps, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { MdExpandLess, MdExpandMore, MdPointOfSale } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsBarChartFill } from 'react-icons/bs'
import { FaDollarSign, FaPalette, FaShoppingCart, FaUser } from 'react-icons/fa'
import { RiSettings2Fill } from 'react-icons/ri'
import { GoPrimitiveDot } from 'react-icons/go'
import { IoExtensionPuzzle } from 'react-icons/io5'

interface NavListProps extends ListProps {
  theme: 'white' | 'dark'
}
const availableRoutes: {
  Icon: any
  label: string
  path: string
  isCollapse: boolean
  selectedInRoutes?: string[]
  subItems?: { label: string; path: string }[]
}[] = [
  { Icon: BsBarChartFill, label: 'Dashboard', path: '/', isCollapse: false },
  { Icon: MdPointOfSale, label: 'Ponto de venda', path: '/ponto-de-venda', isCollapse: false },
  { Icon: FaUser, label: 'Clientes', path: '/clientes', isCollapse: false },
  { Icon: FaShoppingCart, label: 'Produtos', path: '/produtos', isCollapse: false },
  { Icon: FaDollarSign, label: 'Vendas', path: '/vendas', isCollapse: false },
  { Icon: IoExtensionPuzzle, label: 'Extensões', path: '/extensoes', isCollapse: false },
  { Icon: FaPalette, label: 'Personalizar', path: '/personalizar', isCollapse: false }
]

export function NavList(props: NavListProps) {
  const theme = props.theme
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [selectedPath, setSelectedPath] = useState(path)
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null)
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleCollapse = (index: number, isCollapse: boolean, path: string) => {
    if (isCollapse) {
      if (expandedIndex === index) return setExpandedIndex(null)
      setExpandedIndex(index)
    } else {
      navigate(path)
      setSelectedPath(path)
    }
  }

  const isSelected = (listPath?: string): boolean => {
    if (selectedPath === '/' && listPath === '/') return true
    if (selectedPath === '/' && listPath !== '/') return false
    if (listPath?.startsWith(selectedPath)) return true
    return false
  }
  return (
    <List component="nav" {...props}>
      {availableRoutes.map(({ label, Icon, subItems, path, isCollapse }, index) => (
        <Box key={index}>
          <ListItemButton
            key={index}
            onClick={() => handleCollapse(index, isCollapse, path)}
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-start',
              mb: 1,
              transition: '.5s',
              background: isSelected(path) ? 'rgba(0, 0, 0, 0.15)' : ''
            }}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}
            >
              <Icon style={{ color: theme }} />
            </ListItemIcon>
            <ListItemText sx={{ color: theme }} primary={label} />
            {isCollapse && (expandedIndex === index ? <MdExpandLess color={theme} /> : <MdExpandMore color={theme} />)}
          </ListItemButton>
          <Collapse
            in={expandedIndex === index}
            timeout="auto"
            unmountOnExit
            sx={{
              mb: 1,
              borderRadius: 2,
              transition: '.5s'
            }}
          >
            <List component="div" disablePadding>
              {subItems?.map(({ label, path }, index) => (
                <ListItemButton
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: isMobile ? 'center' : 'flex-start',
                    background: isSelected(path) ? 'rgba(0, 0, 0, 0.15)' : ''
                  }}
                  onClick={() => {
                    setSelectedPath(path)
                    navigate(path)
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: isMobile ? 'flex' : 'block',
                      justifyContent: 'center',
                      pl: 2
                    }}
                  >
                    <GoPrimitiveDot style={{ color: theme }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: isMobile ? 'initial' : theme }} primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  )
}

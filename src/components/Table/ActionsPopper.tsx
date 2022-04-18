import { ClickAwayListener, Fade, MenuItem, MenuList, Paper, Popper, PopperProps } from '@mui/material'

interface ActionsPopperProps extends Omit<PopperProps, 'open'> {
  popperIsOpen: boolean
  setPopperIsOpen: (value: boolean) => void
  actions: {
    [field: string]: {
      icon: React.FC
      label: string | number
      function: (rowData: any) => void
    }
  }
  anchorEl: any
  rowData: { [field: string]: any }
}

export function ActionsPopper({ popperIsOpen, setPopperIsOpen, anchorEl, actions, rowData, ...props }: ActionsPopperProps) {
  return (
    <Popper open={popperIsOpen} anchorEl={anchorEl} transition placement="bottom-start" {...props}>
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={() => setPopperIsOpen(false)}>
          <Fade {...TransitionProps}>
            <Paper>
              <MenuList autoFocus>
                {Object.keys(actions).map((action, index) => {
                  const ActionIcon: React.FC<any> = actions[action].icon
                  return (
                    <MenuItem key={index} onClick={() => actions[action].function(rowData)}>
                      <ActionIcon style={{ marginRight: 12 }} />
                      {actions[action].label}
                    </MenuItem>
                  )
                })}
              </MenuList>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  )
}

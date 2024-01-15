import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AppMap from './../Ui/AppMap'
import { ReactNode } from 'react'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid transparent',
  borderRadius: '10px',
  boxShadow: 24,
  p: 2
}

interface IProps {
  open: boolean
  handleOpen: () => void
  setOpen: (val: boolean) => void
  children?: ReactNode
}
export default function AppModal ({ setOpen, open, children }: IProps) {
  const handleClose = () => setOpen(false)

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h6'>
            Shop Location
          </Typography>

          <Box component={'section'} sx={{ height: 300 }}>
            <AppMap />
          </Box>
          {/* start inputs */}

          <Box
            component={'section'}
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'between',
              mt: 3,
              direction: 'row'
            }}
          >
            {children}
          </Box>
          {/* ens inputs */}
        </Box>
      </Modal>
    </div>
  )
}

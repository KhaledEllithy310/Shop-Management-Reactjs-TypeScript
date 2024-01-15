import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AppButton from '../Ui/Button'
import Input from '../Ui/Input'
import AppMap from './../Ui/AppMap'

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
}
export default function AppModal ({ setOpen, open }: IProps) {
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
            sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 3 }}
          >
            <Input title='Shop Name' type='text' />
            <Input title='Phone Number' type='number' />
            <Input title='Shop Code' type='text' />
          </Box>
          {/* ens inputs */}

          {/* start actions */}
          <Box
            component={'section'}
            sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 3 }}
          >
            <AppButton
              onClick={handleClose}
              variant='outlined'
              title='Cancel'
              color='error'
              fullWidth
              sx={{ textTransform: 'capitalize' }}
            />
            <AppButton
              variant='contained'
              sx={{ textTransform: 'capitalize' }}
              title='Continue'
              fullWidth
            />
          </Box>
          {/* end actions */}
        </Box>
      </Modal>
    </div>
  )
}

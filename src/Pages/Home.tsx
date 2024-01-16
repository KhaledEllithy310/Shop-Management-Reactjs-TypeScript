import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import AppModal from '../components/Modal/Modal'
import { useState } from 'react'
import AppMap from '../components/Ui/AppMap'
import AddForm from '../components/AddForm/AddForm'
import AppTable from '../components/Ui/table'

export default function Home () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <>
      <Box
        component={'section'}
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: 1
        }}
      >
        <h1>shop management</h1>
        <Button
          variant='outlined'
          startIcon={<Add />}
          sx={{ textTransform: 'capitalize' }}
          onClick={handleOpen}
        >
          Add Shop
        </Button>
      </Box>

      <Box component={'section'} sx={{ height: 400 }}>
        <AppMap />
      </Box>
      <AppModal handleOpen={handleOpen} setOpen={setOpen} open={open}>
        <AddForm handleClose={() => setOpen(false)} />
      </AppModal>

      <AppTable openModal={handleOpen} />
    </>
  )
}

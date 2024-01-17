import { MoreVert } from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { IShop } from '../../interfaces'
import { useRecoilState } from 'recoil'
import { currentShopState } from '../../Atoms/CurrentShop'
import { useDeleteShop } from '../../hooks/useDeleteShop'
interface IProps {
  shop: IShop
  openModal: () => void
}
export default function ActionMenu ({ shop, openModal }: IProps) {
  //========STATES==========//
  const [, setCurrentShop] = useRecoilState(currentShopState)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const deleteShop = useDeleteShop()
  //========HANDLERS==========//

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteShop = () => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      deleteShop(shop)
    }
    handleClose()
  }

  const handleEditShop = () => {
    setCurrentShop(shop)
    openModal()
    handleClose()
  }
  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleEditShop}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteShop}>Remove</MenuItem>
      </Menu>
    </div>
  )
}

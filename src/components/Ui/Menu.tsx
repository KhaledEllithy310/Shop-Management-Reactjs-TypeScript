import { MoreVert } from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { IShop } from '../../interfaces'
interface IProps {
  shop: IShop
  setShops: (val: (prev: IShop[]) => IShop[]) => void
}
export default function ActionMenu ({ shop, setShops }: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteShop = () => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      setShops((prev: IShop[]) =>
        prev.filter(item => item.shopName !== shop.shopName)
      )
    }

    //   setShops
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteShop}>Remove</MenuItem>
      </Menu>
    </div>
  )
}

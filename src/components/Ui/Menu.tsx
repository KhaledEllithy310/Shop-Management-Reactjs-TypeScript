import { MoreVert } from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { IShop } from '../../interfaces'
import { useRecoilState } from 'recoil'
import { shopState } from '../../Atoms/Shops'
import { currentShopState } from '../../Atoms/CurrentShop'
interface IProps {
  shop: IShop
  openModal: () => void
}
export default function ActionMenu ({ shop, openModal }: IProps) {
  //========STATES==========//
  const [, setCurrentShop] = useRecoilState(currentShopState)
  const [, setShops] = useRecoilState(shopState)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  //========HANDLERS==========//

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

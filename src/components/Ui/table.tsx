import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ActionMenu from './Menu'
import { useRecoilState } from 'recoil'
import { shopState } from '../../Atoms/Shops'

const headTitle = ['Shop Name', 'Shop Code', 'location', 'Phone Number', '']

export default function AppTable () {
  const [shops] = useRecoilState(shopState)

  console.log(shops)

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, border: '1px solid #f5f5f5' }}
        aria-label='simple table'
      >
        <TableHead
          sx={{
            backgroundColor: '#f5f5f5'
          }}
        >
          <TableRow>
            {headTitle.map(title => (
              <TableCell
                key={title}
                align='center'
                sx={{
                  borderRight: '1px solid #000',
                  borderLeft: '1px solid #000'
                }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {shops.map(shop => (
            <TableRow
              key={shop.shopName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row' align='center'>
                {shop.shopName}
              </TableCell>
              <TableCell align='center'>{shop.shopCode}</TableCell>
              <TableCell align='center'>{shop.location.address}</TableCell>
              <TableCell align='center'>{shop.phoneNumber}</TableCell>
              {/* Start Actions menu */}
              <TableCell align='center'>
                <ActionMenu shop={shop} />
              </TableCell>
              {/* End Actions menu */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

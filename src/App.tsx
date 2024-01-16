import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={router} />
        <ToastContainer />
      </RecoilRoot>
    </>
  )
}

export default App

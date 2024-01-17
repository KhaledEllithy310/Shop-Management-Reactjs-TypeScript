import { API_KEY } from '../../constants'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useRecoilState } from 'recoil'
import { locationState } from '../../Atoms/Location'
import { ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const AppMap = ({ children }: IProps) => {
  //----------STATES----------//
  const [location] = useRecoilState(locationState)

  // Places
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  })

  if (!isLoaded) return <div>...Loading</div>

  const position = { lat: 22.54992, lng: 0 }

  return (
    <>
      <section className='map-container'>
        <GoogleMap
          zoom={2}
          center={position}
          mapContainerClassName='map-container'
        >
          {children
            ? children
            : location.address && <Marker position={location} />}
        </GoogleMap>
      </section>
    </>
  )
}
export default AppMap

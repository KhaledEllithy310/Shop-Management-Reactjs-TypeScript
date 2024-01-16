import { API_KEY } from '../../constants'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useRecoilState } from 'recoil'
import { locationState } from '../../Atoms/Location'

const AppMap = () => {
  //----------STATES----------//
  const [location] = useRecoilState(locationState)

  console.log('selected', location)

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
          zoom={5}
          center={position}
          mapContainerClassName='map-container'
        >
          {location.address && <Marker position={location} />}
        </GoogleMap>
      </section>
    </>
  )
}
export default AppMap

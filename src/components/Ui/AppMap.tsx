import { useState } from 'react'
import { API_KEY } from '../../constants'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import PlacesAutocomplete from './PlacesAutoComplete'

const AppMap = () => {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  )
  console.log('selected', selected)

  // Places
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  })
  console.log(isLoaded)

  if (!isLoaded) return <div>...Loading</div>

  const position = { lat: 22.54992, lng: 0 }

  return (
    <>
      <section>
        <PlacesAutocomplete setSelected={setSelected} />
      </section>

      <GoogleMap
        zoom={5}
        center={position}
        mapContainerClassName='map-container'
      >
        ;<Marker position={selected || { lat: 0, lng: 0 }} />
      </GoogleMap>
    </>
  )
}
export default AppMap

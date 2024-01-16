import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover
} from '@reach/combobox'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import '@reach/combobox/styles.css'
import { locationState } from '../../Atoms/Location'
import { useRecoilState } from 'recoil'
import { IShop } from '../../interfaces'
import { useEffect } from 'react'

interface IProps {
  currentShop: IShop
}
const PlacesAutocomplete = ({ currentShop }: IProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete()

  const [, setLocation] = useRecoilState(locationState)
  useEffect(() => {
    if (currentShop?.location?.address) {
      handleSelect(currentShop.location.address)
    }
  }, [])

  console.log(data, status, ready)

  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()
    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    setLocation({ lat, lng, address })
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        className='combobox-input'
        placeholder='Search an address'
      />
      <ComboboxPopover style={{ zIndex: 9999 }}>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default PlacesAutocomplete

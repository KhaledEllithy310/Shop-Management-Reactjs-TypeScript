import { API_KEY } from "../../constants";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { locationState } from "../../Atoms/Location";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
interface IProps {
  children?: ReactNode;
}
const AppMap = ({ children }: IProps) => {
  //----------STATES----------//
  const mapRef = useRef<GoogleMap>();
  const [location, setLocation] = useRecoilState(locationState);
  const position = useMemo<google.maps.LatLngLiteral>(
    () => ({ lat: 22.54992, lng: 0 }),
    []
  );

  const [coordinates, setCoordinates] = useState<{ lng: number; lat: number }>({
    lng: 0,
    lat: 0,
  });
  useEffect(() => {
    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: coordinates.lat, lng: coordinates.lng } },
        (results, status) => {
          if (status === "OK") {
            if (results) {
              if (results[0]) {
                console.log(`Address: ${results[0].formatted_address}`);
                setLocation({
                  lat: coordinates.lat,
                  lng: coordinates.lng,
                  address: results[0].formatted_address,
                });
              }
            }
          }
        }
      );
    }
  }, [coordinates]);
  const options = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  if (Object.keys(location).length > 0) {
    const { lat, lng } = location;
    mapRef.current?.panTo({ lat, lng });
  }
  // Places
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>...Loading</div>;

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    console.log("map click", e);
    if (e.latLng === null) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log(`User clicked at (${lat}, ${lng})`);
    setCoordinates({ lat, lng });
  };
  return (
    <>
      <section className="map-container">
        <GoogleMap
          zoom={2}
          center={position}
          options={options}
          onClick={handleMapClick}
          mapContainerClassName="map-container"
          onLoad={onLoad}
        >
          {children
            ? children
            : location.address && <Marker position={location} />}
        </GoogleMap>
      </section>
    </>
  );
};
export default AppMap;

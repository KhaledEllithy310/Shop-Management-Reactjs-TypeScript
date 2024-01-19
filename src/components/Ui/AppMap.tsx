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
  open: boolean;
}
type Library = "places";

const libraries: Library[] = ["places"];
const AppMap = ({ children, open }: IProps) => {
  //----------STATES----------//
  const mapRef = useRef<GoogleMap>();
  const [location, setLocation] = useRecoilState(locationState);
  const position = useMemo<google.maps.LatLngLiteral>(
    () => ({ lat: 0, lng: 0 }),
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
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>...Loading</div>;

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng === null) return;
    if (!open) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
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

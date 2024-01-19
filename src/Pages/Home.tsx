import { Add } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";
import AppModal from "../components/Modal/Modal";
import { useEffect, useState } from "react";
// import AppMap from '../components/Ui/AppMap'
import AppMap from "../components/Ui/AppMap";
import AddForm from "../components/AddForm/AddForm";
import AppTable from "../components/Ui/table";
import { Marker } from "@react-google-maps/api";
import { useGetShopList } from "../hooks/useGetShopList";
import { useRecoilState } from "recoil";
import { locationState } from "../Atoms/Location";
import { currentShopState } from "../Atoms/CurrentShop";
import { IShop } from "../interfaces";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [, setCurrentShop] = useRecoilState(currentShopState);
  const [, setLocation] = useRecoilState(locationState);
  //get all shops from firebase
  const { shopList } = useGetShopList();

  useEffect(() => {
    if (!open) {
      setCurrentShop({} as IShop);
      setLocation({ lat: 0, lng: 0, address: "" });
    }
  }, [open]);

  //render locations on map
  const renderLocationsOnMap = shopList.map((shop) => {
    return <Marker key={shop.id} position={shop.location} />;
  });
  return (
    <>
      <Container maxWidth="lg">
        <Box
          component={"section"}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 1,
          }}
        >
          <h1>Shop Management</h1>
          <Button
            variant="outlined"
            startIcon={<Add />}
            sx={{ textTransform: "capitalize" }}
            onClick={handleOpen}
          >
            Add Shop
          </Button>
        </Box>

        <Box component={"section"} sx={{ height: 400 }}>
          {/* <AppMap>{renderLocationsOnMap}</AppMap> */}
          <AppMap>{renderLocationsOnMap}</AppMap>
        </Box>
        <AppModal handleOpen={handleOpen} setOpen={setOpen} open={open}>
          <AddForm handleClose={() => setOpen(false)} />
        </AppModal>

        <AppTable openModal={handleOpen} />
      </Container>
    </>
  );
}

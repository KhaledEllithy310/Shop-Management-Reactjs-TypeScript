import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../Ui/Input";
import { formFields } from "../../Data";
import { IFormFields, IShop } from "../../interfaces";
import AppButton from "../Ui/Button";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
// import { shopState } from '../../Atoms/Shops'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PlacesAutocomplete from "../Ui/PlacesAutoComplete";
import { locationState } from "../../Atoms/Location";
import { notify } from "../../helpers";
import { currentShopState } from "../../Atoms/CurrentShop";
import { useEffect } from "react";
import { useAddShop } from "../../hooks/useAddShop";
import { useEditShop } from "../../hooks/useEditShop";
interface IProps {
  handleClose: () => void;
}
const AddForm = ({ handleClose }: IProps) => {
  //----------STATES----------//
  //current shop for editing
  const [currentShop, setCurrentShop] = useRecoilState(currentShopState);
  const [location, setLocation] = useRecoilState(locationState);

  //----------HANDLERS----------//

  const addShop = useAddShop();
  const editShop = useEditShop();

  const contactSchema = z.object({
    shopName: z.string().min(3, "shop name is required at least 3 characters"),
    shopCode: z.string().min(3, "shop code is required"),
    phoneNumber: z
      .string()
      .regex(/^(0)(10|11|15)\d{8}$/, "Invalid phone number format"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormFields>({
    mode: "onChange",
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<IFormFields> = (shop) => {
    //check if user has selected location
    if (location.address) {
      //handle edit shop
      if (Object.keys(currentShop).length > 0) {
        editShop({ ...shop, location, id: currentShop.id });
        notify("success", "shop updated successfully");
        setCurrentShop({} as IShop);
        handleClose();
      } else {
        //handle add shop
        //send request to firebase and update recoil
        addShop({ ...shop, location });
        handleClose();
        notify("success", "shop added successfully");
      }
    } else notify("error", "please select your location");
    setLocation({ lat: 0, lng: 0, address: "" });
  };

  useEffect(() => {
    if (currentShop) {
      reset(currentShop);
    }
  }, [currentShop]);

  const handleCloseForm = () => {
    handleClose();
    setCurrentShop({} as IShop);
    setLocation({ lat: 0, lng: 0, address: "" });
  };
  //----------RENDERS----------//

  const renderInputForm = formFields.map((field) => (
    <Input
      key={field.name}
      title={field.label}
      type={field.type}
      name={field.name}
      register={register}
      errors={errors}
    />
  ));

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <section className="form__inputs">{renderInputForm}</section>{" "}
      {/* start actions */}
      <Box
        component={"section"}
        sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 3 }}
      >
        <section className="PlacesAutocomplete">
          <PlacesAutocomplete currentShop={currentShop} />
        </section>
        <AppButton
          onClick={handleCloseForm}
          variant="outlined"
          title="Cancel"
          color="error"
          fullWidth
          sx={{ textTransform: "capitalize" }}
        />
        <AppButton
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          title="Continue"
          fullWidth
          type="submit"
        />
      </Box>
      {/* end actions */}
    </form>
  );
};

export default AddForm;

import { toast } from "react-toastify";

export const notify = (status: string, massage: string) => {
  switch (status) {
    case "success":
      toast.success(massage);
      break;
    case "warning":
      toast.warning(massage);
      break;
    case "error":
      toast.error(massage);
      break;
  }
};

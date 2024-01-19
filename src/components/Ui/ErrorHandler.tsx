import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const navigator = useNavigate();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ marginTop: 5, fontWeight: "bold" }}>
          {statusCode} - {title}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 5 }}>
          Oops something went wrong. Try to refresh this page or feel free to
          contact us if the problem persists.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginTop: 10,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigator("/")}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigator(0)}
          >
            Refresh
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorHandler;

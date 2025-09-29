import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <CircularProgress size={80} thickness={5} />
    </Box>
  );
};

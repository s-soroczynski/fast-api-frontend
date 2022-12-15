import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

export const Header = () => {
  const styles = {
    box: {
      m: "40px 0 80px 0",
      display: "flex",
      justifyContent: "space-between",
    },
  };
  return (
    <Box sx={styles.box}>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.REGISTRATION}>Registration</Link>
    </Box>
  );
};

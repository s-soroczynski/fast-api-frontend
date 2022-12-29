import React from "react";
import { Box, Rating, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Template } from "../../common/Template/Template";
import { useFetch } from "../../hooks/useFetch";
import { BASE_URL, ROUTES } from "../../constants";
import { PublicToiletType } from "../../types/PublicToilet";

export const PublicToilets = () => {
  const navigation = useNavigate();
  const goToPublicToilet = (id: number) => {
    navigation(ROUTES.PUBLIC_TOILET.replace(":id", id.toString()), {
      replace: true,
    });
  };
  const { response, loading } = useFetch<PublicToiletType[]>(
    `${BASE_URL}/public-toilets`
  );

  const styles = {
    box: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: "20px",
      padding: "20px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      cursor: "pointer",
      transition: "background-color 150ms ease-out 100ms",
      "&:hover": {
        backgroundColor: "#eee",
      },
    },
    rate: {
      mt: "-20px",
      mr: "-10px",
    },
  };

  return (
    <Template>
      <Grid item xs={12} md={6}>
        {!loading &&
          response?.map((publicToilet) => {
            return (
              <Box
                sx={styles.box}
                key={publicToilet.id}
                onClick={() => goToPublicToilet(publicToilet.id)}
              >
                <Typography>{publicToilet.name}</Typography>
                <Rating
                  sx={styles.rate}
                  value={publicToilet.rate}
                  size="small"
                />
              </Box>
            );
          })}
      </Grid>
    </Template>
  );
};

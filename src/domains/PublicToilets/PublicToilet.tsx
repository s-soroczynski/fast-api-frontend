import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Rating } from "@mui/material";

import { Template } from "../../common/Template/Template";
import { BASE_URL } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { PublicToiletType } from "../../types/PublicToilet";
import { UserDetailsType } from "../../types/User";
import { fetchHelper } from "../../helpers";
import { flexbox } from "@mui/system";

export const PublicToilet = memo(() => {
  let { id } = useParams();
  const [user, setUser] = useState<UserDetailsType | null>(null);
  const { response: publicToilet, loading: publicToiletLoading } =
    useFetch<PublicToiletType>(`${BASE_URL}/public-toilets/${id}`);

  useEffect(() => {
    if (publicToilet?.user_id) {
      fetchHelper({ url: `${BASE_URL}/users/${publicToilet.user_id}` }).then(
        (userData: UserDetailsType) => {
          console.log(userData, "res");
          setUser(userData);
        }
      );
    }
  }, [publicToilet]);

  const styles = {
    boxUpper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mt: "30px",
    },
  };

  return !publicToiletLoading && publicToilet ? (
    <Template>
      <>
        <Typography variant="h2">PublicToilet: {publicToilet.name}</Typography>
        <Box sx={styles.boxUpper}>
          {user && (
            <>
              <Typography variant="h5">
                Użytkownik {user.email} dodał toalete
              </Typography>
              <Rating value={publicToilet.rate} />
            </>
          )}
        </Box>
      </>
    </Template>
  ) : null;
});

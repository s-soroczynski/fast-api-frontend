import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";

import { Template } from "../../common/Template/Template";
import { Map, MarkerType } from "../../common/Map/Map";
import { BASE_URL } from "../../constants";
import { getItemFromLocalStorage } from "../../helpers";

type InputsType = {
  name: string;
  lat: number;
  lng: number;
};

export const AddPublicToilet = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputsType>();
  register("lat", { required: true });
  register("lng", { required: true });
  const styles = {
    submit: {
      mt: "30px",
      width: 200,
    },
    name: {
      mb: "30px",
      width: "100%",
    },
    title: {
      mb: "60px",
      textAlign: "center",
    },
  };
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    fetch(`${BASE_URL}/public-toilets`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
      });
  };

  const handleClickOnMap = (marker: MarkerType) => {
    setValue("lng", marker.lng);
    setValue("lat", marker.lat);
  };

  return (
    <Template>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={styles.title} variant="h2" gutterBottom>
          Dodaj nową publiczną toaletę
        </Typography>
        <TextField
          sx={styles.name}
          label="Nazwa"
          variant="outlined"
          {...register("name", { required: true })}
        />
        <Map handleOnClickMap={handleClickOnMap} />
        <LoadingButton sx={styles.submit} variant="contained" type="submit">
          zapisz
        </LoadingButton>
      </form>
    </Template>
  );
};

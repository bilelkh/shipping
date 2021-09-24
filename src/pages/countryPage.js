import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    countriesSelector, fetchCountries, setSelectedCountries
} from "../slices/country";


export default function CountryPage() {
  //The ISO (alpha2) code of the selected countries should be accessible as an array in Redux.

  const [currentLanguage, setCurrentLanguage] = React.useState("en");

  //   const [currentLanguage, setCurrentLanguage] = React.useState("en");
  const dispatch = useDispatch();
  const { countries, loading, hasErrors, selectedCountries } =
    useSelector(countriesSelector);

  const handleChange = (event) => {
    setCurrentLanguage(event.target.value);
    dispatch(fetchCountries(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchCountries(currentLanguage));
  }, [dispatch]);

  const handleSetSelectedCountries = (value) => {
    dispatch(setSelectedCountries(value));
  };

  useEffect(() => {
    const auxSelectedCountries = countries.filter((country) =>
      selectedCountries.find((item) => item.id === country.id)
    );
    dispatch(setSelectedCountries(auxSelectedCountries));
  }, [countries]);

  
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 2, md: 3 }}
    >
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            current language
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentLanguage}
            label="currentLanguage"
            onChange={handleChange}
          >
            <MenuItem value="en">Anglais</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          onChange={(event, value) => handleSetSelectedCountries(value)} // prints the selected value
          multiple
          id="tags-outlined"
          options={countries}
          value={selectedCountries}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="filterSelectedOptions"
              placeholder="Countries"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

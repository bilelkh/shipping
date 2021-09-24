import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

import {
  countriesSelector,
  fetchCountries,
  setSelectedCountries
} from "../slices/country";

import {
  languageSelector,
  setLanguageAction
} from "../slices/language";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paperBox: {
    margin: 10,
    padding: 5
  }
});

export default function CountryPage() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState("en");
  const dispatch = useDispatch();
  const { countries, selectedCountries } = useSelector(countriesSelector);
  const { language } = useSelector(languageSelector);
  const handleChange = (event) => {
    setCurrentLanguage(event.target.value);
    dispatch(setLanguageAction(i18n, event.target.value));
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
    <Paper elevation={1} className={classes.paperBox}>
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
              {t("currentLanguageInputLabel")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={currentLanguage}
              label={t("currentLanguageInputLabel")}
              onChange={handleChange}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">français</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            onChange={(event, value) => handleSetSelectedCountries(value)} // prints the selected value
            multiple
            options={countries}
            value={selectedCountries}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("autocompletePlaceholder")}
                placeholder="Countries"
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  language: "en"
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload;
    }
  }
});

export const { setLanguage } = languageSlice.actions;

export const languageSelector = (state) => state.language;

export default languageSlice.reducer;

export const setLanguageAction = (i18n, lang) => (dispatch) => {
  i18n.changeLanguage(lang);
  dispatch(setLanguage(lang));
};

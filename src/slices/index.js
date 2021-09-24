import { combineReducers } from "redux";
import countryReducer from "./country";
import languageReducer from "./language";
const rootReducer = combineReducers({
  countries: countryReducer,
  language: languageReducer
});

export default rootReducer;

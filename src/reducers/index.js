import { combineReducers } from "redux";
import snackbarReducer from "./snackbarReducer";
import { drawerReducer } from "./drawerReducer";
import { teamsReducer } from "./teamReducer";

const rootReducers = combineReducers({
    snackbar: snackbarReducer,
    drawer: drawerReducer,
    teams: teamsReducer,
});

export default rootReducers;

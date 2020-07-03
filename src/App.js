import React from "react";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import Routes from "./routes";
import GlobalSnackbar from "./components/globalSnackbar";
import store from "./providers/Store";

function App() {
    return (
        <Provider store={store}>
            <CssBaseline />
            <GlobalSnackbar />
            <Routes />
        </Provider>
    );
}

export default App;

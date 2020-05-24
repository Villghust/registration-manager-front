import React from "react";
import { RecoilRoot } from "recoil";
import { CssBaseline } from "@material-ui/core";
import Routes from "./routes";
import GlobalSnackbar from "./components/globalSnackbar";

function App() {
    return (
        <RecoilRoot>
            <CssBaseline />
            <GlobalSnackbar />
            <Routes />
        </RecoilRoot>
    );
}

export default App;

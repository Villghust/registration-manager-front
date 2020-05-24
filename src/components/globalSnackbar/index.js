import React from "react";
import { useRecoilState } from "recoil";

import { Snackbar } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";

import { snackbar as snackbarState } from "./api/state";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function GlobalSnackbar() {
    const [snackbar, setSnackbar] = useRecoilState(snackbarState);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((previous) => ({
            ...previous,
            open: false,
            message: "",
        }));
    };

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
            <Alert onClose={handleClose} severity={snackbar.status}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}

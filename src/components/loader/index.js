import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const containerStyles = makeStyles({
    root: {
        alignItems: "center",
        display: "flex",
        flex: 1,
        justifyContent: "center",
    },
});

export default function Loader() {
    const classes = containerStyles();
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

import React from "react";
import Lottie from "react-lottie";
import dashboard from "../../assets/dashboard.json";
import { Grid, Typography } from "@material-ui/core";

export default function Dashboard() {
    const iconOptions = {
        loop: true,
        autoplay: true,
        animationData: dashboard,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Lottie options={iconOptions} width={256} height={192} />
            </Grid>
            <Grid item xs={12}>
                <Typography align="center" variant="h4">
                    Hackatona de ProjArq
                </Typography>
            </Grid>
        </Grid>
    );
}

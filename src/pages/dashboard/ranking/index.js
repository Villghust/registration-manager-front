import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Loader from "../../../components/loader";
import { RankingComponent } from "../../../components/ranking";

export const Ranking = () => {
    const state = useSelector((state) => state.teams);

    if (state.loading) {
        return <Loader />;
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    Ranking dos times da hackatona
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    <RankingComponent />
                </Grid>
            </Grid>
        </Grid>
    );
};

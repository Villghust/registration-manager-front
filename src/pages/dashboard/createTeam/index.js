import React from "react";

import { CreateTeam as CreateTeamComponent } from "../../../components/teams/Create";
import { Grid, Typography } from "@material-ui/core";

export const CreateTeam = () => {
    return (
        <Grid container spacing={6} justify="center">
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    Criar um time
                </Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
                <CreateTeamComponent />
            </Grid>
        </Grid>
    );
};

import React from "react";
import { useSelector } from "react-redux";
import { EditTeam } from "../../../../components/teams/Edit";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Loader from "../../../../components/loader";

export const ManageSelectedTeam = () => {
    const { id } = useParams();

    const state = useSelector((state) => state.teams);

    if (state.loading) {
        return <Loader />;
    }

    const team = state.teams.find((t) => t._id === id);

    return (
        <Grid container spacing={6} justify="center">
            <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    Gerenciando o time {team.name}
                </Typography>
            </Grid>
            <Grid item>
                <EditTeam />
            </Grid>
        </Grid>
    );
};

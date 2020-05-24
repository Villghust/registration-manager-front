import React from "react";
import { EditTeam } from "../../../../components/teams/Edit";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { useRecoilValue } from "recoil";

import { teamById } from "../../../../components/teams/api/state";
import { ReviewTeam } from "../../../../components/teams/Review";

export const ReviewSelectedTeam = () => {
    const { id } = useParams();

    const team = useRecoilValue(teamById(id));

    return (
        <Grid container spacing={6} justify="center">
            <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    Avaliando o time {team.name}
                </Typography>
            </Grid>
            <Grid item>
                <ReviewTeam />
            </Grid>
        </Grid>
    );
};

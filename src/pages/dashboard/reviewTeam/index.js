import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { List } from "../../../components/teams/List";
import { useRecoilValue } from "recoil";
import { teamsState } from "../../../components/teams/api/state";
import { useHistory } from "react-router-dom";

export const ReviewTeam = () => {
    const teams = useRecoilValue(teamsState);
    const history = useHistory();

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    Selecione o time para avaliar
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    {teams.map((team) => (
                        <Grid
                            item
                            key={team._id}
                            onClick={() =>
                                history.push(
                                    `/dashboard/reviewteam/${team._id}`
                                )
                            }
                        >
                            <List team={team} selectable />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

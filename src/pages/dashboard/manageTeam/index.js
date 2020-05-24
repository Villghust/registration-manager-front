import React from "react";
import { useRecoilValue } from "recoil";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { teamsState } from "../../../components/teams/api/state";
import { List } from "../../../components/teams/List";

export default function ManageTeam() {
    const teams = useRecoilValue(teamsState);
    const history = useHistory();

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    Selecione o time que deseja gerenciar
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
                                    `/dashboard/manageteam/${team._id}`
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
}

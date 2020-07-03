import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { List } from "../../../components/teams/List";
import Loader from "../../../components/loader";

export default function ManageTeam() {
    const history = useHistory();

    const state = useSelector((state) => state.teams);

    if (state.loading) {
        return <Loader />;
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    Selecione o time que deseja gerenciar
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={4}>
                    {state.teams.length > 0 ? (
                        state.teams.map((team) => (
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
                        ))
                    ) : (
                        <Grid item>
                            <Typography align="center" variant="h6">
                                Não há times registrados
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

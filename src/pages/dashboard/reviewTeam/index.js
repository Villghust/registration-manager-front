import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { List } from "../../../components/teams/List";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../components/loader";

export const ReviewTeam = () => {
    const state = useSelector((state) => state.teams);
    const history = useHistory();

    if (state.loading) {
        return <Loader />;
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    Selecione o time para avaliar
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
                                        `/dashboard/reviewteam/${team._id}`
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
};

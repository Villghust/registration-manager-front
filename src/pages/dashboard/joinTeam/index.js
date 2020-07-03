import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { List } from "../../../components/teams/List";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../../components/loader";
import { getTeams } from "../../../actions/teamActions";
import { getUserData } from "../../../util/authentication";
import api from "../../../services/api";
import { openSnackbar } from "../../../actions/snackbarActions";

export const JoinTeam = () => {
    const dispatch = useDispatch();

    const teamsState = useSelector((state) => state.teams);

    if (teamsState.loading) {
        return <Loader />;
    }

    if (teamsState.error) {
        return (
            <Typography align="center">Erro ao atualizar os times</Typography>
        );
    }

    const joinTeam = async (id) => {
        const userEmail = getUserData().email;
        const selectedTeam = teamsState.teams.find((t) => t._id === id);
        const newUserList = selectedTeam.user_list.map((user) => ({
            email: user.email,
        }));
        newUserList.push({ email: userEmail });
        try {
            await api.put(`/teams/${id}/user-list`, {
                user_list: newUserList,
            });
            dispatch(
                openSnackbar({
                    message: "Você entrou no time",
                    status: "success",
                })
            );
            dispatch(getTeams());
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao entrar no tiem",
                    status: "error",
                })
            );
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={6} justify="center">
                <Grid item xs={12}>
                    <Typography align="center" variant="h5">
                        Selecione o time que deseja entrar
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4} justify="center">
                        {teamsState.teams.length > 0 ? (
                            teamsState.teams.map((team) => (
                                <Grid
                                    item
                                    key={team._id}
                                    onClick={() => joinTeam(team._id)}
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
        </Container>
    );
};

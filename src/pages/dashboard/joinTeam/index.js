import React, { useCallback } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { List } from "../../../components/teams/List";
import { useRecoilState, useSetRecoilState } from "recoil";
import { forceUpdate, teamsState } from "../../../components/teams/api/state";
import api from "../../../services/api";
import { snackbar } from "../../../components/globalSnackbar/api/state";
import { getUserData, isReviewer } from "../../../util/authentication";

export const JoinTeam = () => {
    const [teams, setTeams] = useRecoilState(teamsState);
    const teamUpdate = useSetRecoilState(forceUpdate);
    const forceTeamUpdate = () => teamUpdate((n) => n + 1);
    const setSnackbarState = useSetRecoilState(snackbar);

    const getTeamById = (id) => teams.filter((team) => team._id === id)[0];

    const addToTeam = useCallback(
        async ({ id }) => {
            if (isReviewer()) {
                return setSnackbarState({
                    open: true,
                    message: "Avaliadores não podem fazer parte de times",
                    status: "error",
                });
            }
            const teamInfo = getTeamById(id);
            const user = getUserData();
            let userArray = [];
            teamInfo.user_list.map((user) =>
                userArray.push({ email: user.email })
            );
            userArray.push({
                email: user.email,
            });
            try {
                await api.put(`/teams/${teamInfo._id}/user-list`, {
                    user_list: userArray,
                });
                forceTeamUpdate();
                setSnackbarState({
                    open: true,
                    message: `Registrado ao ${teamInfo.name}`,
                    status: "success",
                });
            } catch (e) {
                setSnackbarState({
                    open: true,
                    message: "Erro ao entrar no time",
                    status: "error",
                });
            }
        },
        //eslint-disable-next-line
        [setTeams]
    );

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
                        {teams.map((team) => (
                            <Grid
                                item
                                key={team._id}
                                onClick={() => addToTeam({ id: team._id })}
                            >
                                <List team={team} selectable />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

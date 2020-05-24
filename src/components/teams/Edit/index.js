import React, { useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useParams, useHistory } from "react-router-dom";
import { TeamsLayout } from "../index";
import DeleteIcon from "@material-ui/icons/Delete";

import {
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    TextField,
} from "@material-ui/core";

import { forceUpdate, teamById } from "../api/state";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../../services/api";
import { snackbar } from "../../globalSnackbar/api/state";

const itemStyles = makeStyles({
    root: {
        transition: "all 0.3s ease",
        "&:hover": {
            color: "red",
            cursor: "pointer",
        },
    },
});

export const EditTeam = () => {
    const iconClasses = itemStyles();

    const { id } = useParams();

    const [addToTeam, setAddToTeam] = useState(false);
    const [addToTeamValue, setAddToTeamValue] = useState("");

    const team = useRecoilValue(teamById(id));
    const teamUpdate = useSetRecoilState(forceUpdate);
    const forceTeamUpdate = () => teamUpdate((n) => n + 1);
    const setSnackbarState = useSetRecoilState(snackbar);
    const history = useHistory();

    const changeAddToTeamValue = (event) => {
        setAddToTeamValue(event.target.value);
    };

    const deleteUser = useCallback(
        async ({ email }) => {
            const newUserArray = team.user_list
                .map((user) => {
                    if (user.email !== email) {
                        return { email: user.email };
                    }
                })
                .filter(Boolean);
            try {
                await api.put(`/teams/${id}/user-list`, {
                    user_list: newUserArray,
                });
                forceTeamUpdate();
                setSnackbarState({
                    open: true,
                    message: `Usuário removido da equipe ${team.name}`,
                    status: "success",
                });
            } catch (e) {
                setSnackbarState({
                    open: true,
                    message: `Erro ao remover usuário`,
                    status: "error",
                });
            }
        },
        //eslint-disable-next-line
        [team]
    );

    const addToTeamApiCall = useCallback(
        async ({ email }) => {
            const newUserArray = team.user_list.map((user) => {
                return { email: user.email };
            });
            newUserArray.push({ email: email });
            try {
                await api.put(`/teams/${id}/user-list`, {
                    user_list: newUserArray,
                });
                setAddToTeamValue("");
                forceTeamUpdate();
                setSnackbarState({
                    open: true,
                    message: `Usuário incluído na equipe ${team.name}`,
                    status: "success",
                });
            } catch (e) {
                setSnackbarState({
                    open: true,
                    message: "Erro ao remover usuário",
                    status: "error",
                });
            }
        },
        //eslint-disable-next-line
        [team]
    );

    const deleteTeam = useCallback(async () => {
        try {
            await api.delete(`/teams/${id}`);
            forceTeamUpdate();
            setSnackbarState({
                open: true,
                message: `Equipe ${team.name} deletada`,
                status: "success",
            });
            history.push("/dashboard/manageteam");
        } catch (e) {
            setSnackbarState({
                open: true,
                message: "Falha ao deletar a equipe",
                status: "error",
            });
        }
        //eslint-disable-next-line
    }, [team]);

    return (
        <TeamsLayout id={id}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List>
                        {team.user_list.map((user) => (
                            <ListItem key={user.name}>
                                <ListItemIcon>
                                    <DeleteIcon
                                        classes={{ root: iconClasses.root }}
                                        onClick={() =>
                                            deleteUser({ email: user.email })
                                        }
                                    />
                                </ListItemIcon>
                                <ListItemText primary={user.name} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                {addToTeam && (
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            onChange={changeAddToTeamValue}
                            value={addToTeamValue}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                )}
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => deleteTeam()}
                    >
                        Deletar time
                    </Button>
                </Grid>
                <Grid item>
                    {!addToTeam && (
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={() => setAddToTeam(true)}
                        >
                            Incluir participante
                        </Button>
                    )}
                    {addToTeam && (
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={() =>
                                addToTeamApiCall({ email: addToTeamValue })
                            }
                        >
                            Adicionar ao time
                        </Button>
                    )}
                </Grid>
            </Grid>
        </TeamsLayout>
    );
};

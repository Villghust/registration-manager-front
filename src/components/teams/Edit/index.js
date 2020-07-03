import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../loader";
import api from "../../../services/api";
import { openSnackbar } from "../../../actions/snackbarActions";
import { getTeams } from "../../../actions/teamActions";

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

    const state = useSelector((state) => state.teams);
    const dispatch = useDispatch();
    const history = useHistory();

    if (state.loading) {
        return <Loader />;
    }

    const team = state.teams.find((t) => t._id === id);

    const changeAddToTeamValue = (event) => {
        setAddToTeamValue(event.target.value);
    };

    const deleteTeam = async () => {
        try {
            await api.delete(`/teams/${id}`);
            dispatch(
                openSnackbar({
                    message: "Time deletado com sucesso",
                    status: "success",
                })
            );
            dispatch(getTeams());
            history.push("/dashboard/manageteam");
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao deletar o time",
                    status: "error",
                })
            );
        }
    };

    const deleteCompetitor = async ({ email }) => {
        const userList = team.user_list;
        // eslint-disable-next-line array-callback-return
        let newUserList = userList.map((user) => {
            if (user.email !== email) {
                return { email: user.email };
            }
        });
        newUserList = newUserList.filter((item) => item);
        try {
            await api.put(`/teams/${id}/user-list`, {
                user_list: [...newUserList],
            });
            dispatch(
                openSnackbar({
                    message: "Competidor deletado do time com sucesso",
                    status: "success",
                })
            );
            dispatch(getTeams());
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Erro ao excluir o competidor do time",
                    status: "error",
                })
            );
        }
    };

    const addCompetitor = async ({ email }) => {
        const userList = team.user_list;
        const newUsers = userList.map((user) => ({
            email: user.email,
        }));
        newUsers.push({ email });
        try {
            await api.put(`/teams/${id}/user-list`, {
                user_list: newUsers,
            });
            dispatch(
                openSnackbar({
                    message: "Competidor adicionado ao time com sucesso",
                    status: "success",
                })
            );
            dispatch(getTeams());
            setAddToTeamValue("");
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao adicionar o copetidor",
                    status: "error",
                })
            );
        }
    };

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
                                            deleteCompetitor({
                                                email: user.email,
                                            })
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
                                addCompetitor({ email: addToTeamValue })
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

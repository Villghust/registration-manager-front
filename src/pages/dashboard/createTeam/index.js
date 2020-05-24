import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Form, Formik, Field } from "formik";

import {
    makeStyles,
    Grid,
    Paper,
    Container,
    Button,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
import { snackbar } from "../../../components/globalSnackbar/api/state";
import { getUserData, isReviewer } from "../../../util/authentication";
import { useHistory } from "react-router-dom";
import { ReactComponent as EmptyIcon } from "../../../assets/empty.svg";
import { ReactComponent as Avatar } from "../../../assets/avatar.svg";
import api from "../../../services/api";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const CreateTeam = () => {
    const classes = useStyles();
    const history = useHistory();
    const userInfo = getUserData();

    const [team, addToTeam] = useState(
        isReviewer() ? [] : [{ email: userInfo.email }]
    );
    const setSnackbar = useSetRecoilState(snackbar);

    const initialValues = {
        email: "",
    };

    const teamInitialValues = {
        teamName: "",
    };

    async function submitTeam({ values }) {
        try {
            await api.post("/teams", {
                name: values.teamName,
                user_list: team,
            });
            setSnackbar({
                open: true,
                message: "Time criado com sucesso!",
                status: "success",
            });
            history.push("/dashboard");
        } catch (e) {
            setSnackbar({
                open: true,
                message: "Erro ao criar o time",
                status: "error",
            });
        }
    }

    function addToList({ values }) {
        addToTeam((team) => [...team, values]);
    }

    return (
        <Grid container spacing={6} justify="center">
            <Grid item xs={12}>
                <Typography align="center" variant="h5">
                    Entrar em um time
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Container maxWidth="sm">
                            <Paper className={classes.paper}>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values) => addToList({ values })}
                                >
                                    <Form style={{ width: "100%" }}>
                                        <Grid
                                            container
                                            spacing={2}
                                            justify="center"
                                        >
                                            <Grid item xs={12}>
                                                <Typography
                                                    align="center"
                                                    variant="h6"
                                                >
                                                    Adicionar participante
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    name="email"
                                                    label="Email"
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    as={TextField}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Adicionar ao time
                                        </Button>
                                    </Form>
                                </Formik>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h6">
                                        Lista de participantes
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {team.length > 0 ? (
                                        <Formik
                                            initialValues={teamInitialValues}
                                            onSubmit={(values) =>
                                                submitTeam({ values })
                                            }
                                        >
                                            {({ isSubmitting }) => (
                                                <Form>
                                                    <Field
                                                        name="teamName"
                                                        label="Nome do time"
                                                        fullWidth
                                                        as={TextField}
                                                        variant="outlined"
                                                    />
                                                    <List>
                                                        {team.map((user) => (
                                                            <ListItem
                                                                key={user.email}
                                                            >
                                                                <ListItemIcon>
                                                                    <Avatar
                                                                        width={
                                                                            24
                                                                        }
                                                                        height={
                                                                            24
                                                                        }
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={
                                                                        user.email
                                                                    }
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                    <Button
                                                        margin="normal"
                                                        variant="contained"
                                                        fullWidth
                                                        color="primary"
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                    >
                                                        Cadastrar time
                                                    </Button>
                                                </Form>
                                            )}
                                        </Formik>
                                    ) : (
                                        <div
                                            style={{
                                                padding: 24,
                                                textAlign: "center",
                                            }}
                                        >
                                            <EmptyIcon width={48} height={48} />
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

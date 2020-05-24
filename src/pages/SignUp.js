import React from "react";
import { useSetRecoilState } from "recoil";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Field, Form } from "formik";
import api from "../services/api";
import { useHistory } from "react-router-dom";
import { snackbar } from "../components/globalSnackbar/api/state";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

const initialValues = {
    name: "",
    email: "",
    password: "",
    reviewer: false,
    course: "",
};

export default function SignUp() {
    const classes = useStyles();
    const setSnackbarState = useSetRecoilState(snackbar);
    const history = useHistory();

    async function submitForm({ values }) {
        try {
            await api.post("/users", {
                ...values,
            });
            setSnackbarState({
                open: true,
                message: "Usuário cadastrado com sucesso",
                status: "success",
            });
            history.push("/");
        } catch (e) {
            setSnackbarState({
                open: true,
                message: "Falha ao registrar usuário",
                status: "error",
            });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastrar
                </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => submitForm({ values })}
                >
                    {({ values }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <Field
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Nome"
                                        as={TextField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        as={TextField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        as={TextField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                        <b>Avaliador</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Field
                                                name="reviewer"
                                                as={Switch}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {!values.reviewer && (
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="course"
                                            label="Curso"
                                            as={TextField}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Cadastrar
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/" variant="body2">
                            Já tem uma conta? Entrar
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

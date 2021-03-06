import React from "react";
import { useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Form, Formik, Field } from "formik";
import api from "../services/api";

import { useHistory } from "react-router-dom";
import { openSnackbar } from "../actions/snackbarActions";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initialValues = {
    email: "",
    password: "",
};

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    async function submitForm({ values }) {
        try {
            const response = await api.post("/sessions", {
                ...values,
            });
            dispatch(
                openSnackbar({
                    message: "Usuário logado, bem vindo!",
                    status: "success",
                })
            );
            window.localStorage.setItem("user", JSON.stringify(response.data));
            history.push("/dashboard");
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao fazer login. Tente novamente.",
                    status: "error",
                })
            );
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => submitForm({ values })}
                >
                    <Form className={classes.form}>
                        <Field
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            as={TextField}
                        />
                        <Field
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            as={TextField}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
                        </Button>
                    </Form>
                </Formik>
            </div>
        </Container>
    );
}

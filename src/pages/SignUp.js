import React from "react";
import { useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Field, Form } from "formik";
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
    user_type: "",
    course: "",
};

const SelectUserType = ({ values, setFieldValue, ...rest }) => {
    const handleChange = (event) => {
        setFieldValue("user_type", event.target.value, true);
    };

    return (
        <TextField onChange={handleChange} value={values.user_type} {...rest}>
            <MenuItem value="reviewer">Avaliador</MenuItem>
            <MenuItem value="competitor">Competidor</MenuItem>
        </TextField>
    );
};

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    async function submitForm({ values }) {
        try {
            await api.post("/users", {
                ...values,
            });
            dispatch(
                openSnackbar({
                    message: "Usuário cadastrado com sucesso",
                    status: "success",
                })
            );
            history.push("/dashboard");
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao registrar usuário",
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
                    Cadastrar
                </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => submitForm({ values })}
                >
                    {({ values, setFieldValue }) => (
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
                                <Grid item xs={12}>
                                    <Field
                                        name="user_type"
                                        label="Tipo do usuário"
                                        fullWidth
                                        required
                                        select
                                        variant="outlined"
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        component={SelectUserType}
                                    />
                                </Grid>
                                {values.user_type === "competitor" && (
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
            </div>
        </Container>
    );
}

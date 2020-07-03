import React from "react";
import { getUserData } from "../../../util/authentication";
import {
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    makeStyles,
    Paper,
    Typography,
    TextField,
} from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { ReactComponent as AvatarIcon } from "../../../assets/avatar.svg";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../actions/snackbarActions";
import { getTeams } from "../../../actions/teamActions";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4),
        width: 512,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    icon: {
        height: 32,
        width: 32,
        "&:hover": {
            cursor: "pointer",
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const CreateTeam = () => {
    const classes = useStyles();

    const history = useHistory();

    const userEmail = getUserData().email;

    const initialValues = { teamName: "", users: [userEmail], add: "" };

    const dispatch = useDispatch();

    const addToList = ({ setFieldValue, values }) => {
        const newUsers = [...values.users, values.add];
        setFieldValue("users", newUsers, true);
        setFieldValue("add", "", false);
    };

    const submit = async ({ values, resetForm }) => {
        try {
            const user_list = values.users.map((user) => ({ email: user }));
            await api.post("/teams", {
                name: values.teamName,
                user_list,
            });
            resetForm();
            dispatch(
                openSnackbar({
                    message: "Time criado com sucesso",
                    status: "success",
                })
            );
            dispatch(getTeams());
            history.push("/dashboard");
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao criar o time",
                    status: "error",
                })
            );
            resetForm();
        }
    };

    return (
        <Paper classes={{ root: classes.paper }}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) =>
                    submit({ values, resetForm })
                }
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Field
                                    name="teamName"
                                    label="Nome do time"
                                    variant="outlined"
                                    fullWidth
                                    as={TextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" variant="h6">
                                    Lista de participantes
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <List>
                                    {values.users.map((user, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <AvatarIcon
                                                    width={18}
                                                    height={18}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={user} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={11}>
                                        <Field
                                            name="add"
                                            as={TextField}
                                            label="Adicionar participante"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        container
                                        alignItems="center"
                                    >
                                        <AddCircleIcon
                                            color="primary"
                                            classes={{ root: classes.icon }}
                                            onClick={() =>
                                                addToList({
                                                    values,
                                                    setFieldValue,
                                                })
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    disabled={
                                        !(
                                            values.teamName !== "" &&
                                            values.users.length > 1
                                        ) || isSubmitting
                                    }
                                >
                                    Criar
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};

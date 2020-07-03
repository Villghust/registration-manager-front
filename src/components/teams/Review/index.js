import React from "react";
import { TeamsLayout } from "../index";
import { useParams } from "react-router-dom";

import { Button, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import api from "../../../services/api";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../actions/snackbarActions";
import { getTeams } from "../../../actions/teamActions";
import { getUserData } from "../../../util/authentication";
import Loader from "../../loader";

const ratings = [
    {
        name: "Software",
        value: "software",
    },
    {
        name: "Processo",
        value: "process",
    },
    {
        name: "Pitch",
        value: "pitch",
    },
    {
        name: "Inovação",
        value: "innovation",
    },
    {
        name: "Formação do time",
        value: "team_formation",
    },
];

export const ReviewTeam = () => {
    const { id } = useParams();

    const state = useSelector((state) => state.teams);
    const dispatch = useDispatch();

    if (state.loading) {
        return <Loader />;
    }

    const team = state.teams.find((t) => t._id === id);

    const user = getUserData();
    const reviewerRating = team.ratings.find((r) => r.reviewer_id === user.id);

    const initialReviewValues = reviewerRating
        ? reviewerRating
        : {
              software: null,
              process: null,
              pitch: null,
              innovation: null,
              team_formation: null,
          };

    const sendReview = async ({ values }) => {
        try {
            await api.put(`/teams/${id}/rating`, {
                rating: values,
            });
            dispatch(getTeams());
            dispatch(
                openSnackbar({
                    message: "Avaliação salva com sucesso",
                    status: "success",
                })
            );
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Erro ao avaliar o time",
                    status: "error",
                })
            );
        }
    };

    return (
        <TeamsLayout id={id}>
            <Formik
                initialValues={initialReviewValues}
                onSubmit={(values) => sendReview({ values })}
            >
                <Form>
                    <Grid container spacing={2}>
                        {ratings.map((rating, index) => (
                            <Grid item xs={12} key={index}>
                                <Typography align="center">
                                    {rating.name}
                                </Typography>
                                <div style={{ textAlign: "center" }}>
                                    <Field name={rating.value} as={Rating} />
                                </div>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                type="submit"
                                fullWidth
                                variant="outlined"
                            >
                                Enviar avaliação
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </TeamsLayout>
    );
};

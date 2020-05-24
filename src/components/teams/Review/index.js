import React, { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TeamsLayout } from "../index";
import { useParams, useHistory } from "react-router-dom";

import { Button, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import { forceUpdate, teamById } from "../api/state";
import api from "../../../services/api";
import { snackbar } from "../../globalSnackbar/api/state";
import { Form, Formik, Field } from "formik";

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

    const team = useRecoilValue(teamById(id));
    const teamUpdate = useSetRecoilState(forceUpdate);
    const forceTeamUpdate = () => teamUpdate((n) => n + 1);
    const setSnackbarState = useSetRecoilState(snackbar);

    const initialReviewValues = team.rating
        ? team.rating
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
            forceTeamUpdate();
            setSnackbarState({
                open: true,
                message: "Avaliação salva com sucesso",
                status: "success",
            });
        } catch (e) {
            setSnackbarState({
                open: true,
                message: "Erro ao avaliar o time",
                status: "error",
            });
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
                        {ratings.map((rating) => (
                            <Grid item xs={12}>
                                <Typography align="center">
                                    {rating.name}
                                </Typography>
                                <div style={{ textAlign: "center" }}>
                                    <Field name={rating.value} as={Rating} />
                                </div>
                            </Grid>
                        ))}
                        <Grid item>
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

import React from "react";
import {
    Container,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Grid,
    Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Loader from "../loader";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    expansionPanel: {
        minWidth: 768,
    },
});

export const RankingComponent = () => {
    const classes = useStyles();

    const state = useSelector((state) => state.teams);

    if (state.loading) {
        return <Loader />;
    }

    const validTeams = state.teams.filter((team) => team.final_rating !== null);

    const fixedRating = validTeams.map((team) => ({
        ...team,
        final_rating: (team.final_rating / 5).toFixed(2),
    }));

    const sortedTeams = fixedRating.sort(
        (a, b) => a.final_rating - b.final_rating
    );

    const ratingAverage = ({ ratings, attribute }) => {
        let average = 0;
        ratings.forEach((rating) => (average += rating[attribute]));
        return average / ratings.length;
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                {sortedTeams.map((team) => (
                    <Grid item xs={12} key={team._id}>
                        <ExpansionPanel
                            classes={{ root: classes.expansionPanel }}
                        >
                            <ExpansionPanelSummary>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>{team.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={2}>
                                            <Grid
                                                item
                                                xs={10}
                                                container
                                                justify="flex-end"
                                            >
                                                <Rating
                                                    value={Number(
                                                        team.final_rating
                                                    )}
                                                    readOnly
                                                    precision={0.01}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography>
                                                    {team.final_rating}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container justify="center">
                                    <Grid
                                        item
                                        xs={2}
                                        container
                                        justify="center"
                                    >
                                        <Typography align="center">
                                            Software
                                        </Typography>
                                        <Rating
                                            value={ratingAverage({
                                                ratings: team.ratings,
                                                attribute: "software",
                                            })}
                                            readOnly
                                            precision={0.01}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        container
                                        justify="center"
                                    >
                                        <Typography align="center">
                                            Processo
                                        </Typography>
                                        <Rating
                                            value={ratingAverage({
                                                ratings: team.ratings,
                                                attribute: "process",
                                            })}
                                            readOnly
                                            precision={0.01}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        container
                                        justify="center"
                                    >
                                        <Typography align="center">
                                            Pitch
                                        </Typography>
                                        <Rating
                                            value={ratingAverage({
                                                ratings: team.ratings,
                                                attribute: "pitch",
                                            })}
                                            readOnly
                                            precision={0.01}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        container
                                        justify="center"
                                    >
                                        <Typography align="center">
                                            Inovação
                                        </Typography>
                                        <Rating
                                            value={ratingAverage({
                                                ratings: team.ratings,
                                                attribute: "innovation",
                                            })}
                                            readOnly
                                            precision={0.01}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        container
                                        justify="center"
                                    >
                                        <Typography align="center">
                                            Equipe
                                        </Typography>
                                        <Rating
                                            value={ratingAverage({
                                                ratings: team.ratings,
                                                attribute: "team_formation",
                                            })}
                                            readOnly
                                            precision={0.01}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

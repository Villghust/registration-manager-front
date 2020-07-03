import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";

import { ReactComponent as TeamIcon } from "../../assets/team.svg";

const teamPaperStyles = makeStyles((theme) => ({
    root: ({ selectable }) => ({
        padding: theme.spacing(2),
        transition: "background-color 0.5s ease",
        width: 450,
        "&:hover": selectable && {
            backgroundColor: "#f6f6f6",
            cursor: "pointer",
        },
    }),
}));

export const TeamsLayout = ({ children, id, selectable }) => {
    const teamPaperClasses = teamPaperStyles({ selectable });

    const teamsState = useSelector((state) => state.teams.teams);
    const selectedTeam = teamsState.find((t) => t._id === id);

    return (
        <Paper classes={{ root: teamPaperClasses.root }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <TeamIcon width={24} height={24} />
                        </Grid>
                        <Grid item>
                            <Typography align="center">
                                {selectedTeam.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Paper>
    );
};

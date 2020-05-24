import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { ReactComponent as AvatarIcon } from "../../../assets/avatar.svg";

import { TeamsLayout } from "../index";

export const List = ({ team, ...rest }) => {
    return (
        <TeamsLayout id={team._id} {...rest}>
            <Grid container spacing={2}>
                {team.user_list.map((component) => (
                    <Grid item key={component.email} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <AvatarIcon width={24} height={24} />
                            </Grid>
                            <Grid item>
                                <Typography>{component.name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </TeamsLayout>
    );
};

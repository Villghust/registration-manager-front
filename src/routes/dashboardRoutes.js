import React from "react";
import { useSetRecoilState } from "recoil";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import { drawerState } from "../components/drawer/api/state";
import Drawer from "../components/drawer";
import Dashboard from "../pages/dashboard";
import { JoinTeam } from "../pages/dashboard/joinTeam";
import { CreateTeam } from "../pages/dashboard/createTeam";
import { isReviewer } from "../util/authentication";
import ManageTeam from "../pages/dashboard/manageTeam";
import { ManageSelectedTeam } from "../pages/dashboard/manageTeam/selectedTeam";
import { ReviewTeam } from "../pages/dashboard/reviewTeam";
import { ReviewSelectedTeam } from "../pages/dashboard/reviewTeam/selectedTeam";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ReviewerRoute({ children, ...rest }) {
    const location = useLocation();
    return isReviewer() ? (
        <Route {...rest}>{children}</Route>
    ) : (
        <Redirect to={{ pathname: "/dashboard", state: { from: location } }} />
    );
}

export default function DashboardRoutes() {
    const classes = useStyles();
    const setDrawer = useSetRecoilState(drawerState);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        className={classes.menuButton}
                        onClick={() => setDrawer((previous) => !previous)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route exact path="/dashboard/jointeam">
                        <JoinTeam />
                    </Route>
                    <Route exact path="/dashboard/createteam">
                        <CreateTeam />
                    </Route>
                    <ReviewerRoute exact path="/dashboard/manageteam">
                        <ManageTeam />
                    </ReviewerRoute>
                    <ReviewerRoute exact path="/dashboard/manageteam/:id">
                        <ManageSelectedTeam />
                    </ReviewerRoute>
                    <ReviewerRoute exact path="/dashboard/reviewteam">
                        <ReviewTeam />
                    </ReviewerRoute>
                    <ReviewerRoute exact path="/dashboard/reviewteam/:id">
                        <ReviewSelectedTeam />
                    </ReviewerRoute>
                </Switch>
            </main>
        </div>
    );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
    Divider,
    List,
    ListItemText,
    ListItem,
    Hidden,
    Drawer as MuiDrawer,
} from "@material-ui/core";

import {
    isReviewer,
    isCompetitor,
    logout,
    isAdmin,
} from "../../util/authentication";
import { setDashboardDrawer } from "../../actions/drawerActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
}));

export default function Drawer({ window }) {
    const classes = useStyles();
    const history = useHistory();
    const state = useSelector((state) => state.drawer.open);
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        dispatch(setDashboardDrawer(!state));
    };

    const navigateToPage = (page) => {
        history.push(page);
        dispatch(setDashboardDrawer(false));
    };

    const reviewerDrawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={() => navigateToPage("/dashboard/reviewteam")}
                >
                    <ListItemText primary="Avaliar time" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => navigateToPage("/dashboard/ranking")}
                >
                    <ListItemText primary="Ranking" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        logout();
                        navigateToPage("/");
                    }}
                >
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>
        </div>
    );

    const adminDrawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={() => navigateToPage("/dashboard/createuser")}
                >
                    <ListItemText primary="Criar usuário" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => navigateToPage("/dashboard/manageteam")}
                >
                    <ListItemText primary="Gerenciar times" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        logout();
                        navigateToPage("/");
                    }}
                >
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>
        </div>
    );

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={() => navigateToPage("/dashboard/jointeam")}
                >
                    <ListItemText primary="Entrar em um time" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => navigateToPage("/dashboard/createteam")}
                >
                    <ListItemText primary="Criar um time" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        logout();
                        navigateToPage("/");
                    }}
                >
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <MuiDrawer
                    container={container}
                    variant="temporary"
                    anchor="left"
                    open={state}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </MuiDrawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <MuiDrawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {isReviewer() && reviewerDrawer}
                    {isCompetitor() && drawer}
                    {isAdmin() && adminDrawer}
                </MuiDrawer>
            </Hidden>
        </nav>
    );
}

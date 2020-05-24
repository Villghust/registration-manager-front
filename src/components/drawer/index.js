import React from "react";
import { useRecoilState } from "recoil";
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

import { drawerState } from "./api/state";
import { isReviewer, logout } from "../../util/authentication";

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
    const [mobileOpen, setMobileOpen] = useRecoilState(drawerState);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigateToPage = (page) => {
        history.push(page);
        setMobileOpen(false);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {!isReviewer() && (
                    <ListItem
                        button
                        onClick={() => navigateToPage("/dashboard/jointeam")}
                    >
                        <ListItemText primary="Entrar em um time" />
                    </ListItem>
                )}
                <ListItem
                    button
                    onClick={() => navigateToPage("/dashboard/createteam")}
                >
                    <ListItemText primary="Criar um time" />
                </ListItem>
                {isReviewer() && (
                    <>
                        <ListItem
                            button
                            onClick={() =>
                                navigateToPage("/dashboard/manageteam")
                            }
                        >
                            <ListItemText primary="Gerenciar times" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() =>
                                navigateToPage("/dashboard/reviewteam")
                            }
                        >
                            <ListItemText primary="Avaliar time" />
                        </ListItem>
                    </>
                )}
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
                    open={mobileOpen}
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
                    {drawer}
                </MuiDrawer>
            </Hidden>
        </nav>
    );
}

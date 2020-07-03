import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import SignIn from "../pages/SignIn";
import { isAuthenticated } from "../util/authentication";
import { useLocation } from "react-router-dom";
import Loader from "../components/loader";
import DashboardRoutes from "./dashboardRoutes";
import history from "../util/history";

function PrivateRoute({ children, ...rest }) {
    const location = useLocation();
    return isAuthenticated() ? (
        <Route {...rest}>{children}</Route>
    ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
    );
}

export default function Routes() {
    return (
        <Router history={history}>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path="/">
                        <SignIn />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <DashboardRoutes />
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </Router>
    );
}

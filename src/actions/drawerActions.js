import { types } from "../reducers/types";

export const setDashboardDrawer = (value) => (dispatch) => {
    dispatch({
        type: types.SET_DASHBOARD_DRAWER,
        value: value,
    });
};

import { types } from "./types";

const initialState = {
    open: false,
};

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DASHBOARD_DRAWER:
            return {
                open: action.value,
            };
        default:
            return { ...state };
    }
};

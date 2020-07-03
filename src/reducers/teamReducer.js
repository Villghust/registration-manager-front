import { types } from "./types";

const initialState = {
    teams: undefined,
    loading: true,
    error: false,
};

export const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_UPDATING_TEAMS:
            return {
                ...state,
                error: false,
                loading: true,
                teams: undefined,
            };
        case types.FINISH_UPDATING_TEAMS:
            return {
                ...state,
                error: false,
                loading: false,
                teams: action.value,
            };
        case types.ERROR_UPDATING_TEAMS:
            return {
                ...state,
                error: true,
                loading: false,
            };
        default:
            return { ...state };
    }
};

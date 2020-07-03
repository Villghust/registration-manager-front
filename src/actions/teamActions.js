import { types } from "../reducers/types";
import api from "../services/api";

export const getTeams = () => async (dispatch) => {
    dispatch({
        type: types.START_UPDATING_TEAMS,
    });
    try {
        const teams = await api.get("/teams");
        dispatch({
            type: types.FINISH_UPDATING_TEAMS,
            value: teams.data.teams,
        });
    } catch (e) {
        dispatch({ type: types.ERROR_UPDATING_TEAMS });
    }
};

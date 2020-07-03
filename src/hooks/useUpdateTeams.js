import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTeams } from "../actions/teamActions";

function useUpdateTeams() {
    const state = useSelector((state) => state.teams);
    const dispatch = useDispatch();

    useEffect(() => {
        // check if teams is filled
        if (!state.teams) {
            dispatch(getTeams());
        }
        //eslint-disable-next-line
    }, []);
}

export default useUpdateTeams;

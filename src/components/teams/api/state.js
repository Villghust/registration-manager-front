import { selector, atom } from "recoil";
import api from "../../../services/api";

export const forceUpdate = atom({
    key: "forceTeamUpdate",
    default: 0,
});

export const teamsState = selector({
    key: "teams",
    get: async ({ get }) => {
        try {
            get(forceUpdate);
            const response = await api.get("/teams");
            return response.data.teams;
        } catch (e) {
            throw e;
        }
    },
});

export const teamById = (id) =>
    selector({
        key: "teamById",
        get: ({ get }) => {
            const teams = get(teamsState);

            return teams.filter((team) => team._id === id)[0];
        },
    });

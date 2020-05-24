import { atom } from "recoil";

export const snackbar = atom({
    key: "snackbar",
    default: {
        open: false,
        message: "",
        status: "",
    },
});

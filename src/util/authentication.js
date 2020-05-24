import moment from "moment";
import jwt from "jsonwebtoken";

export function isAuthenticated() {
    let userData = window.localStorage.getItem("user");
    if (userData) {
        userData = JSON.parse(userData);
        const decodedData = jwt.decode(userData.token);
        if (moment().isBefore(decodedData.exp * 1000)) {
            return true;
        }
    }
    return false;
}

export function logout() {
    if (window.localStorage.getItem("user")) {
        window.localStorage.removeItem("user");
    }
}

export function isReviewer() {
    let userData = window.localStorage.getItem("user");
    if (userData) {
        userData = JSON.parse(userData);
        const decodedToken = jwt.decode(userData.token);
        if (decodedToken.reviewer) {
            return true;
        }
    }
    return false;
}

export function getUserData() {
    if (window.localStorage.getItem("user")) {
        let userData = window.localStorage.getItem("user");
        userData = JSON.parse(userData);
        return userData.user;
    }
}

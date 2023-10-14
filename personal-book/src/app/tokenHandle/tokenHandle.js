"use client"

import {setCookie, getCookie, deleteCookie} from "cookies-next";

export function setToken(token) {
    setCookie('personalBookNJ', token);
}

export function isLoggedin(){
    const token = getCookie('personalBookNJ');

    if (token) {
        return true;
    }
    else{
        return false;
    }
}

export function deleteToken() {
    deleteCookie('personalBookNJ');
}
"use client"

import {setCookie, getCookie, deleteCookie} from "cookies-next";
import jwtDecode from "jwt-decode";

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

export function getUsername(){
    const token = getCookie('personalBookNJ');

    if (token) {
        const decoded = jwtDecode(token);

        return decoded.actort;
    }
    else {
        return null;
    }
}

export function getToken(){
    const token = getCookie('personalBookNJ');
    
    if (token) {
        return token;
    }
    else{
        return null;
    }
}

export function isAdmin(){
    
    const token = getCookie('personalBookNJ');

    if (token) {
        const decode = jwtDecode(token);
        
        if (decode.role == 'Admin') {
            return true;
        }
    }

    return false;
}

export function getUserId(){
    const token = getCookie('personalBookNJ');

    if (token) {
        const decode = jwtDecode(token);
        
        return decode.unique_name;
    }

    return '';
}
"use client";

import { getToken } from "@/app/tokenHandle/tokenHandle";

export async function getGrades() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch('https://personalbook-api-express-js.onrender.com/api/Grade', requestOptions);
    let result = await res.json();
    result = result.sort((a, b) => {
        if (a.points > b.points) {
            return -1;
        }
        else{
            return 1;
        }
    });
    console.log(result);
    return result;
}

export async function addGrade(grd) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body: JSON.stringify(grd)
    };
    const res = await fetch('https://personalbook-api-express-js.onrender.com/api/Grade', requestOptions);

    return res;
}

export async function updateGrade(grd) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}`},
        body: JSON.stringify(grd)
    };
    const res = await fetch('https://personalbook-api-express-js.onrender.com/api/Grade', requestOptions);

    return res;
}

export async function deleteGrade(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Grade?id=${id}`, requestOptions);
    const result = await res.json();

    return result;
}
"use client";

import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";

export async function getResults() {
    const userId  = getUserId();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
        };
    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Result?id=${userId}`, requestOptions);
    console.log("Data: ", res);
    const rawData = await res.json();

    return rawData;
}
   
export async function addResultAsync(result) {
    const userId = getUserId();
    const res = {
        userId : userId,
        courseId : result.courseId,
        semesterId : result.semesterId,
        gradeId : result.gradeId
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                'authorization' : `bearer ${getToken()}`},
        body: JSON.stringify(res)
    };
    const r = await fetch('https://personalbook-api-express-js.onrender.com/api/Result', requestOptions);
    
    return await r.json();
}

export async function updateResultAsync(result) {
    const userId = getUserId();
    const res = {
        id : result.id,
        userId : userId,
        courseId : result.courseId,
        semesterId : result.semesterId,
        gradeId : result.gradeId
    }
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                'authorization' : `bearer ${getToken()}`},
        body: JSON.stringify(res)
    };
    const r = await fetch('https://personalbook-api-express-js.onrender.com/api/Result', requestOptions);
    
    return await r.json();
}

export async function deleteResultS(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Result?id=${id}`, requestOptions);
    const result = await res.json();

    return result;
}
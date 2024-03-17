"use client";

import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";

export async function getResults() {
    const userId  = getUserId();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
        };
    const res = await fetch(`http://localhost:7108/api/Result?id=${userId}`, requestOptions);
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
    const r = await fetch('http://localhost:7108/api/Result', requestOptions);
    
    return await r.json();
}
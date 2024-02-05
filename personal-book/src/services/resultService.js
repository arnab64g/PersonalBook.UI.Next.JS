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
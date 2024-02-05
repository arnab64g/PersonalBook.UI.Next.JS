"use client";

import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";

export async function getSemester() {
    const userId = getUserId()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`http://localhost:7108/api/Semester?id=${userId}`, requestOptions);
        const result = await res.json();

        return result;
}
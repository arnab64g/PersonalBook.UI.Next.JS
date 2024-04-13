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

export async function deleteSemesterS(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch(`http://localhost:7108/api/Semester?id=${id}`, requestOptions);
    const result = await res.json();

    return result;
}

export async function addSemester(semester) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body: JSON.stringify(semester)
    };
    const res = await fetch('http://localhost:7108/api/Semester', requestOptions);

    return res;
}

export async function  editSemester(semester) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body: JSON.stringify(semester)
    };
    const res = await fetch('http://localhost:7108/api/Semester', requestOptions);

    return res;
}
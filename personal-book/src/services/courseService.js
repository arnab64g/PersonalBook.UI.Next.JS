"use client";

import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";

export async function getCourses() {
    const userId = getUserId();
    const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Course?id=${userId}`, requestOptions);
        const result = await res.json();

        return result
}

export async function addCourse(course) {
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}`},
                body: JSON.stringify(course)
        };

        const res = await fetch('https://personalbook-api-express-js.onrender.com/api/Course', requestOptions);
        const result = await res.json();

        return result;
}

export async function updateCourse(course) {
        const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` },
                body: JSON.stringify(course)
        };

        const res = await fetch('https://personalbook-api-express-js.onrender.com/api/Course', requestOptions);
        const result = await res.json();
        return result;
}

export async function deleteCourseS(id) {
        const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}`},
        };

        const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Course?id=${id}`, requestOptions);
        const result = await res.json();

        return result;
}
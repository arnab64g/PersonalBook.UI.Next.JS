"use client";

import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";

export async function getExpensesAsync() {
    const userId = getUserId();
    const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Expense?id=${userId}`, requestOptions);
        const result = await res.json();

        return result;
}

export async function addExpenseAsync(expense) {
    expense.userId = getUserId();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body : JSON.stringify(expense)
    };

    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Expense`, requestOptions);

    return res;
}

export async function updateExpenseAsync(expense) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body : JSON.stringify(expense)
    };

    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Expense`, requestOptions);

    return res;
}

export async function deleteExpenseAsync(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Expense?id=${id}`, requestOptions);

    return res;
}

export async function getCatSummary(filter) {
   
    const userId = getUserId();
    filter.userId = userId;
    console.log(filter);
    const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` },
            body : JSON.stringify(filter)
        };
        const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/Expense/Category`, requestOptions);

        return await res.json();
}
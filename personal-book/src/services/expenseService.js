"use client";

import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";

export async function getExpensesAsync() {
    const userId = getUserId();
    const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`http://localhost:7108/api/Expense?id=${userId}`, requestOptions);
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

    const res = await fetch(`http://localhost:7108/api/Expense`, requestOptions);
    const result = await res.json();

    return result;
}

export async function updateExpenseAsync(expense) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body : JSON.stringify(expense)
    };

    const res = await fetch(`http://localhost:7108/api/Expense`, requestOptions);
    const result = await res.json();

    return result;
}

export async function deleteExpenseAsync(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch(`http://localhost:7108/api/Expense?id=${id}`, requestOptions);
    const result = await res.json();

    return result;
}
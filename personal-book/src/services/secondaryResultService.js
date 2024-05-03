import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";

export async function getSecondaryResults() {
    const userId = getUserId();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/SecondaryResult?id=${userId}`, requestOptions);
    const result = await res.json();
    
    return result;
}

export async function addSecondaryResult(res) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body : JSON.stringify(res)
    };

    const resultNew = await fetch('https://personalbook-api-express-js.onrender.com/api/SecondaryResult', requestOptions);
    const result = await resultNew.json();
   
    return result;
}


export async function updateSecondaryResult(res) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` },
        body : JSON.stringify(res)
    };

    const resultNew = await fetch('https://personalbook-api-express-js.onrender.com/api/SecondaryResult', requestOptions);

    return resultNew;
}

export async function deleteSecondaryResult(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
    };
    const res = await fetch(`https://personalbook-api-express-js.onrender.com/api/SecondaryResult?id=${id}`, requestOptions);
    const result = await res.json();

    return result;
}


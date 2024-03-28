export async function loginUserService(formValues) {
    console.log(formValues);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    };
    const res = await fetch('https://personalbook-api-express-js.onrender.com/api/User/login', requestOptions);
    const result = await res.json();

    return result;
}

export async function signUpUser(form_values) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form_values)
    };

    const res = await fetch('https://personalbook-api-express-js.onrender.com/api/User', requestOptions);
    const result = await res.json();

    return result;
}
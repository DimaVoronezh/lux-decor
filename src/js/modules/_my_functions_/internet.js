async function getData(url) {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error();
    }
    return await res.json();
}
async function postData(url, body) {
    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error();
    }
    return await res.json();
}
async function putData(url, body) {
    let res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error();
    }
    return await res.json();
}
async function deleteData(url) {
    let res = await fetch(url, {
        method: "DELETE"
    });
    if (!res.ok) {
        throw new Error();
    }
    return await res.json();
}
export {
    getData,
    postData,
    putData,
    deleteData
};
//import fetch = require("node-fetch");

export default async function sagaFetch(url: RequestInfo, init?: RequestInit) {
    try {
        return await fetch(url, init);
    }
    catch(err) {

    }
}
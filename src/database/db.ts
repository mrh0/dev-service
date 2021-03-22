import {log, err} from "../util/logging";

function error(msg: string) {
    err("DB", msg);
    return msg;
}

let database: {[key: string]: number} = {};

export async function set({key, value}, fail = false) {
    if(fail)
        throw error("moc set error");
    log("DB", "SET", key, value);
    database[key] = value;
}

export async function del({key}, fail = false) {
    if(fail)
        throw error("moc delete error");
    if(!database[key])
        throw error("delete error");
    log("DB", "DEL", key);
    delete database[key];
}

export async function get({key, all}, fail = false) {
    if(fail)
        throw error("moc get error");
    if(all)
        return database[key];
    log("DB", "GET", key, all);
    return database;
}

export default {set, del, get};
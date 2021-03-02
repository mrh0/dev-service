import {log, err} from "../util/logging";

function error(msg: string) {
    err("DB", msg);
    return msg;
}

let database: {[key: string]: number} = {};

export async function set({key, value}, fail = false) {
    if(fail)
        throw error("moc set error");
    database[key] = value;
}

export async function del({key}, fail = false) {
    if(fail)
        throw error("moc delete error");
    if(!database[key])
        throw error("delete error");
    delete database[key];
}

export async function get({key, all}, fail = false) {
    if(fail)
        throw error("moc get error");
    if(key || all)
        return database[key];
    return database;
}

export default {set, del, get};
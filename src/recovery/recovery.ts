import Redis = require("ioredis");
import fetch = require("node-fetch");
import {log, err} from "../util/logging";

interface Packet {
    route: string,
    body: any,
    headers: object,
    method: string
    error?: any
}


// docker run -p 6379:6379 redis
const redis = new Redis(6379);

export async function push(name, packet: Packet) {
    return redis.lpush(name, JSON.stringify(packet));
}

export async function pop(name) {
    return JSON.parse(await redis.lpop(name)) as Packet;
}

export async function getLen(name: string) {
    return redis.llen(name);
}

export async function popAndSend(name) {
    let count = await redis.llen(name);
    while(count--) {
        let p = await pop(name);
        try {
            await fetch(p.route, {method: p.method, headers: p.headers, body: p.body});
        }
        catch(e) {
            err("popAndSend", e);
        }
    }
}
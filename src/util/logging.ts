

export function log(name: string, ...message: any) {
    console.log("[", process.env.NAME, ":", name, "]:", ...message);
}

export function err(name: string, ...message: any) {
    console.error("[", process.env.NAME, ":", name, "]:", ...message);
}

export default log;
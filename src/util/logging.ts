

export function log(name: string, ...message: any) {
    console.log("[", name, "]:", ...message);
}

export function err(name: string, ...message: any) {
    console.error("[", name, "]:", ...message);
}

export default log;
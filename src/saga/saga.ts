import {log, err} from "../util/logging";

interface WorkResult {
    create?: any,
    change?: any,
    delete?: any
}

interface Work {
    promise: Promise<WorkResult>,
    undo: (work: WorkResult) => void,
    completed: boolean,
    result: WorkResult
}

export default class SagaTransaction {
    private _fail = false;
    private _error: {name: string, exception: any};
    private _work: {[key: string]: Work};

    constructor() {
        this._work = {};
    }

    public begin(name: string, work:WorkResult, task: Promise<any>, undo: (work: WorkResult) => Promise<any>) {
        if(this._fail)
            return Promise.reject("failed before");
        let promise = task;
        this._work[name] = {promise: promise, undo: undo, completed: false, result: work};
        return promise;//.finally((work) => {this.end(name, work)});
    }

    public end(name: string, work: WorkResult) {
        if(this._work[name]) {
            this._work[name].completed = true;
            this._work[name].result = work;
        }
        if(this._fail)
            this.undo(name, work);
    }

    public exception(name?: string, error?: any) {
        this._fail = true;
        this._error = {name: name, exception: error}
        for(let n in this._work) {
            if(this._work[n]?.completed)
                this.undo(n, this._work[n].result);
        }
    }

    private undo(name: string, work: WorkResult) {
        if(this._work[name]?.undo)
            this._work[name].undo(work);
    }

    public async all() {
        let promises = [];
        for(let key in this._work)
            promises.push(this._work[key].promise);
        let res = await Promise.all(promises);
        if(this._fail)
            return Promise.reject(this._error);
        return res;
    }
}
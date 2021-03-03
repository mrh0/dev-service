import {log, err} from "../util/logging";

interface Work {
    promise: Promise<any>,
    undo: () => void,
    completed: boolean
}

export class SagaTransaction {
    private _fail = false;
    private _work: {[key: string]: Work};

    public begin<T>(name: string, task: () => Promise<T>, undo: () => Promise<any>) {
        if(this._fail)
            return Promise.reject("failed before");
        let promise = task();
        this._work[name] = {promise: promise, undo: undo, completed: false};
        return promise.finally(() => {this.end(name)});
    }

    public end(name: string) {
        if(this._work[name])
            this._work[name].completed = true;
        if(this._fail)
            this.undo(name);
    }

    public exception(name: string) {
        this._fail = true;
        for(let name in this._work) {
            if(this._work[name]?.completed)
                this.undo(name);
        }
    }

    private undo(name: string) {
        if(this._work[name]?.undo)
            this._work[name].undo();
    }

    public all() {
        let promises = [];
        for(let key in this._work)
            promises.push(this._work[key].promise);
        return Promise.all(promises)
    }
}
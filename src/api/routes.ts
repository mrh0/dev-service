import express = require("express");
import log from "../util/logging";
import cors = require("cors");
import db from "../database/db";
import {Response} from "../model/types";
import SagaTransaction from "../saga/saga";
//import {push, pop} from "../recovery/recovery";
import fetch = require("node-fetch");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
export default app;


app.post("/forward", async (req, res) => {
    log("POST", "forward", "begin");

    let saga = new SagaTransaction();

    saga.begin("step1", {}, 
        db.set(req.body, false).catch((e) => saga.exception("step1", e)), 
    async () => {
        await db.del(req.body);
    })

    saga.begin("step2", {}, 
        fetch(process.env.FORWARD, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({key:"test2", value:"hello"})}).catch((e) => saga.exception("step2", e)), 
    async () => {
        await fetch(process.env.FORWARD, {method: 'DELETE', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({key:"test2", value:"hello"})});
    })

    try {
        console.log(await saga.all());
        res.json({accepted: true} as Response);
    }
    catch(e) {
        res.json({accepted: false, error: e} as Response);
    }

    log("POST", "forward", "end");
});


app.post("/commit", async (req, res) => {
    log("POST", "commit", "begin");
    try {
        await db.set(req.body);
        res.json({accepted: true} as Response);
    }
    catch(e) {
        res.json({accepted: false, error: e} as Response);
    }
    log("POST", "commit", "end");
});

app.delete("/commit", async (req, res) => {
    log("DELETE", "commit", "begin");
    try {
        await db.del(req.body);
        res.json({accepted: true} as Response);
    }
    catch(e) {
        res.json({accepted: false, error: e} as Response);
    }
    log("DELETE", "commit", "end");
});

app.get("/commit", async (req, res) => {
    log("GET", "commit", "begin");
    try {
        res.json({accepted: true, data: await db.get(req.body)} as Response);
    }
    catch(e) {
        res.json({accepted: false, error: e} as Response);
    }
    log("GET", "commit", "end");
});

app.get("/error", async (req, res) => {
    res.sendStatus(500);
});

/*
//Recovery
app.post("/store", async (req, res) => {
    log("POST", "store", "begin");
    const {name, packet} = req.body;
    try {
        await push(name, packet);
        res.json({accepted: true} as Response);
    }
    catch(e) {
        res.json({accepted: false, error: e} as Response);
    }
    log("POST", "store", "end");
});

app.post("/recover", async (req, res) => {
    log("POST", "recover", "begin");
    const {name, packet} = req.body;    
    res.json({accepted: true} as Response);

    await pop(name);
    
    log("POST", "recover", "end");
});*/
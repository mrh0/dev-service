import express = require("express");
import log from "../util/logging";
import cors = require("cors");
import db from "../database/db";
import {Response} from "../model/types";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
export default app;

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
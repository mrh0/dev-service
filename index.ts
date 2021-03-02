import express = require("express");
import app from "./src/api/routes";
import {createServer} from "http";
require("dotenv").config();

const server = createServer(app);

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT || 5000}`);
});


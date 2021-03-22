import {log, err} from "./src/util/logging";
import Saga from "./src/saga/saga";

import {push} from "./src/recovery/recovery";

export default async function test() {
    push("test", {data: "data", route: "/route/"});
}
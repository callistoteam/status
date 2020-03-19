import { Application } from "https://deno.land/x/abc/mod.ts";

import getStatus from "./getStatus.ts"
import { Status } from './types.ts'
let status:Status = {updated: new Date(), status: false}


const app = new Application();
(async () => {
    await getStatus().then(res=> status = res).catch(() => status = {updated: new Date(), status: false})
})




app.get("/", () => {
    return { hello: "world"}
  })
  .start({ port: 8080 });


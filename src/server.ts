import { createServer } from "node:http";
import { routerHandle } from "./routes/route";


const server = createServer((req, res) => {
    //     console.log(req.url);
    //     console.log(req.method);
    routerHandle(req, res)
})

server.listen(5000, () => {
    console.log("server is running on 5000 port");
})
import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controller/product.controller";


export const routerHandle = (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url
    const method = req.method
    if (url === "/" && method === "GET") {
        // console.log("This is root router");

        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is root route" }))
    }
    else if (url?.startsWith("/products")) {
        //     console.log("This is users router");
        productController(req, res)
    }
    else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end(JSON.stringify({ errorMessage: "NOT FOUND!" }))
    }

}
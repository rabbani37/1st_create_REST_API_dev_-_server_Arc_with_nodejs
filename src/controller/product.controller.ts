import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";



export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const urlSeparet = url?.split("/")
    const idUrl = urlSeparet && urlSeparet[1] === "products" ? Number(urlSeparet.at(-1)) : null;
    console.log(idUrl);
    const method = req.method

    // GET All product
    if (url === "/products" && method === "GET") {
        const products = readProduct()
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is Products data", data: products }))
    }
    else if (method === "GET" && idUrl !== null) {
        const products = readProduct();
        const singleProduct = products.find((p: any) => p.pid === idUrl);
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is single data", data: singleProduct }))

    }

}
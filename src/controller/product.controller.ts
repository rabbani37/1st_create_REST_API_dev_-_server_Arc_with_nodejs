import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct, writeProduct } from "../service/product.service";
import type { IProduct } from "../types/product.types";
import { parsBody } from "../utility/pares.body";



export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    // console.log(Request, req);

    const url = req.url
    const urlSeparet = url?.split("/")
    const idUrl = urlSeparet && urlSeparet[1] === "products" ? Number(urlSeparet.at(-1)) : null;
    // console.log(idUrl);
    const method = req.method

    // GET All product
    if (url === "/products" && method === "GET") {
        const products = readProduct()
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is Products data", data: products }))
    }
    // GET single product
    else if (method === "GET" && idUrl !== null) {
        const products = readProduct();
        const singleProduct = products.find((p: IProduct) => p.pid === idUrl);
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is single data", data: singleProduct }))

    }
    // POST products
    else if (method === "POST" && url === "/products") {
        const products = readProduct()
        const body = await parsBody(req)
        const newProduct = {
            pid: Date.now(),
            ...body
        };
        products.push(newProduct)
        writeProduct(products)
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "product created successfully ", data: products }))
    }

    // update prduct by PUT 
    else if (method === "PUT" && idUrl !== null) {
        const body = await parsBody(req);
        const products = readProduct();
        const indexOfproduct = products.findIndex((p: IProduct) => p.pid === idUrl);
        // console.log(indexOfproduct);
        if (indexOfproduct < 0) {
            res.writeHead(404, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: "product not found!" }))
        } else {
            products[indexOfproduct] = { pid: products[indexOfproduct].pid, ...body }
            writeProduct(products)
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: "product updated", data: products[indexOfproduct] }))
        }

    }
    // remove a product by DELETE 
    else if (method === "DELETE" && idUrl !== null) {
        const products = readProduct();
        const index = products.findIndex((p: IProduct) => p.pid === idUrl);
        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: "product not found!" }))
        }
        else {
            products.splice(index, 1)
            writeProduct(products)
            res.writeHead(200, { "content-type": "application/json" })
            res.end(JSON.stringify({ message: "product removed", data: products[index] }))
        }

    }

}
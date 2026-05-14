import type { IncomingMessage, ServerResponse } from "node:http";

const products = [
    { pid: 101, name: "Smart watch 22A" },
    { pid: 102, name: "Smart TV" },
    { pid: 103, name: "mobile phone" }
]

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method


    if (url === "/products" && method === "GET") {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is Products data", data:  }))

    }
}
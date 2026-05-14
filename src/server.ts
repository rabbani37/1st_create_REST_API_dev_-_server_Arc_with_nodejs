import { createServer } from "node:http";


const server = createServer((req, res) => {
    //     console.log(req.url);
    //     console.log(req.method);

    const url = req.url
    const method = req.method
    if (url === "/" && method === "GET") {
        // console.log("This is root router");

        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is root route" }))
    }
    else if (url?.startsWith("/users")) {
        //     console.log("This is users router");
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is user route" }))
    }
    else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end(JSON.stringify({ errorMessage: "NOT FOUND!" }))
    }

})

server.listen(5000, () => {
    console.log("server is running on 5000 port");
})
import { rejects } from "node:assert";
import { resolve } from "node:dns";
import type { IncomingMessage } from "node:http";


export const parsBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, rejects) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", () => {

            try {
                resolve(JSON.parse(body))
            } catch (error) {
                rejects(error)
            }

        })
    })
}
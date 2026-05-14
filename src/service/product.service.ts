
import fs from "fs";
import path from "path";

const dbFilePath = path.join(process.cwd(), "./src/database/db.json")

export const readProduct = () => {
    // console.log(process.cwd());
    const products = fs.readFileSync(dbFilePath, "utf-8")
    return JSON.parse(products)
}
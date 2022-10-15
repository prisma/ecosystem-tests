const fs = require('fs');
const crypto = require('crypto');

const encodeBase64 = (data) => {
    return Buffer.from(data).toString('base64');
}
const decodeBase64 = (data) => {
    return Buffer.from(data, 'base64').toString('ascii');
}

const edgeJsFile = './generated/client/deno/edge.js'

const edgeJsString = fs.readFileSync(edgeJsFile, {encoding:'utf8'})
const edgeJsStringLines = edgeJsString.split("\n")
// console.log({ edgeJsStringLines })

let inlineSchema = undefined
let inlineSchemaHash = undefined
edgeJsStringLines.forEach((x, i) => {
    // console.log(x.substring(0,23))
    if(x.substring(0,23) === "config.inlineSchema = '") {
        inlineSchema = x.substring(23, x.length - 1)
    }
    if(x.substring(0,23) === "config.inlineSchemaHash") {
        inlineSchemaHash = x.substring(27, x.length - 1)
    }
})
// console.log(inlineSchema)
// console.log(inlineSchemaHash)

const decodedSchema = decodeBase64(inlineSchema)

const cleanedSchema = decodedSchema.replace("previewFeatures = [\"denoDeploy\"]", "")
// console.log(inlineSchema.length)
// console.log(cleanedSchema.length)

const encodedCleanedSchema = encodeBase64(cleanedSchema)
// console.log(encodedCleanedSchema)

const newHash = crypto.createHash('sha256').update(encodedCleanedSchema).digest('hex')
// console.log(newHash)

let manipulatesEdgeJsString = edgeJsString.replace(inlineSchema, encodedCleanedSchema)
manipulatesEdgeJsString = manipulatesEdgeJsString.replace(inlineSchemaHash, newHash)

fs.writeFileSync("./generated/client/deno/edge.js", manipulatesEdgeJsString)
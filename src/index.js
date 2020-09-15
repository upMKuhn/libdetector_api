const express = require('express')
const http = require('http')
const LibraryDetector = require('./detectors')
const bodyParser = require('body-parser')

;(async function () {
    launchServer()
})().catch((error) => {
    console.error(error)
    process.exit(1)
})

function launchServer() {
    const app = express()
    const server = http.createServer(app)
    const API_KEY = process.env.API_KEY || null

    app.use(function (req, res, next) {
        var data = ''
        req.on('data', function (chunk) {
            data += chunk
        })
        req.on('end', function () {
            req.rawBody = data
            next()
        })
    })

    app.post('/', (req, response) => {
        const authKey = req.headers.authorization
        if ((!authKey && API_KEY) || authKey != API_KEY) {
            return response.status(401).send()
        }

        if (!req.rawBody) {
            return response.status(400).send('Body required')
        }

        const detector = new LibraryDetector(req.rawBody)

        return response.status(200).json(detector.detect())
    })

    app.get('/health', async (req, response) => {
        response.json({})
        return response
    })

    server.listen(8001)
}

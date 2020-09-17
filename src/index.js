const express = require('express')
const http = require('http')
const LibraryDetector = require('./detectors')
const bodyParser = require('body-parser')

;(async function () {
    launchServer()
})().catch((error) => {
    console.error('Fatal Error, exiting...', error)
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
            console.log("Access denied" ,req)
            return response.status(401).send()
        }

        if (!req.rawBody) {
            console.log("Access denied" ,req)
            return response.status(400).send('Body required')
        }
        try {
            console.log('/',req.ip, req.headers["user-agent"])
            const detector = new LibraryDetector(req.rawBody)
            return response.status(200).json(detector.detect())
        } catch (ex) {
            console.error(ex)
            return response.status(500).json(ex)
        }
    })

    app.get('/health', async (req, response) => {
        response.json({})
        return response
    })

    server.listen(8001)
}

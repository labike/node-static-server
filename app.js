const http = require('http')
    //const fs = require('fs')
const path = require('path')

//const promisify = require('util').promisify
// const stats = promisify(fs.stat)
// const readdir = promisify(fs.readdir)

const conf = require('./config')
const read = require('./read')

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config)
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.rootPath, req.url);

            read(req, res, filePath, this.conf)

            // fs.stat(filePath, (err, stats) => {
            //     if (err) {
            //         res.statusCode = 404;
            //         res.setHeader('Content-Type', 'text/plain');
            //         res.end(`${filePath} is not a directory or file`)
            //         return
            //     }
            //     if (stats.isFile()) {
            //         res.statusCode = 200;
            //         res.setHeader('Content-Type', 'text/plain')
            //         fs.createReadStream(filePath).pipe(res)
            //     } else if (stats.isDirectory()) {
            //         fs.readdir(filePath, (err, files) => {
            //             res.statusCode = 200;
            //             res.setHeader('Content-Type', 'text/plain')
            //             res.end(files.join(','))
            //         })
            //     }
            // })

            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'text/plain');
            // res.end(filePath)
        })

        server.listen(this.conf.port, this.conf.hostname, () => {
            const address = `http://${this.conf.hostname}:${this.conf.port}`
            console.log(`Server running at ${address}`)
        })
    }
}

module.exports = Server
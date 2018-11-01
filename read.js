const http = require('http')
const fs = require('fs')
const path = require('path')

const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const handlebars = require('handlebars')
const source = fs.readFileSync(path.join(__dirname, 'templates/index.tpl'))
const tpl = handlebars.compile(source.toString())

const mimeType = require('./type')

//const isFresh = require('./cache')

module.exports = async function(req, res, filePath, config) {
    try {
        const stats = await stat(filePath)

        if (stats.isFile()) {
            const fileType = mimeType(filePath)

            // if (isFresh(stats, req, res)) {
            //     res.statusCode = 304
            //     res.end()
            //     return
            // }

            res.statusCode = 200;
            res.setHeader('Content-Type', fileType)
            fs.createReadStream(filePath).pipe(res)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html')
            const dir = path.relative(config.rootPath, filePath)

            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            }
            res.end(tpl(data))
        }
    } catch (err) {
        console.log(err)
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`)
    }
}
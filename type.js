const path = require('path')

const mimeType = {
    "js": "text/javascript",
    "css": "text/css",
    "png": "image/png",
    "jpg": "image/jpg",
    "gif": "image/gif",
    "html": "text/html",
    "txt": "application/text",
    "json": "application/json"
}

module.exports = (filePath) => {
    let extFileName = path.extname(filePath)
        .split('.')
        .pop()
        .toLowerCase()

    if (!extFileName) {
        extFileName = filePath
    }

    return mimeType[extFileName] || mimeType['txt']
}
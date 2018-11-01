const { cache } = require('./config')

function refreshSource(stats, res) {
    const { maxAge, expires, cacheControl, etag, lastmodified } = cache

    const new_expires = new Date()
    if (expires) {
        res.setHeader('Expires', new_expires.toUTCString())
    }

    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }

    if (lastmodified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }

    if (etag) {
        res.setHeader('ETag', `${stats-size}-${stats.mtime}`)
    }
}

module.exports = function isFresh(stats, req, res) {
    refreshSource(stats, res)
    const lastModified = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']

    if (!lastModified && !etag) {
        return false
    }

    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false
    }

    if (etag && etag !== res.getHeader('ETag')) {
        return false
    }

    return true

}
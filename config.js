module.exports = {
    rootPath: process.cwd(),
    hostname: '127.0.0.1',
    port: 3333,
    cache: {
        maxAge: 1000,
        expires: true,
        cacheControl: true,
        etag: true,
        lastModified: true
    }
}
const yargs = require('yargs')
const Server = require('./app')

const argv = yargs
    .usage('anywhere [options]')
    .option('p', {
        alias: 'port',
        describe: '端口',
        default: 3333
    })
    .option('h', {
        alias: 'hostname',
        describe: '主机',
        default: '127.0.0.1'
    })
    .version()
    .alias('v', 'version')
    .help()
    .argv;

const server = new Server(argv)
server.start()
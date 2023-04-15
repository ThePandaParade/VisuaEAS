// Where it begins is where it ends \\
// If you don't know what anything is, don't touch it \\

// Imports \\
const fastify = require('fastify')({ logger: true })
const path = require('path')
const fs = require('fs')

// Grab the config \\
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'config.json')))

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'assets'),
    prefix: '/assets/'
})

// Routes \\
fastify.get('/', (req, reply) => {
    reply.sendFile(path.join(__dirname, 'web', 'index.html'))
});

fastify.get('/alert/:country/:id', (req, reply) => {
    // TODO \\
});

// API Routes will be sent to api.js \\
try {
    fastify.register(require('./api.js'))
} catch (err) {
    console.error("Error registering API Routes. Performance may be affected.")
    console.error(err)
}

// Start the server \\
(async () => {
    try {
        await fastify.listen({"port": config.port})
        
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})(); 
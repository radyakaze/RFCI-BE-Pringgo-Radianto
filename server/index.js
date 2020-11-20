// Require the framework and instantiate it
const fastify = require('fastify')();
const dayjs = require('dayjs');
const fs = require('fs');
const util = require('util');
const os = require('os');

// On Response Hook
fastify.addHook('onResponse', (request, reply, done) => {
  const date = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
  const status =
    reply.raw.statusCode >= 200 && reply.raw.statusCode < 300
      ? 'Success'
      : 'Failed';
  const method = request.method;
  const url = `http://${request.headers.host}${request.url}`;
  const data = JSON.stringify({
    ...request.body,
    'X-RANDOM': request.headers['x-random'],
  });

  // Log format
  const log = util.format('[%s] %s: %s %s %s', date, status, method, url, data);

  // Append file
  fs.appendFile('./server.log', log + os.EOL, function (err) {
    if (err) throw err;
    console.log(log);
  });
  done();
});

// Declare a route
fastify.post('/', async (request, reply) => {
  reply.code(201);
  return {
    success: true,
  };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    console.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();

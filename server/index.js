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

  const url = `http://${request.headers.host}${request.url}`;

  // Remove default header
  const defaultHeader = ['accept', 'content-type', 'user-agent', 'content-length', 'host', 'connection'];
  const headers = Object.fromEntries(
    Object.entries(request.headers)
      .filter(([key, value]) => !defaultHeader.includes(key))
      .map(([key, value]) => [key.toUpperCase(), value])
  );
  const data = JSON.stringify({
    ...request.body,
    ...headers
  });

  // Log format
  const log = util.format('[%s] %s: %s %s %s', date, status, request.method, url, data);

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

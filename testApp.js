const net = require('net');
const { formatToClock, formatFromClock } = require('./utils/formatToClock');

const client = net.createConnection({ host: '192.168.15.53', port: 3000 }, () => {
  console.log('Connectado');
  const stringToSend = formatToClock('00+RR+00+N]5]100');
  client.setEncoding('HEX');
  client.write(stringToSend);
});
client.on('data', (data) => {
  console.log(JSON.stringify(formatFromClock(data)));

  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});

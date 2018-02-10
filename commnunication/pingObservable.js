const {
  Observable,
} = require('rxjs/Rx');
const net = require('net');
const { formatToClock } = require('../utils/formatToClock');


const PingObservable = (host, port) => {
  const socket = net.createConnection({ host, port });
  socket.setEncoding('HEX');

  socket.on('connect', () => socket.write(formatToClock('00+RH+00')));

  return Observable
    .create((observer) => {
      socket.on('data', (data) => {
        observer.next(data);
        socket.end();
      });
      socket.on('error', (err) => {
        observer.error(err);
        socket.end();
      });
      socket.on('end', () => {
        socket.removeAllListeners();
        observer.complete();
      });
    });
};

module.exports = {
  PingObservable,
};
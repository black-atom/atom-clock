const {
  Observable,
} = require('rxjs/Rx');
const net = require('net');
const { formatToClock } = require('../utils/formatToClock');


const PingObservable = ({ host, port }) => {
  const socket = net.createConnection({ host, port });
  socket.setEncoding('HEX');
  socket.setTimeout(2000);

  socket.on('connect', () => socket.write(formatToClock('00+RH+00')));

  return Observable
    .create((observer) => {
      socket.on('data', () => {
        observer.next(true);
        socket.end();
      });
      socket.on('error', () => {
        observer.next(false);
        socket.end();
      });
      socket.on('close', () => {
        socket.removeAllListeners();
        observer.complete();
      });
      socket.on('end', () => {
        observer.next(false);
        socket.end();
      });
      socket.on('timeout', () => {
        observer.next(false);
        socket.end();
      });
    });
};

module.exports = {
  PingObservable,
};

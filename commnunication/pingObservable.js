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

const host = '192.168.15.53';
const port = 3000;

const clocks = [
  { host, port },
  { host, port },
  { host, port },
  { host, port },
  { host, port },
  { host, port },
  { host, port },
  { host, port },
];

const sub = Observable.from(clocks)
  .flatMap(({ host, port }) => {
    return PingObservable(host, port)
      .catch(error => Observable.of("error"));
  })
  .subscribe({
    error: e => console.log(e),
    complete: () => console.log('finished'),
    next: e => console.log('data', e),
  });

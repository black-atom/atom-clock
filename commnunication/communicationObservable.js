const {
  Subject, Subscription, AnonymousSubject,
} = require('rxjs/Rx');
const net = require('net');
const { formatToClock } = require('../utils/formatToClock');

class SocketSubject extends AnonymousSubject {
  constructor(host, port) {
    const destination = new Subject();
    const socket = net.createConnection({ host, port });
    socket.setEncoding('HEX');

    socket.on('data', data => destination.next(data));
    socket.on('end', () => destination.complete());
    socket.on('error', err => destination.error(err));

    super(destination, destination);
    this.socket = socket;
  }
  next(hexString) {
    const { socket } = this;

    const stringToSend = formatToClock(hexString);
    socket.write(stringToSend);
  }
  error(err) {
    const { destination } = this;
    if (destination && destination.error) {
      this.destination.error(err);
    }
  }

  complete() {
    const { socket, destination } = this;
    socket.end();
    destination.complete();
  }

  _subscribe(subscriber) {
    const { source } = this;
    if (source) {
      return this.source.subscribe(subscriber);
    }
    return Subscription.EMPTY;
  }

  unsubscribe() {
    const { socket, destination } = this;
    socket.end();
    destination.complete();
  }
}

module.exports = {
  SocketSubject,
};

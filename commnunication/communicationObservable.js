const {
 Subject, Subscription, AnonymousSubject, Observable 
} = require('rxjs/Rx');
const net = require('net');
const { formatToClock, formatFromClock } = require('../utils/formatToClock');

class SocketSubject extends AnonymousSubject {
  constructor(host, port) {
    const socket = net.createConnection({ host, port });
    socket.setEncoding('HEX');

    const source = Observable.create((observer) => {
      socket.on('data', data => observer.next(data));
      socket.on('end', () => observer.complete());
    });

    super(null , source);
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
    const { destination } = this;
    if (destination && destination.complete) {
      this.destination.complete();
    }
  }
  _subscribe(subscriber) {
    const { source } = this;
    if (source) {
      return this.source.subscribe(subscriber);
    }
    return Subscription.EMPTY;
  }
}

const sub = new SocketSubject('192.168.15.53', 3000);
sub
  .map(formatFromClock)
  .subscribe(e => console.log(e));
sub.next('00+RR+00+N]5]100');
sub.next('00+RR+00+N]5]100');
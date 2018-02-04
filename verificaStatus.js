const Rx = require('rxjs/Rx');
const ping = require('ping');
const { merge } = require('ramda');

const { Observable } = Rx;

const toPing = relogioItem => Observable
  .fromPromise(ping.promise.probe(relogioItem.ip))
  .map(response => ({ alive: response.alive }))
  .map(merge(relogioItem));

const obs1 = Observable.interval(500)
  .mapTo({
    ip: '192.168.15.53',
  });

const buffered = obs1.bufferTime(2000)
  .flatMap(arr => Observable.from(arr))
  .flatMap(toPing);


buffered.subscribe(x => console.log(x));


//timeoutWith;

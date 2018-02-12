const {
  Observable,
} = require('rxjs');
const moment = require('moment');
const { Op } = require('sequelize');
const { filter, map } = require('ramda');
const { getPingConfig } = require('./config/pingConfig');
const {
  getModel,
  isDBReady,
  getTransaction,
} = require('./database/db.js');
const { PingObservable } = require('./commnunication/pingObservable');

const Relogio = getModel('Relogio');
const Ping = getModel('Ping');
const { interval } = getPingConfig();

const getClocksToPing = () => Relogio.findAll();

const shouldBePinged = (relogio) => {
  const { lastTested, interval: clockInterval } = relogio;

  if (lastTested === null) return true;

  const dateToVerify = moment(lastTested).add(clockInterval, 'milliseconds');

  return moment(dateToVerify).diff(Date.now()) <= 0;
};

const pingClock = clock => PingObservable(clock)
  .take(1)
  .flatMap(async (isUp) => {
    const transaction = await getTransaction();
    try {
      let { errorCount, id } = clock; // eslint-disable-line

      await Ping.create({
        isUp,
        RelogioId: id,
      }, { transaction });

      if (!isUp) {
        await clock.increment({ errorCount: 1 }, { transaction });
      } else {
        await clock.update({ errorCount: 0 }, { transaction });
      }

      const updatedClock = await clock.update({
        isUp,
      }, { transaction });

      await transaction.commit();
      return updatedClock;
    } catch (error) {
      transaction.rollback();
      console.log(error);
      throw error;
    }
  });

const updateLastTested = async (clocks) => {
  const ids = map(clock => clock.id, clocks);
  await Relogio.update(
    {
      lastTested: Date.now(),
    },
    {
      where: {
        id: { [Op.in]: ids },
      },
    },
  );
};

Observable
  .interval(interval)
  .flatMap(isDBReady)
  .filter(dbStatus => dbStatus === true)
  .flatMap(getClocksToPing)
  .map(filter(shouldBePinged))
  .filter(clocks => clocks.length > 0)
  .do(updateLastTested)
  .flatMap(clocks => Observable.from(clocks))
  .flatMap(pingClock)
  .subscribe({
    // next: data => console.log(data),
    error: error => console.log(error),
  });

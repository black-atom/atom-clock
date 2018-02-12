const {
  getModel,
  isDBReady,
} = require('../database/db.js');

const Relogio = getModel('Relogio');

isDBReady().then(async () => {
  for (let i = 0; i < 3; i += 1) {
    await Relogio.create({ // eslint-disable-line
      host: 'ox1.modrp.com',
      port: 3000,
      interval: 30000,
    });
  }
});

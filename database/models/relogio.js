const Sequelize = require('sequelize');

module.exports = (db) => {
  const Relogio = db.define('Relogio', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    host: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    port: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isUp: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    interval: {
      type: Sequelize.INTEGER,
      defaultValue: 15 * 60000,
    },
    errorCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    lastTested: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  Relogio.associate = ({ Ping }) => {
    Relogio.hasMany(Ping, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Relogio;
};

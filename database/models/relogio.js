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
    companyId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    operator: {
      type: Sequelize.ENUM,
      values: ['VIVO', 'TIM', 'CLARO', 'OI', 'PORTO_CONECTA', 'NEXTEL'],
    },
    imeiChip: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberSeal: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    moduleVersion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    moduleNumber: {
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
    errorCountAlert: {
      type: Sequelize.INTEGER,
      defaultValue: 5,
      allowNull: false,
    },
    lastTested: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  Relogio.associate = ({ Ping, Address }) => {
    Relogio.hasMany(Ping, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
    Relogio.hasOne(Address, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Relogio;
};

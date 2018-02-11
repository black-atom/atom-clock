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
      type: Sequelize.STRING,
      allowNull: false,
    },
    isUp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alertAt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Relogio.associate = ({ Ping }) => {
    Relogio.hasMany(Ping, {
      onDelete: 'cascade',
    });
  };

  return Relogio;
};

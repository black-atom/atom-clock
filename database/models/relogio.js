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
    },
    alertAt: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

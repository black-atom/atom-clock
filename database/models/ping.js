const Sequelize = require('sequelize');

module.exports = (db) => {
  const Ping = db.define('Ping', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    isUp: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    error: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  Ping.associate = ({ Relogio }) => {
    Ping.belongsTo(Relogio, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Ping;
};

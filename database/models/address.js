const Sequelize = require('sequelize');

module.exports = (db) => {
  const Address = db.define('Address', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    complement: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    lagitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });

  Address.associate = ({ Relogio }) => {
    Address.belongsTo(Relogio, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Address;
};

const { Sequelize, DataTypes } = require('sequelize');
const databaseConnectionString = include('/databaseConnectionSequelize');

const sequelize = new Sequelize(databaseConnectionString);

const petTypeModel = sequelize.define('pet_type', {
    pet_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'pet_type',
    timestamps: false
});

module.exports = petTypeModel;
const { Sequelize, DataTypes } = require('sequelize');
const databaseConnectionString = include('/databaseConnectionSequelize');
const userModel = include('models/web_user');


const sequelize = new Sequelize(databaseConnectionString);

const petModel = sequelize.define('pet', {
    pet_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    web_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pet_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'pet',
    timestamps: false
});
petModel.belongsTo(userModel , { as: 'owner', timestamps: false, foreignKey:
'web_user_id'});
userModel.hasMany(petModel , { as: 'pets', timestamps: false, foreignKey:
'web_user_id'});
module.exports = petModel;
const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize')

const uuid = require('uuid')

const UserModel = require('./UserModel')

const RefreshTokenModel = sequelize.define('RefreshToken', {
    id:{
        primaryKey:true,
        defaultValue:uuid.v4(),
        type:DataTypes.STRING
    },

    expiresIn:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
}, {tableName:'refresh_tokens'})

RefreshTokenModel.belongsTo(UserModel, {
    constraints:true,
    targetKey:'id',
    foreignKey:'user_id'
})

module.exports = RefreshTokenModel


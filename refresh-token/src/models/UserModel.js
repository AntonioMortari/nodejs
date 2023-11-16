const sequelize = require('../db/connection')
const {DataTypes} = require('sequelize')

const uuid = require('uuid')

const UserModel = sequelize.define('User', {
    id:{
        type: DataTypes.STRING,
        primaryKey:true,
        defaultValue: uuid.v4()
    },

    name:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },

    username:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

    refresh_token:{
        type:DataTypes.STRING
    }
})

module.exports = UserModel
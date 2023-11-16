const express = require('express')
const app = express()
require('dotenv').config()

// models
const UserModel = require('./models/UserModel')
const RefreshTokenModel = require('./models/RefreshTokenModel')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// db
const sequelize = require('./db/connection')
const createTableOnDb = async() =>{
    await UserModel.sync()
    await RefreshTokenModel.sync()
}
createTableOnDb()

// routes
const usersRoutes = require('./routes/users.routes')

app.use('/users', usersRoutes)


app.listen(3000, () => console.log('Server is running'))
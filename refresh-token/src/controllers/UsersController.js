const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

// model
const UserModel = require("../models/UserModel")
const RefreshTokenModel = require('../models/RefreshTokenModel')

class UsersController{

    async index(req,res){
        const findUsers = await UserModel.findAll()

        res.status(200).json(findUsers)
    }

    async create(req,res){
        const {name, username, password} = req.body

        // verify data
        if(!name || !password || !username){
            return res.status(400).json({message:'data is missing'})
        }

        //verify user exists
        const findUser = await UserModel.findOne({where:{username:username}})
        if(findUser){
            return res.status(400).json({message:`Username ${username} is used`})
        }

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user
        const result = await UserModel.create({
            name,
            username,
            password:hashedPassword
        })

        res.status(201).json({message:'User created', result:result})
    }

    async auth(req,res){
        const {username, password} = req.body

        // verify username
        const findUser = await UserModel.findOne({where:{username:username}})
        if(!findUser){
            return res.status(400).json({message:'incorrect username or password'})
        }

        // verify password
        const passwordCorrect = await bcrypt.compare(password,findUser.password)
        if(!passwordCorrect){
            return res.status(400).json({message:'incorrect username or password'})
        }

        if(!process.env.SECRET_KEY_JWT){
            return res.status(400).json({message:'Secret key is missing'})
        }

        //generate acess token
        const acessToken = jwt.sign({}, process.env.SECRET_KEY_JWT, {
            expiresIn:'20m',
            subject:findUser.id
        } )

        // delete refresh token user
        await RefreshTokenModel.destroy({
            where:{
                user_id:findUser.id
            }
        })

        // generate refresh token
        const expiresIn = dayjs().add(15, 'millisecond').unix()
        const refreshToken = await RefreshTokenModel.create({
            user_id: findUser.id,
            expiresIn
        })
        
        res.status(200).json({message:'Authenticated', acessToken:acessToken, refreshToken: refreshToken})
    
    }

}

module.exports = UsersController
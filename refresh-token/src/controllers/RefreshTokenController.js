const dayjs = require('dayjs')
const RefreshTokenModel = require('../models/RefreshTokenModel')

const jwt = require('jsonwebtoken')

class RefreshTokenCotroller {

    async execute(req, res) {
        // take refresh token from body
        const { refreshToken } = req.body

        // verify if exists refresh token
        let findToken = await RefreshTokenModel.findByPk(refreshToken)
        if (!findToken) {
            // if not exists, return an error
            return res.status(400).json({ message: 'Invalid Refresh Token' })
        }

        console.log(dayjs().isAfter(dayjs.unix(findToken.expiresIn)))

        // verify if is expired
        if (dayjs().isAfter(dayjs.unix(findToken.expiresIn))) {
            // if refresh token is expired

            // delete refresh token on database
            const result = await RefreshTokenModel.destroy({where: {id:findToken.id}})

            // generate a new refresh token for the user
            const expiresIn = dayjs().add(15, 'second').unix()
            findToken = await RefreshTokenModel.create({
                user_id: findToken.user_id,
                expiresIn
            })

            console.log('Refresh token recriated',result, refreshToken, findToken)
        }

        // generate new acess token
        const acessToken = jwt.sign({}, process.env.SECRET_KEY_JWT, {
            expiresIn: '15m',
            subject: findToken.user_id
        })

        res.status(200).json({ message: 'Acess token generated', acessToken: acessToken })

    }
}

module.exports = RefreshTokenCotroller
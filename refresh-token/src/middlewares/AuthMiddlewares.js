const jwt = require('jsonwebtoken')

class AuthMiddlewares{

    async auth(req,res,next){
        const token = req.headers.authorization

        // verify if token is missing
        if(!token){
            return res.status(400).json({message:'Token is missing'})
        }

        // verify token
        jwt.verify(token, process.env.SECRET_KEY_JWT, (error,decoded) =>{
            if(error){
                return res.status(400).json({message:'Invalid Token', error:error})
            }

            console.log(decoded)

            next()
        })

    }

}

module.exports = AuthMiddlewares
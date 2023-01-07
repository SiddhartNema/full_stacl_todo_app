import { validationResult } from "express-validator"
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constant.js"
import { jsonGenrate } from "../utils/helpers.js"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import JWT from "jsonwebtoken"

const Register=async (req,res)=>{


    const errors = validationResult(req)
    if(errors.isEmpty()){
        const {name,username,password,email}=req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const userExist = await User.findOne({ $or:[{
            email:email
        },{
            username:username
        }]


        })
        if(userExist){
            return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"USER OR MAIL ALREADY EXSITS"))
        }

        //save db
        try {
            const result = await User.create({
                name:name,
                email:email,
                username:username,
                password:hashPassword,

            })

            const token = JWT.sign({userId:result._id}, JWT_TOKEN_SECRET)

            res.json(jsonGenrate(StatusCode.SUCCESS,"REGISTRATION SUCCESS",{userId:result._id,token:token}))
            
        } catch (error) {
            console.log(error);
            
        }

    }

    res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))
}

export default Register
import { validationResult } from "express-validator"
import User from "../models/User.js"
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js"
import { jsonGenrate } from "../utils/helpers.js"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

const Login = async (req,res) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const {username,password}=req.body
        const user = await User.findOne({username:username})

        if(!user){
            res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"USERNAME OR PASSWORDIS INCORRECT"))
        }
        const verified = bcrypt.campareSync(password,user.password)

        if(!verified){
            return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"USERNAME OR PASSWORDIS INCORRECT"))
        }

        const token = jwt.sign({userId:user._id},JWT_TOKEN_SECRET)

        return res.json(jsonGenrate(StatusCode.SUCCESS,"login sucess",{ userId:user_id,token:token }))
    }
  

    res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"validation error",errors.mapped()))
}
export default Login
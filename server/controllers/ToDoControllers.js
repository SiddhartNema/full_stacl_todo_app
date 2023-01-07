import { validationResult } from "express-validator"
import ToDo from "../models/ToDo.js"
import User from "../models/User.js"
import { StatusCode } from "../utils/constant.js"
import { jsonGenrate } from "../utils/helpers.js"

export const creteToDo = async (req,res)=>{
    

    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"TODO IS REQ",error.mapped()))
    }

    try {
        const result = await ToDo.create({
            userId:req.userId,
            desc: req.body.desc,


        })
        if(result){
            const user = await User.findOneAndUpdate({ _id:req.userId }, 
                {
                    $push:{todos:result}
                })
                return res.json(jsonGenrate(StatusCode.SUCCESS,"TODO CREATED", result))
        }
        
    } catch (error) {
        return res.json(jsonGenrate(StatusCode.SUCCESS,"something went wrong", error))
        
    }
}
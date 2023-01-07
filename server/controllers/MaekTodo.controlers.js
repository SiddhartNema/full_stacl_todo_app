import { validationResult } from "express-validator"
import { StatusCode } from "../utils/constant.js"
import { jsonGenrate } from "../utils/helpers.js"

 export const MarkTodo = async (req,res) => {

    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.json(jsonGenrate(StatusCode.VALIDATION_ERROR,"TO DO ID IS RRQ", error.mapped()))
    }

    try {
        const todo = await Todo.findOneAndUpdate({
            _id:req.body.todo_id,
            userId: req.userId,
        },[
             {
                $set:{
                isCompleted:{
                    $eq:[false,"$isCompleted"]
                }
            }
            }
        ])

        if(todo){
            return res.json(jsonGenrate(StatusCode.SUCCESS,"UPDATED", todo))
        }
        
    } catch (error) {
        return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"could not update", null))
        
    }


  
}

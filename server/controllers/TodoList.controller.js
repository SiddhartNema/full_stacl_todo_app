import User from "../models/User.js"
import { StatusCode } from "../utils/constant.js"
import { jsonGenrate } from "../utils/helpers.js"

export const GetTodos = async (req,res) => {
    try {

        const list = await User.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec()

        return res.json(jsonGenrate(StatusCode.SUCCESS,"ALL TODO LIST", list))
        
    } catch (error) {
        return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"ERROR", error))
        
    }
  
}
export default GetTodos

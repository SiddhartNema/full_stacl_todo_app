import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js"
import { jsonGenrate } from "../utils/helpers.js"
import jwt from "jsonwebtoken"
const Authmiddleware = (req,res,next) => {

    if(req.headers['auth']===undefined){
        return res.json(jsonGenrate(StatusCode.AUTH_ERROR,"Access Denied"))
    }

    const token = req.headers['auth']

    try {
        const decoded = jwt.verify(token,JWT_TOKEN_SECRET)
        console.log(decoded)

        req.userId=decoded.userId

        return next()
        
    } catch (error) {
        return res.json(jsonGenrate(StatusCode.UNPROCESSABLE_ENTITY,"INVALID TOKEN"))
        
    }
  
}
export default Authmiddleware
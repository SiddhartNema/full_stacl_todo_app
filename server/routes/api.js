import express from "express"
import Login from "../controllers/Login.controllers.js"
import Register from "../controllers/Register.controller.js"
import { LoginSchema } from "../validationSchema/Loginschema.js"
import { RegisterSchema } from "../validationSchema/RegisterSchema.js"

const apiRoute = express.Router()

apiRoute.post('/register', RegisterSchema ,Register )
apiRoute.post('/login', LoginSchema , Login )

export default apiRoute
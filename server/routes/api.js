import express from "express"
import { check } from "express-validator"
import Login from "../controllers/Login.controllers.js"
import Register from "../controllers/Register.controller.js"
import { creteToDo } from "../controllers/ToDoControllers.js"
import { LoginSchema } from "../validationSchema/Loginschema.js"
import { RegisterSchema } from "../validationSchema/RegisterSchema.js"
import {GetTodos} from "../controllers/TodoList.controller.js"
import { MarkTodo } from "../controllers/MaekTodo.controlers.js"

const apiRoute = express.Router()
export const apiProtected = express.Router()



apiRoute.post('/register', RegisterSchema ,Register )
apiRoute.post('/login', LoginSchema , Login )

apiProtected.post("/createToDo", [check("desc","Todo desc is req").exists()] , creteToDo)

apiProtected.post("/marktodo", [check("todo_id","Todo id is req").exists()] , MarkTodo)



apiProtected.get("/todolist", GetTodos)

export default apiRoute
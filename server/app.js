import express from "express"
import mongoose from "mongoose"
import Authmiddleware from "./middleware/Authmiddleware.js"
import apiRoute, { apiProtected } from "./routes/api.js"
import { DB_CONNECT } from "./utils/constant.js"


const app = express()

mongoose.connect(DB_CONNECT,{useNewURLParser:true},(e)=>console.log(e))

const PORT = 3000
app.use(express.json)


app.use('/api/',apiRoute)
app.use('/api/',apiProtected)
app.use('/api/',Authmiddleware,apiProtected)


app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON `+PORT)
})

app.use('api',apiRoute)
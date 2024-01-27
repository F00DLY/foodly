//require ('dotenv').config({path:'./.env'})

import dotenv from "dotenv"
import DB from "./db/conection.js"
import {app} from "./app.js"
dotenv.config({
    //path:'./.env'
})








DB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`mongo db connection failed !!!`,err)
})
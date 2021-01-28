const express = require('express')
const app = express()
const handler = require('./lib/app')

app.use(handler)

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Running at http://localhost:3000/")
})
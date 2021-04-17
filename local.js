const express = require('express')
const app = express()
const handler = require('./lib/app')

app.use(handler)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server(local) Running at http://localhost:${process.env.PORT}/`)  
    // require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(`Server(network) Running at http://${add}:3000/`)
    //     }
    //   })
})
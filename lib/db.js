const mongoose = require('mongoose')
// mongoose.connect(process.env.DB,{useUnifiedTopology: true})
mongoose.connect("mongodb://localhost:27017/devdb",{useUnifiedTopology: true,useNewUrlParser: true})
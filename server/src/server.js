const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const {videoRouter} = require('./routes/videos/videos.router')

const frontendBuild= path.join(__dirname,"..",'build',"index.html")

const PORT = 8000

const MONGO_URL = 'mongodb+srv://rohitpandey20002017:AyUSF8BxendFjsUY@cluster0.j0divv6.mongodb.net/?retryWrites=true&w=majority'
mongoose.connection.once('open',()=>{
    console.log('mongoose connection is established')
})

mongoose.connection.on('error',(err)=>{
    console.log(err)
})

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.static(frontendBuild))


app.use('/videos',videoRouter)

app.use('*',(req,res)=>{
    res.sendFile(frontendBuild)
})



async function startServer(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    app.listen(PORT,()=>{
        console.log('app has started')
    })
}
startServer()
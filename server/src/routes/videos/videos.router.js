const express = require('express')
const {uploadAllVideos , httpGetAllVideos } = require('./videos.controller')
const videoRouter = express.Router()


videoRouter.get('/',httpGetAllVideos)
// videoRouter.get('/upload',uploadAllVideos)



module.exports ={videoRouter}
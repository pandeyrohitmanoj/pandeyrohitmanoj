const { 
    getDriveLinks,
    getAllVideos } = require('../../models/videos.model')

async function uploadAllVideos(req,res){
    res.json(await getDriveLinks())
    return 
}

async function httpGetAllVideos(req,res){
    const data = await getAllVideos()
    res.status(200).json(data)
    return data
}

module.exports={ uploadAllVideos, httpGetAllVideos}
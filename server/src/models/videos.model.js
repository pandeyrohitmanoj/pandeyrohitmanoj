const {google} = require('googleapis')
const credentials = require('../credentials.json')
const folderID = "1sB9qORVK70fDZ--3a9Svb9cP8OSOSQBJ"

const videoDb = require('./videos.mongo')


const arrayOfVideoLink = []

const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/drive.readonly"],
    null
)

const drive = google.drive({ version: "v3", auth})

async function saveOneVideo(videoObject){
    await videoDb.updateOne({
        binData:videoObject.binData,
    },videoObject,{
        upsert:true
    })    
}

// function addVideoObjectToData(links){
//     for(let i=0;i<links.length;i++){
//         const video = {
//             binData:'',
//             bottomContext:{
//                 title:"@jaanvipatel",
//                 channel:"Carry",
//                 mainContent:"Short videos"
//             },
//             sideBar:{
//                 likesCount:Math.floor(Math.random()*1000),
//                 message:["some"],
//                 shareCount:Math.floor(Math.random()*100),
//             }
//         }
//         video.binData = links[i]
//         saveOneVideo(video)
//     }
// }

async function getDriveLinks() {
    let links = []
    try{
        const res = await drive.files.list({
            q:`'${folderID}' in parents and trashed = false`,
            fields:"nextPageToken, files(webViewLink)",
        })
        
        links = res.data.files.map( file => file.webViewLink)
        for(let i=0;i<links.length;i++){
            const video = {
                binData:'',
                bottomContext:{
                    title:"@jaanvipatel",
                    channel:"Carry",
                    mainContent:"Short videos"
                },
                sideBar:{
                    likesCount:Math.floor(Math.random()*1000),
                    message:["some"],
                    shareCount:Math.floor(Math.random()*100),
                }
            }
            video.binData = links[i]
            saveOneVideo(video)
        }
    }
    catch (error) {
        console.log("this is your error",error.message)
    }
    return links
}

async function getAllVideos(){
    let videoObjects = videoDb.find({})
    return videoObjects
}

module.exports={
    getDriveLinks,
    getAllVideos,
}
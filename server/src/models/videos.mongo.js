const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    binData:{
        type:String,
        required:true,
    },
    bottomContext:{
        title:{
            type:String,
            required:true,
        },
        channel:{
            type:String,
            required:true,
        },
        mainContent:{
            type:String,
            required:true,
        }
    },
    sideBar:{
        likesCount:{
            type:Number,
            required:true,
        },
        message:[
            {
                type:String,
                required:false
            }
        ],
        shareCount:{
            type:Number,
            required:true
        }
    }
})

module.exports = mongoose.model('Videos', videoSchema)
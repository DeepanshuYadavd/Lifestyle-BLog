 const mongoose=require("mongoose")
 // schema:
    const blogSchema=new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        snippet:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        }
    })

    const blog=mongoose.model("blog",blogSchema);
    module.exports=blog;
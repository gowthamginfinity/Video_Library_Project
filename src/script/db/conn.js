let mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/video_library").then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(`i got the error : ${err}`);
})
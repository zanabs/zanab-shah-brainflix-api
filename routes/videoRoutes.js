
import express from "express";

const router = express.Router();
import fs from "fs";
import {v4 as uuidv4} from "uuid";

router.get("/", (req, res) => {
    res.send("these are the API routes");
});

router.get("/videos", (req, res) => {
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const getVideoData = videos.map(video => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        }
    })

    res.send(getVideoData);

})

// play selected video

router.get("/videos/:id", (req, res)=>{
    const videos = JSON.parse(fs.readFileSync("./data/videos.json")); 
    const foundVideo = videos.find((video)=> video.id === req.params.id);
    res.send(JSON.stringify(foundVideo));
});

// upload new video

router.post("/videos", (req, res) =>{
    const videoData = JSON.parse(fs.readFileSync("./data/videos.json", "utf8"));
    console.log(req.body);

    if (
        !req.body.title ||
        !req.body.description 
    ) {
        res.status(400).json({
            error:"Request parameters are missing",
            message:
                "One of the required parameters are missing from your request"
        });
        return;
    } 

    const newVideo={
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        channel: "Zanab",
        image: "http://localhost:8080/images/placeholder.jpg",
        views: "980,544",
        likes: "22,479",
        duration: "4:01",
        timestamp: new Date().getTime(),
        comments:[
        {
            "id": uuidv4(),
            "name": "CharliXCX",
            "comment": "Your website is so brat xx",
            "likes": 0,
            "timestamp": 1691731062000
        },
    ]
    };

    videoData.push(newVideo);
    
    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData));

    res.send(newVideo);
});

// add comment 
router.post("/videos/:id/comments", (req, res) => {
    const videoData = JSON.parse(fs.readFileSync("./data/videos.json", "utf8"));
    const foundVideo = videoData.find((video)=> video.id === req.params.id);
    if (
        !req.body.comment
    ) {
        res.status(400).json({
            error:"Sorry, there is a required parameter missing",
            message: "Sorry, you are missing the required comments field"
        });
        return;
       
    }
    const newComment = {
        
            name: "Your Name",
            comment: req.body.comment,
            id: foundVideo.id,
            timestamp: new Date().getTime(),
            
    }

    foundVideo.comments.push(newComment);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData)); 
    res.send(newComment);

} );

// delete comment 





export default router;

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

router.get("/videos/:id", (req, res)=>{
    const videos = JSON.parse(fs.readFileSync("./data/videos.json")); 
    const foundVideo = videos.find((video)=> video.id === req.params.id);
    res.send(JSON.stringify(foundVideo));
});

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
        channel: "your channel",
        image: "http://localhost:8080/images/placeholder.jpg",
        timestamp: new Date().getTime()
    };

    videoData.push(newVideo);
    
    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData));

    res.send(newVideo);
});

export default router;
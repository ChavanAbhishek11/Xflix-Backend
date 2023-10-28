const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");

const getVideo = catchAsync(async(req,res)=>{
    let id = req.params.videoId;
    let data = await videoService.getVideoById(id);
    res.status(httpStatus.OK).send(data);
});

const getVideos = catchAsync(async(req,res)=>{
    let title = req.query.title ? req.query.title : "";
    let genres = req.query.genres ? req.query.genres : ["All"];
    let contentRating = req.query.contentRating ? req.query.contentRating : "All";
    let sort = req.query.sortBy ? req.query.sortBy : "releaseDate";
    let data = await videoService.getVideos(title,genres,contentRating,sort);
    res.status(200).send({videos: data});
});

const setVideo = catchAsync(async(req,res)=>{
    let data = await videoService.addVideo(req.body);
    res.status(201).send(data);
});

const changeVote = catchAsync(async(req,res)=>{
    let data = await videoService.changeVote(
        req.params.videoId,
        req.body.vote,
        req.body.change
    );
    res.status(204).send();
});

const changeView = catchAsync(async(req,res)=>{
    let id = req.params.videoId;
    let data = await videoService.changeView(id);
    res.status(204).send();
});


module.exports = {
    getVideo,
    getVideos,
    setVideo,
    changeVote,
    changeView,
}
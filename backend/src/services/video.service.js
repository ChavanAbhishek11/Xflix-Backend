const httpStatus = require("http-status");
const { Video } = require("../models");
const ApiError = require("../utils/ApiError");

const getVideoById = async (id) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  return video;
};

const getRatingarray = (contentRating) => {
//   let ratings = ["Anyone", "7+", "12+", "16+", "18+"];
//   if (rating == "All") return ratings;
//   let i = ratings.indexOf(rating);
//   return ratings.splice(0, i + 1);
let contentRatings = ["Anyone", "7+", "12+", "16+", "18+", "All"];
if (contentRating == "Anyone") {
    return contentRating;
  }
  if (contentRating == "All") {
    return contentRatings;
  }
  const contentRatingIndex = contentRatings.indexOf(contentRating);
  const possibleContentRating = contentRatings.splice(contentRatingIndex);
  console.log(possibleContentRating);

  return possibleContentRating;
};

const sortVideo = (videos, sortBy) => {
  videos.sort((v1, v2) => {
    let a = v1[sortBy];
    let b = v2[sortBy];
    if (sortBy == "releaseDate") {
      a = new Date(a).valueOf();
      b = new Date(b).valueOf();
    }
    return b - a;
  });
  return videos;
};

const getVideos = async (title, genres, contentRating, sort) => {
  console.log(title, sort, genres, contentRating);
  const titlequery = { title: { $regex: title, $options: "i" } };
  let genrequery = { genre: { $in: genres } };
  const ratingarray =  getRatingarray(contentRating);
  const ratingquery = { contentRating: { $in: ratingarray } };

  if (genres == "All") {
    genrequery = null;
  }
  let videos = await Video.find({
    ...titlequery,
    ...genrequery,
    ...ratingquery,
  });
  const sortedvideos =  sortVideo(videos, sort);
  return sortedvideos;
};

const addVideo = async (video) => {
  const result = await Video.create(video);
  console.log(result);
  return result;
};

const changeVote = async (id, vote, change) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  if (vote == "upVote") {
    if (change == "increase") video.votes.upVotes += 1;
    else {
      video.votes.upVotes -= 1;
      video.votes.upVotes = Math.max(video.votes.upVotes, 0);
    }
  } else {
    if (change == "increase") video.votes.downVotes += 1;
    else {
      video.votes.downVotes -= 1;
      video.votes.downVotes = Math.max(video.votes.downVotes, 0);
    }
  }
  await video.save();
};

const changeView = async (id) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  video.viewCount += 1;
  await video.save();
};

module.exports = {
  getVideoById,
  getVideos,
  addVideo,
  changeVote,
  changeView,
};

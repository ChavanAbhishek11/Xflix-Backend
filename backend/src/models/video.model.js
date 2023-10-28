const mongoose = require("mongoose");
const validator = require("validator");
const config = require("../config/config");

const videoSchema = mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
      trim: true,

    },
    title: {
        type: String,
        required: true,
        trim: true,
      },
    genre: {
        type: String,
        required: true,
        trim: true,
        enum: ['Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle'],
    },
    contentRating: {
        type: String,
        required: true,
        trim: true,
        enum: ['Anyone', '7+', '12+', '16+', '18+',"All"],
    },
    releaseDate: {
        type: String,
        required: true,
        trim: true,
    },
    previewImage: {
        type: String,
        trim: true,
    },
    votes: {
        upVotes: {
          type: Number,
          default: 0,
        },
        downVotes: {
          type: Number,
          default: 0,
        }
    },
    viewCount: {
      type: Number,
      default: 0,
    },
}
);

/**
 * @typedef Video
 */
const Video = mongoose.model("Video", videoSchema);
module.exports = {
  Video,
};
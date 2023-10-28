const StandardJoi = require("joi");
const customcheck = require("./custom.validation");

const Joi = StandardJoi.extend((joi) => ({
  base: joi.array(),
  type: "stringArray",
  messages: {
    "stringArray.type": "{{#label}} is not a valid string array",
  },
  coerce: (value, helpers)=>{
    if(typeof value !== "string")
    {
      return { value: value, errors: helpers.error("stringArray.type") };
    }
    value = value.replace(/^\[|\]$/g, "").split(",");
    const ar = value.map((val)=>{
      return val.trim();
    });
    return {value: ar};
  },
}));

const getVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().required().custom(customcheck.objectId),
  }),
};

const searchVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genres: Joi.stringArray().items(Joi.string().valid('Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All')),
    contentRating: Joi.string().valid('Anyone', '7+', '12+', '16+', '18+', 'All'),
    sortBy: Joi.string().valid('viewCount', 'releaseDate'),
  }),
}

const setVideo = {
  body: Joi.object().keys({
    videoLink: Joi.string().required().custom(customcheck.videolink),
    title: Joi.string().required(),
    genre: Joi.string().required().valid('Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle'),
    contentRating: Joi.string().required().valid("7+", "12+", "16+", "18+"),
    releaseDate: Joi.string().required().custom(customcheck.releasedate),
    previewImage: Joi.string().uri(),
  }),
}

const changeVote = {
    params: Joi.object().keys({
        videoId: Joi.string().custom(customcheck.objectId),
      }),
    body: Joi.object().keys({
        vote: Joi.string().required().valid('upVote', 'downVote'),
        change: Joi.string().required().valid('increase', 'decrease'),
      }),    
};

const changeView = {
  params: Joi.object().keys({
    videoId: Joi.string().required().custom(customcheck.objectId),
  }),
};

module.exports = {
  getVideo,
  searchVideos,
  setVideo,
  changeVote,
  changeView,
};
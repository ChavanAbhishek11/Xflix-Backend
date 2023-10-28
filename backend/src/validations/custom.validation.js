const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  };
  
  const videolink = (value, helpers) => {
    if (!value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)) {
      return helpers.message(
        "VideoLink must be a valid youtube video link"
      );
    }
    return value;
  };

  const releasedate = (value, helpers) => {
    if (!value.match(/^(([0-9])|([0-2][0-9])|([3][0-1])) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/)) {
      return helpers.message(
        "ReleaseDate must be a valid input"
      );
    }
    return value;
  };
  
  module.exports = {
    objectId,
    videolink,
    releasedate,
  };
  
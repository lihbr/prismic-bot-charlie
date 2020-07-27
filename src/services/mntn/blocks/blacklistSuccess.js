const blacklistSuccess = url => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `I added <${url}|${url.replace(
          /^https?:\/\//i,
          ""
        )}> to our Mention's blacklist successfully~`
      }
    },
    {
      type: "image",
      image_url: `${process.env.BOT_URL}/media/mntn__blacklist--success.gif`,
      alt_text: "GIF of a doggo on a computer"
    }
  ];
};

/**
 * Export
 */
module.exports = blacklistSuccess;

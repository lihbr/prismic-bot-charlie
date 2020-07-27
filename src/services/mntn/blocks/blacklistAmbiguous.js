const blacklistAmbiguous = () => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "I'm afraid there are multiple mentions in that message, I can't handle that for now~"
      }
    },
    {
      type: "image",
      image_url: `${process.env.BOT_URL}/media/mntn__blacklist--ambiguous.gif`,
      alt_text: "GIF of a doggo on a computer"
    }
  ];
};

/**
 * Export
 */
module.exports = blacklistAmbiguous;

const blacklistSuccess = url => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Don't blacklist <${url}|${url.replace(
          /^https?:\/\//i,
          ""
        )}> you fool! If you don't understand why you get this message have a read at our <https://www.notion.so/prismic/Mention-ae2d6615e43346f49c6ec67cf4b973fc|Mention process> again~`
      }
    },
    {
      type: "image",
      image_url: `${process.env.BOT_URL}/media/mntn__blacklist--unblacklistable.gif`,
      alt_text: "GIF of a doggo on a computer"
    }
  ];
};

/**
 * Export
 */
module.exports = blacklistSuccess;

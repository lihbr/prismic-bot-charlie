/**
 * Import
 */
const slack = require("../../../helpers/slack");

const forward = async body => {
  const message = (
    await (
      await slack.get("/conversations.history", {
        channel: body.event.item.channel,
        latest: body.event.item.ts,
        limit: 1,
        inclusive: true
      })
    ).json()
  ).messages[0];

  if (message) {
    const reaction = message.reactions.find(
      i => i.name === process.env.REAC_REACTION
    );
    if (reaction.count === 1) {
      return await slack.post("/chat.postMessage", {
        channel: process.env.REAC_OUTPUT,
        text: message.text,
        attachments: message.attachments
      });
    }
  }
};

/**
 * Export
 */
module.exports = {
  forward
};

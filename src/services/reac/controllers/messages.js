/**
 * Import
 */
const slack = require("../../../helpers/slack");

const forward = async (body, route) => {
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
    const reaction = message.reactions.find(i => i.name === route.reaction);
    if (reaction.count === 1) {
      for (const channel of route.to) {
        slack.post("/chat.postMessage", {
          channel,
          text: message.text,
          attachments: message.attachments
        });
      }
    }
  }
};

/**
 * Export
 */
module.exports = {
  forward
};

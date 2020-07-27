/**
 * Import
 */
const slack = require("../../../helpers/slack");

const get = async body => {
  return (
    await (
      await slack.get("/conversations.history", {
        channel: body.event.item.channel,
        latest: body.event.item.ts,
        limit: 1,
        inclusive: true
      })
    ).json()
  ).messages[0];
};

const isFirstReactionOfKind = (message, reaction) => {
  const reactionData = message.reactions.find(i => i.name === reaction);
  return reactionData && reactionData.count === 1;
};

const send = async (message, channel) => {
  await slack.post("/chat.postMessage", {
    channel,
    text: message.text,
    attachments: message.attachments
  });
};

const forward = async (body, rule) => {
  const message = await get(body);
  if (message && isFirstReactionOfKind(message, rule.reaction)) {
    for (const channel of rule.to) {
      send(message, channel);
    }
  }
};

const blacklist = async (body, rule) => {
  // 1. get message and alert
  const [message, alert] = await Promise.all([get(body), get(body)]);
  console.log(message);
  // 2. extract link from message
  // ???
  // 3. Build new excluded link array
  // ???
  // 4. Send new array to mention
  // ???
  // 5. Tell Slack it's ok
};

/**
 * Export
 */
module.exports = {
  forward,
  blacklist
};

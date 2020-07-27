/**
 * Import
 */
const slack = require("../../../helpers/slack");
const mention = require("../../../helpers/mention");

const blocks = require("../blocks");

const getMessage = async body => {
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

const getAlert = async rule => {
  return (
    await (
      await mention.get(`/accounts/${rule.account_id}/alerts/${rule.alert_id}`)
    ).json()
  ).alert;
};

const isFirstReactionOfKind = (message, reaction) => {
  const reactionData = (message.reactions || []).find(i => i.name === reaction);
  return reactionData && reactionData.count === 1;
};

const forward = async (body, rule) => {
  const message = await getMessage(body);

  if (message && isFirstReactionOfKind(message, rule.reaction)) {
    for (const channel of rule.to) {
      slack.post("/chat.postMessage", {
        channel,
        text: message.text,
        attachments: message.attachments
      });
    }
  }
};

const blacklist = async (body, rule) => {
  // Get message and alert
  const [message, alert] = await Promise.all([
    getMessage(body),
    getAlert(rule)
  ]);

  // Exit if not needed or found
  if (!isFirstReactionOfKind(message, rule.reaction) || !alert.blocked_sites) {
    return;
  }

  // Exit if ambiguous
  if (message.attachments.length > 1) {
    slack.post("/chat.postMessage", {
      channel: body.event.item.channel,
      thread_ts: message.ts,
      text: "Message contains multiple mentions, this is ambiguous~",
      blocks: blocks.blacklistAmbiguous()
    });
    return;
  }

  // Extract link from message
  const newSite = message.attachments[0].title_link.match(
    /^https?:\/\/[^\/]+/
  )[0];

  // Update mention
  const blocked_sites = [...alert.blocked_sites, newSite]
    .map(site => site.replace(/^http:\/\//i, "https://").replace(/\/$/, ""))
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
  mention.put(`/accounts/${rule.account_id}/alerts/${rule.alert_id}`, {
    blocked_sites
  });

  // Notify Slack
  slack.post("/chat.postMessage", {
    channel: body.event.item.channel,
    thread_ts: message.ts,
    text: `Site ${newSite.replace(
      /^https?:\/\//i,
      ""
    )} was added to Mention's blacklist~`,
    blocks: blocks.blacklistSuccess(newSite)
  });
};

/**
 * Export
 */
module.exports = {
  forward,
  blacklist
};

/**
 * Import
 */
const config = require("./config.json");
const controllers = require("./controllers");

/**
 * Route home service event request
 */
const event = async body => {
  switch (body.event.type) {
    case "reaction_added":
      for (const rule of config.forward) {
        if (
          body.event.reaction === rule.reaction &&
          body.event.item.channel === rule.from
        ) {
          await controllers.messages.forward(body, rule);
          break;
        }
      }

      for (const rule of config.blacklist) {
        if (
          body.event.reaction === rule.reaction &&
          body.event.item.channel === rule.from
        ) {
          await controllers.messages.blacklist(body, rule);
          break;
        }
      }
      break;

    default:
      break;
  }
};

/**
 * Export
 */
module.exports = {
  handler: {
    event
  }
};

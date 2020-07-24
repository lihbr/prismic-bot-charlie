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
      for (const route of config.messages) {
        if (
          body.event.reaction === route.reaction &&
          body.event.item.channel === route.from
        ) {
          await controllers.messages.forward(body, route);
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

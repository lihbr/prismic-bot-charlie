/**
 * Import
 */
const controllers = require("./controllers");

/**
 * Route home service event request
 */
const event = async body => {
  switch (body.event.type) {
    case "reaction_added":
      if (
        body.event.reaction === process.env.REAC_REACTION &&
        body.event.item.channel === process.env.REAC_INPUT
      ) {
        await controllers.messages.forward(body);
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

/**
 * Import
 */
const {
  formatted: { error }
} = require("../response");

/**
 * Route event to controller
 */
const route = (event, context, callback, controller) => {
  (async () => {
    if (controller[event.httpMethod]) {
      try {
        return await controller[event.httpMethod](event, context);
      } catch (err) {
        console.error(err);
        return error();
      }
    } else {
      return error({ status: 405 });
    }
  })().then(result => callback(null, result));
};

/**
 * Export
 */
module.exports = route;

/**
 * Import
 */
const qs = require("qs");

/**
 * Parse any slack request body
 * @param {object} event - the event object
 * @return {object} - slack parsed body
 */
const parseBody = event => {
  if (event.headers["content-type"] === "application/json") {
    return JSON.parse(event.body);
  }

  const body = qs.parse(event.body);

  return body.payload ? JSON.parse(body.payload) : body;
};

/**
 * Export
 */
module.exports = parseBody;

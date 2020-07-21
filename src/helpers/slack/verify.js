/**
 * Import
 */
const crypto = require("crypto");

/**
 * Verify that the request comes from slack
 * @param {object} event - the event object
 * @return {boolean} - true if from slack
 */
const verify = event => {
  // Validate event
  if (
    !event ||
    !event.headers["x-slack-request-timestamp"] ||
    !event.headers["x-slack-signature"]
  ) {
    return false;
  }

  // Getting variables
  const ver = "v0";
  const timestamp = event.headers["x-slack-request-timestamp"];
  const body = event.body; // was rawBody

  // Deny if too old
  if (
    process.env.NODE_ENV === "production" &&
    Date.now() / 1000 - timestamp > 60 * 5
  ) {
    return false;
  }

  // Hash body
  const basestring = `${ver}:${timestamp}:${body}`;
  const hmac = crypto.createHmac("sha256", process.env.SLACK_SIGNING_SECRET);
  hmac.update(basestring);
  const signature = `${ver}=${hmac.digest("hex")}`;

  // Verify body match signature
  return signature === event.headers["x-slack-signature"];
};

/**
 * Export
 */
module.exports = verify;

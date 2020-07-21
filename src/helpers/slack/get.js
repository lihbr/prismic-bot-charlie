/**
 * Import
 */
const qs = require("qs");
const fetch = require("isomorphic-unfetch");

const get = async (endpoint, body) => {
  return await fetch(
    `${process.env.SLACK_API}${endpoint}?${qs.stringify(body)}`,
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`
      },
      method: "GET"
    }
  );
};

/**
 * Export
 */
module.exports = get;

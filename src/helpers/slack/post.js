/**
 * Import
 */
const fetch = require("isomorphic-unfetch");

const post = async (endpoint, body) => {
  return await fetch(`${process.env.SLACK_API}${endpoint}`, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      authorization: `Bearer ${process.env.SLACK_BOT_OAUTH_TOKEN}`
    },
    method: "POST",
    body: JSON.stringify(body)
  });
};

/**
 * Export
 */
module.exports = post;

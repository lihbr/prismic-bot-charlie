/**
 * Import
 */
const fetch = require("isomorphic-unfetch");

const put = async (endpoint, body) => {
  return await fetch(`${process.env.MENTION_API}${endpoint}`, {
    headers: {
      "content-type": "application/json",
      "accept-version": "1.19",
      authorization: `Bearer ${process.env.MENTION_TOKEN}`
    },
    method: "PUT",
    body: JSON.stringify(body)
  });
};

/**
 * Export
 */
module.exports = put;

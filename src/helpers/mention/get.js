/**
 * Import
 */
const fetch = require("isomorphic-unfetch");

const get = async endpoint => {
  return await fetch(`${process.env.MENTION_API}${endpoint}`, {
    headers: {
      accept: "application/json",
      "accept-version": "1.19",
      authorization: `Bearer ${process.env.MENTION_TOKEN}`
    },
    method: "GET"
  });
};

/**
 * Export
 */
module.exports = get;

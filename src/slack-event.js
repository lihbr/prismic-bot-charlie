/**
 * Import
 */
require("dotenv").config();
const fetch = require("isomorphic-unfetch");

const request = require("./helpers/request");
const {
  raw: { json },
  formatted: { error },
  special: { empty }
} = require("./helpers/response");
const slack = require("./helpers/slack");

const mntn = require("./services/mntn");

const eventRouting = {
  reaction_added: mntn.handler.event
};

/**
 * Controller
 */
const ctrl = {
  POST: async event => {
    // If request is not from slack
    if (!slack.verify(event)) {
      return error({ status: 401 });
    }

    // Get body
    const body = slack.parseBody(event);

    // Return challenge is any
    if (body.challenge) {
      return json({ body: body.challenge });
    }

    await new Promise(res =>
      setTimeout(() => {
        res();
      }, 4000)
    );

    // Don't answer to Slack retry attempts
    if (
      event.headers["x-slack-retry-num"] &&
      parseInt(event.headers["x-slack-retry-num"]) > 0
    ) {
      return empty();
    }

    // Normalize body
    body._ctx = {
      user: {
        id: body.event.user
      }
    };

    const handler = eventRouting[body.event.type];

    if (handler) {
      handler(body);
    } else {
      console.error(`Event "${body.event.type}" not handled`);
    }

    return empty();
  }
};

/**
 * Export
 */
exports.handler = (event, context, callback) =>
  request.route(event, context, callback, ctrl);

const memoryCache = {};

const throttle = (event, namespace = "default", timeout = 60) => {
  if (!event.headers || !event.headers["client-ip"]) {
    throw { status: 400, msg: "client-ip header is undefined" };
  } else {
    const ip = event.headers["client-ip"];
    const now = Date.now();

    if (!memoryCache[namespace]) {
      memoryCache[namespace] = {};
    }

    if (
      memoryCache[namespace][ip] &&
      memoryCache[namespace][ip] > now - timeout * 1000
    ) {
      throw { status: 429, msg: "too many request" };
    }
    memoryCache[namespace][ip] = now;
  }
};

/**
 * Export
 */
module.exports = throttle;

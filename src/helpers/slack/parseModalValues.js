const parseModalValues = rawValues => {
  const values = {};

  for (const id in rawValues) {
    const rawValueGroup = rawValues[id];

    for (const key in rawValueGroup) {
      const rawValue = rawValueGroup[key];

      switch (rawValue.type) {
        case "plain_text_input":
          values[key] = rawValue.value;
          break;
        case "radio_buttons":
          values[key] = rawValue.selected_option.value;
          break;
        default:
          console.error(`Modal value type "${rawValue.type}" not handled`);
          break;
      }
    }
  }

  return values;
};

/**
 * Export
 */
module.exports = parseModalValues;

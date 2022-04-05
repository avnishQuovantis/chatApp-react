const moment = require('moment');

function formatMessage(username, id, content, type, mimetype) {
  if (type == "text") {

    return {
      username,
      type,
      id,
      content,
      time: moment().format('h:mm a')
    };
  } else {
    return {
      username,
      mimetype,
      type,
      id,
      content,
      time: moment().format('h:mm a')
    };

  }
}


module.exports = formatMessage;

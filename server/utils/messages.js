const moment = require('moment');

function formatMessage(username, id, content) {
  return {
    username,
    id,
    content,
    time: moment().format('h:mm a')
  };
}


module.exports = formatMessage;

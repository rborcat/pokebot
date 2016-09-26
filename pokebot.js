(function() {

  var bodyParser = require('body-parser');
  var express = require('express');

  var variables = require('./variables.js');
  var parseCommand = require('./commands/parseCommand.js');

  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());

  app.post('/trigger', function(slackRequest, slackResponse) {
    if (slackRequest.body.token === variables.SLACK_TOKEN) {
      var userCommand = slackRequest.body.text.substr(slackRequest.body.trigger_word.length).replace(/\s+/g, ' ').trim();
      parseCommand(function(response) {
        slackResponse.send('{"text": ' + JSON.stringify(response) + '}');
      }, userCommand);
    }
  });

  app.listen(8001, function () {
    console.log('pokebot app listening on port 8001!');
    console.log('variables: ' + JSON.stringify(variables));
  });

}());

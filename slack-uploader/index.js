const fs = require('fs');
const glob = require('glob');
const { WebClient } = require('@slack/client');

const token = process.env.SLACK_API_TOKEN;

const web = new WebClient(token);

const conversationId = process.env.SLACK_CONVERSATION_ID;

const commitSha = process.env.CI_COMMIT_SHA;
const commitMessage = process.env.CI_COMMIT_MESSAGE

glob('*.pdf', (err, filenames) => {
  filenames.forEach(filename => {
    web.files.upload({
      filename,
      file: fs.createReadStream(`${filename}`),
      channels: conversationId,
      initial_comment: `${commitMessage}\n${commitSha}`,
    });
  });
});

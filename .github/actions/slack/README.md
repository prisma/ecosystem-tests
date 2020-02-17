# Slack action

This is a internal GitHub action to post test runs in our internal Slack.

## Usage

Modify index.js, then run `npm run build` and commit and push `dist/index.js`.

### Why do we commit dist/index.js?

[GitHub requires it](https://help.github.com/en/actions/building-actions/creating-a-javascript-action) for Javascript Actions.

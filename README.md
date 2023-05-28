# Google Calendar Addons

Google Calendar Addons

Node version: v16.17.0

## Running on Google App Scripts

Define the corresponding properties before running (see https://developers.google.com/apps-script/reference/properties?hl=en)
Before uploading code to Google Apps Script remove or comment out all `imports ...` and before running any function remove `Test.gs` and `test/test.gs`

## Testing

1. Set the following configuration in `.vscode/launch.json`:
  ```json
  {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node-terminal",
        "name": "Debug Current TS File (ts-node)",
        "request": "launch",
        "command": "npx ts-node -- ${fileBasenameNoExtension}",
        "cwd": "${fileDirname}"
      },
    ]
  }
  ```
3. Copy all functions to `Test.ts`
4. Go to "Run and Debug" in Visual Code


Other way to test code is with mocha:

```shell
npm run test
```

## Common issues

```shell
ENOENT: no such file or directory, open '~/git/google-calendar-addons/appsscript.json'
```

after executing `clasp push`, set the corresponding directory path for `rootDir` in `.clasp.json`

## Future improvements

- Use script properties for constants.

## Useful links about Google Calendar

- Google Calendar API overview: https://developers.google.com/calendar/api/guides/overview
- Synchronize resources efficiently: https://developers.google.com/calendar/api/guides/sync
- Playing with Google Calendar and Apps Script: https://gist.github.com/brunopk/84340d51387a04ade57d484fc0b7e886
- React on Google Calendar change with Apps Script and EventUpdated trigger: https://medium.com/@stephane.giron/react-on-google-calendar-change-with-apps-script-and-eventupdated-trigger-2d092547ab17

## Useful links about Google Tasks

- Google Tasks API: https://developers.google.com/tasks/reference/rest

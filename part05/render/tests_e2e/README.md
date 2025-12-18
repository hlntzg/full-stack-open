frontend: `npm run dev`
backend: `npm run start:test`
tests_e2e:

tests are started in UI mode as follows:
- `npm test -- --ui`

run a specific browser testing:
- `npm test -- --project chromium`

run a specific test in debug mode:
`npm test -- -g'one of those can be made nonimportant' --debug`

run Playwright's Trace Viewe:
`npm run test -- --trace on`

Trace can be viewed with the command:
`npx playwright show-report` or with the npm script we defined `npm run test:report`

# full-stack-open

- npm: tool used for managing JavaScript packages
- React applications: `create vite@latest -- --template react`
- Backend exercises: `npm init`, `npm install express` (library)
- Build the backend on top of NodeJS, which is a JavaScript runtime based on Google's Chrome V8 JavaScript engine
- Interactive node-repl: https://nodejs.org/docs/latest-v18.x/api/repl.html

### json-server
- `json-server` is a mock REST API server built with Node.js
- It allows you to create a fake backend quickly using just a `db.json` file.
Use case: Quick API mocking, demos, front-end development without backend

### Node.js
- `Node.js` is a JavaScript runtime (built on Chrome’s V8 engine)
- It allows you to run JavaScript on the server side
- Libraries to ease server-side development with Node: ExpressJS (most popular), NestJS
Use case: Real applications, production APIs, complex logic, integrations


### REST
Representational State Transfer, aka REST
Operations on resources: 
- GET: fetch a single or all resources
- POST: creates a new resource based on the request data
- DELETE: removes
- PUT: replaces the entire identified resource with the request data
- PATCH: replaces a part of the identified resource with the request data
Properties related to request types:
- GET, HEAD: safety
- All requests except POST: idempotency

## Testing backend
- Command line program `curl`
- Postman: [Postman Desktop](https://www.postman.com/), also on VS Code extension
- VS Code [REST Client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client): `requests/file.rest` with REST client requests; by clicking `Send Request` text, the REST client will execute the HTTP request and the response from the server is opened in the editor. [instructions documentation](https://github.com/Huachao/vscode-restclient/blob/master/README.md#usage)
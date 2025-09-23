Getting data from server:
Data fetched from the server using the axios-library
1. Create a file named db.json in the root directory
2. `npx json-server --port 3001 db.json`
3. `npm install axios`
4. `npm install json-server --save-dev`
5.  Make addition to the scripts part of the package.json file: `"server": "json-server -p 3001 db.json"`
6. Finally, run `npm run server`
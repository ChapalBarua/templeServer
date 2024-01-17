This is the backend application for website https://www.bso-toronto.ca/. It serves the endpoint for the UI and connects to database (MongoDb) to store and query data. It runs on Node.js. To run the application locally follow the
steps below :
1. Install Node.js in your local machine (v16.16.0).
2. Install and run MongoDb. Make sure it uses port 27017.
3. Fork and clone this repository. Then run npm install.
4. Update helpers/constants.js to make the constants point to your machine and create the directories accordingly.
5. In server.js update 'options' -
  var options = {
    key: fs.readFileSync('certs/cert.key'),
    cert: fs.readFileSync('certs/cert.crt')
  };
6. Run 'npm start' inside the repo. It should start using port 3000.

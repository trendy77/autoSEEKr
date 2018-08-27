const path = require("path");
/* Express stuff */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const isConnectionError = require('./modules/isconnectionerror');
const commandLineArgs = require("command-line-args");

const globals = require('../config/globals');
const core = require('./core');

/* Local stuff */
const router = require('./routes/index');

var app = express();

globals.args = commandLineArgs([
  {name: "clear", type: Boolean}
]);
const port = globals.port;

app.set('view engine', 'ejs');
/* Needed because of packager, wouldn't find the views directory otherwise */
app.set('views', path.join(__dirname, '../', 'views'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

for (let middleware of require("./modules/middlewares")) {
  app.use(middleware);
}

app.use("/", express.static(path.join(__dirname, "..", 'public')));
app.use("/", router);

console.log(path.join(__dirname, "..", 'public'));

async function listen() {
  try {
    let promise = new Promise(resolve => {
      app.listen(port, 'localhost', () => {resolve();});
    });

    await promise;

    console.log("app started on port", port);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

async function launch() {
  await core.launch();
}

listen();

/* Handle error */
process.on('unhandledRejection', async (error) => {
  //Will print "unhandledRejection err is not defined"
  console.error('Unhandled rejection', error.message);

  if (isConnectionError(error)) {
    globals.updateConnectivity(false);

    if (error.syncObject && error.watcher) {
      let {syncObject} = error;
      console.log("Connection error when watching changes, restarting in 10 seconds");
      setTimeout(() => syncObject.load(), 10000);
    }
  }

  //Too much logging
  if ("syncObject" in error) {
    delete error["syncObject"];
  }
  console.error(error);
});

process.on('uncaughtException', error => {
  console.error('Uncaught exception', error.errno);

  if(error.errno === 'EADDRINUSE') {
    console.error('Make sure that another instance of autoSEEKr is not running.');
    return process.exit(1);
  }

  if (isConnectionError(error)) {
    globals.updateConnectivity(false);

    if (error.syncObject && error.watcher) {
      let {syncObject} = error;
      console.log("Connection error when watching changes, restarting in 10 seconds");
      setTimeout(() => syncObject.load(), 10000);
    }
  }

  //Too much logging
  if ("syncObject" in error) {
    delete error["syncObject"];
  }
  console.error(error);
});

module.exports = {
  port,
  launch
};

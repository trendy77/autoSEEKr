const {app, BrowserWindow, Tray, Menu} = require('electron');
const url = require('url');
const notifier = require('node-notifier');
const path = require("path");

const gbs = require('./config/globals');
const core = require('./app/core');
const AutoLaunch = require('auto-launch');
const os = require('os');

//Actual backend
const backend = require('./app/backend');

const autolauncher = new AutoLaunch({name: "autoSEEKr"});

autolauncher.isEnabled().then(
  val => gbs.autorun = val,
  err => console.error("Error when checking auto launch", err)
);

const logo = path.join(__dirname, 'public', 'images', 'logo.png');
const logoGrey = path.join(__dirname, 'public', 'images', 'logo-grey.png');
const logoSync = path.join(__dirname, 'public', 'images', 'logo-sync.png');

function createWindow () {
  // Create the browser window.
  gbs.win = new BrowserWindow({
    width: 650,
    height: os.platform() === "win32" ? 260 : 250,
    icon: logo,
    webPreferences: {
    },
    'use-content-size': true
  });


  // and load the index.html of the app.
  gbs.win.loadURL(url.format({
    pathname: "autoseekr.io/",
    protocol: 'http:',
    slashes: true
  }));

  // Emitted when the window is closed.
  gbs.win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    gbs.win = null;
  });
}

function generateTrayMenu() {
  if (!gbs.tray) {
    return;
  }

  gbs.trayMenu = Menu.buildFromTemplate([
    {
      label: 'Preferences...',
      click () {
        if (gbs.win === null) {
          createWindow();
        }
      }
    },
    {
      label: 'Launch on startup',
      click() {
        if (gbs.autorun) {
          autolauncher.disable().then(gbs.autorun = false).catch(err => console.error("Error when disabling auto launch", err));
        } else {
          autolauncher.enable().then(gbs.autorun = true).catch(err => console.error("Error when enabling auto launch", err));
        }
      },
      type: 'checkbox',
      checked: gbs.autorun
    },
    {type: 'separator'},
    {
      label: 'Quit autoSEEKr',
      click () {process.exit(0);}
    }
  ]);
  gbs.tray.setContextMenu(gbs.trayMenu);
}

function generateTray() {
  gbs.tray = new Tray(logo);

  generateTrayMenu();
}

async function launch() {
  generateTray();

  gbs.on("updateAutorun", generateTrayMenu);

  await backend.launch();

  /* Only display settings on launch if no account already set up */
  let accounts = await core.accounts();
  if (accounts.length == 0) {
    createWindow();
  }

  core.on("notification", (text) => {
    notifier.notify({
      title: "ODrive",
      message: text
    });
  });

  //In case of connection error before even watching for it
  updateTrayIcon();
  gbs.on("connectivity", () => {
    updateTrayIcon();
  });
  gbs.on("syncing", () => {
    updateTrayIcon();
  });
}

function updateTrayIcon() {
  console.log("Updating tray icon, connected: ", gbs.connected, "syncing: ", gbs.syncing);
  let path = gbs.connected ? (gbs.syncing ? logoSync : logo) : logoGrey;
  gbs.tray.setImage(path);
}

app.commandLine.appendSwitch('host-rules', `MAP autoseekr.io 127.0.0.1:${backend.port}`);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', launch);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  // app.quit();
  // }
  /* To quit, need to quit on the tray icon */
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (gbs.win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

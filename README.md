### autoSEEKr

## Automated Job Applications Extension

**Clone and run for a quick way to see autoSEEKr in action.**

This is a GUI client based on ODrive, itself a GUI client based on the Google
Drive on linux application at https://electron.atom.io/.

## Supported Operating Systems

- Linux (most distros)
- macOS 10.9 and later
- Microsoft Windows 7 and later

## To Use

This is based on a sample Google Chrome extension [that can be found here (
)]which demonstrates using the Chrome Identity API to authorize access to use
the Google Apps Script Execution API. If you are not familiar with these
services here:

- [Getting started with Chrome Extensions](https://developer.chrome.com/extensions/getstarted)
- [The Chrome Identity API](https://developer.chrome.com/apps/app_identity)
- [Google Apps Script Execution API](https://developers.google.com/apps-script/guides/rest/)

## Electron

## Notes on setting up API

For notes on setup and usage
[read this blog post](https://mashe.hawksey.info/?p=17506)

## Acknowledgements

This project is based on:

- [Identity example in Chrome Apps Samples](https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/identity)
- [GDE Sample: Chrome extension Google APIs by Abraham's](https://github.com/GoogleDeveloperExperts/chrome-extension-google-apis)

To clone and run this repository you'll need [Git](https://git-scm.com) and
[Node.js](https://nodejs.org/en/download/) (which comes with
[npm](http://npmjs.com)) installed on your computer.

The first thing you need is the source code, in your command line:

```bash
# Clone this repository
git clone https://github.com/trendy77/autoSEEKr
```

This will download all the source code in a "autoSEEKr" folder in the current
directory. Alternatively, you can download and extract the zip from github's
interface.

The steps below (Setup, Build, Run) are to execute in order to ready everything.

## Setup

This step is only needed once, in order to install the necessary environment on
your computer for ODrive to run.

```bash
# Needed for electron 1.7+ to run, as it's based on chrome
sudo apt install libgconf-2-4
```

Note: If you're using Linux Bash for Windows,
[see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/)
or use `node` from the command prompt.

## Build

This step is to execute every new version of the source code.

In the project directory:

```bash
npm install
```

Note: If you're using Ubuntu and you get an error message about a missing node
binary, you may want to try
[this](https://stackoverflow.com/questions/18130164/nodejs-vs-node-on-ubuntu-12-04):

`` sudo ln -s `which nodejs` /usr/bin/node ``

If you are working on the code yourself and editing some files in `app/assets/`,
you will need to run `npm run webpack` (or `npm install`) for those changes to
have an impact on the application.

## Run

In the project directory:

```bash
npm start
```

On Windows, you can make a `.bat` file with `start cmd /k nmp start` that then
you can double click to launch the program.

The launch-on-startup functionality is only available on bundled releases. See
the **Deployment** section.

## Testing

To make sure the code is ok and run some sanity checks on it:

```bash
npm test
```

## Deployment

### Releases

There are currently three "release" formats supported: nsis (Windows installer)
for Windows, AppImage for Linux, and DMG for Mac. You can generate them like
this:

```bash
npm run release-windows
npm run release-linux
npm run release-mac
```

To create a different format, like a deb or rpm package for example:

```bash
npm run release-linux deb
npm run release-linux rpm
```

The releases are generated in the `dist` folder.

All formats supported by
[electron-builder](https://github.com/electron-userland/electron-builder) are
available, such as 7z, zip, tar.gz, deb, rpm, freebsd, pacman, p5p, apk, dmg,
pkg, mas, nsis, appx, msi...

### Permissionless deployment

An appimage on linux already runs permissionless. Anyway, you can just do:

```bash
# Permissonless deployment
npm run release-windows dir # or zip, 7zip, tar.xz, tar.7z, ...
```

This will create a folder in `dist` that you can just copy to a Windows machine.

## License

[GPL v3](LICENSE.md)

const { app, BrowserWindow, autoUpdater, ipcMain, dialog } = require("electron")
const path = require("path")
const url = require("url")
const dotenv = require("dotenv")

const { platform, env } = process

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Keep a timestamp of when the last update occured
let lastUpdateAttemptAt

// import configuration from .env file
dotenv.config()

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 400, height: 700 })
  // win.setMenu(null)

  if (env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  // Load the login page by default.
  win.loadURL(`file://${__dirname}/src/page/login/login.html`)

  // Load the login page when user is unauthenticated.
  ipcMain.on("unauthenticated", (event) => {
    win.loadURL(`file://${__dirname}/src/page/login/login.html`)
    // win.unmaximize()
    win.setSize(400,700)
    win.center()
  })

  // Load our app when user is authenticated.
  ipcMain.on("authenticated", async event => {
    win.loadURL(`file://${__dirname}/src/page/dashboard/dashboard.html`)
    // win.maximize()
    win.setSize(1000,750)
    win.center()


    if (env.NODE_ENV === 'development') {
      return // Skip updates on development env
    }

    autoUpdater.on('error', err => win.webContents.send('error', err))
    autoUpdater.on('checking-for-update', () => win.webContents.send('log', 'checking-for-update', autoUpdater.getFeedURL()))
    autoUpdater.on('update-available', () => win.webContents.send('log', 'update-available', autoUpdater.getFeedURL()))
    autoUpdater.on('update-not-available', () => win.webContents.send('log', 'update-not-available', autoUpdater.getFeedURL()))
    autoUpdater.on('update-downloaded', (...args) => {
      win.webContents.send('log', 'update-downloaded', autoUpdater.getFeedURL(), args)

      const choice = dialog.showMessageBox(win, {
        message: 'An update has been downloaded. Do you want to restart now to finish installing it?',
        title: 'Update is ready',
        type: 'question',
        buttons: [
          'Yes',
          'No'
        ]
      })

      if (choice === 0) {
        autoUpdater.quitAndInstall()
      }
    })

    autoUpdater.checkForUpdates()
  })

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

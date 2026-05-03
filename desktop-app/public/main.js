const {
  app,
  BrowserWindow,
  Notification,
  ipcMain,
  shell,
  dialog,
} = require("electron");
const isDev = require("electron-is-dev");
const https = require("https");
const path = require("path");
const os = require("os");
const desktopPath = path.join(os.homedir(), "Desktop");
const folderName = "Exhub";

let content;
let splash;
let win;

function createSplash() {
  splash = new BrowserWindow({
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadURL(
    isDev
      ? `file://${path.join(__dirname, "../public/splash.html")}`
      : `file://${path.join(__dirname, "../build/splash.html")}`
  );
  splash.center();
  splash.show();
}

function createWindow() {
  win = new BrowserWindow({
    transparent: true,
    width: 930,
    height: 800,
    resizable: isDev ? true : false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  content = win.webContents;
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.webContents.on("did-finish-load", () => {
    splash.destroy();
    win.show();
  });
}

app.whenReady().then(() => {
  createSplash();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("closeApp", () => {
  app.quit();
});

ipcMain.handle("showSuccess", (_, body) => {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: body,
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
});

ipcMain.handle("showError", (_, body) => {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: body,
    icon: path.join(__dirname, "failure-icon.png"),
  }).show();
});

const options = {
  method: "GET",
  protocol: "https:",
  hostname: "api.ghaderi-ex.ir",
  // port: 4000,
  path: "/",
  headers: {
    "Content-type": "application/json",
    appversion: "1",
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode appversion : ${res.statusCode}`);
  if (res.statusCode == 403) {
    return ipcMain.emit("showExpired");
  }
  if (res.statusCode == 405) {
    return ipcMain.emit("Force");
  }
});

req.on("error", (error) => {
  console.error("err", error);
});

req.end();

ipcMain.on("Force", (_, body) => {
  dialog
    .showMessageBox(win, {
      type: "question",
      message: "دانلود نسخه جدید",
      buttons: ["به روز رسانی", "بستن برنامه"],
      defaultId: 1,
      cancelId: 1,
      icon: path.join(__dirname, "expired.png"),
      title: "New Version",
    })
    .then((result) => {
      if (result.response === 0) {
        shell.openExternal(
          path.join(desktopPath, folderName, "AutoUpdater.exe")
        );
        win.destroy();
      }
      if (result.response === 1) {
        win.destroy();
      }
    });
});

ipcMain.on("showExpired", (_, body) => {
  dialog
    .showMessageBox(win, {
      type: "question",
      message: "مایل به دانلود نسخه جدید  هستید ؟",
      buttons: ["بله", "خیر"],
      defaultId: 1,
      cancelId: 1,
      icon: path.join(__dirname, "new.png"),
      title: "New Version",
      // detail: 'نسخه جدید یافت شد ...'
    })
    .then((result) => {
      if (result.response === 0) {
        shell.openExternal(
          path.join(desktopPath, folderName, "AutoUpdater.exe")
        );
        win.destroy();
      }
      if (result.response === 1) {
        const options = {
          method: "GET",
          protocol: "https:",
          hostname: "api.ghaderi-ex.ir",
          // port: 4000,
          path: "/",
        };

        const req = https.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`);
        });

        req.on("error", (error) => {
          console.error(error);
        });

        req.end();
      }
    });
});

ipcMain.handle("reloadApp", () => {
  content.reload();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

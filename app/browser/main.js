import app from "app";
import BrowserWindow from "browser-window";

let mainWindow = null;
var Menu = require("menu");

const launchMainWindow = () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.maximize();
  mainWindow.loadUrl(`file://${__dirname}/../client/index.html`);
  // mainWindow.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
  // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}, {
        label: "View",
        submenu: [
            { label: "Reload", accelerator: "CmdOrCtrl+R", click: function() { mainWindow.reload(); }},
            { label: "Toogle Full Screen", accelerator: "Ctrl+CmdOrCtrl+F", selector: "toggleFullScreen:" },
            { label: "Toggle Developer Tools", accelerator: "Alt+CmdOrCtrl+I", click: function() { mainWindow.toggleDevTools(); } }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

app.on('window-all-closed', () => app.quit());
app.on('ready', launchMainWindow);

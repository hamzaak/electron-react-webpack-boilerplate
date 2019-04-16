const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev');

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: `${__dirname}/assets/app.ico`,
        show: false
    })

    if (isDev) {
        win.loadURL('http://localhost:8082/')
    } else {
        win.loadURL(`file://${__dirname}/index.html`)
    }

    // Open the DevTools.
    win.webContents.openDevTools()

    //wait until webpack build html page
    win.webContents.on('did-finish-load', () => {
        win.show()
        win.focus()
    });

    // Emitted when the window is closed.
    win.on('closed', function () {
        if (process.platform !== 'darwin') {
            app.quit()
        }
        win = null
    });

    if (isDev) {
        const { REACT_DEVELOPER_TOOLS, default: installExtension } = require('electron-devtools-installer');
        installExtension(REACT_DEVELOPER_TOOLS).then(() => {
            win.webContents.openDevTools();
        });
    }
}

app.on('ready', createWindow)



// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

ipcMain.on('get-result', (event, arg) => {
    event.returnValue = `electron-${arg.name}`;
})
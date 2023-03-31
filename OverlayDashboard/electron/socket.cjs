const { app, BrowserWindow, ipcMain } = require("electron");
const { join } = require('path');
const WebSocketServer = require("ws");
function main() {
    const window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload: join(__dirname,"./preload.js")
        }
    })

    window.loadFile('build/index.html');
    // window.loadURL('http://localhost:5173');
    window.on("ready-to-show",window.show);
    window.webContents.openDevTools();    
}

app.whenReady().then(main);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

let scorebug = {};
let teams = {};


const wss = new WebSocketServer.Server( {port:49123} )

wss.on("connection", ws => {
    console.log("Connected to dashboard");

    ipcMain.on("update_teams", (event,args)=>{
        console.log(teams);
        teams = args;
        ws.send(JSON.stringify({
            event : 'update_teams',
            data: teams, 
        }));
    })
    
    ipcMain.on("reset_teams", (event,args)=>{
        console.log(teams);
        teams = args;
        ws.send(JSON.stringify({
            event : 'update_teams',
            data: teams, 
        }));
    })
    
    ipcMain.on("update_scorebug", (event,args)=>{
        console.log(scorebug);
        scorebug = args;
        ws.send(JSON.stringify({
            event : 'update_scorebug',
            data: scorebug, 
        }));
    })
    
    ipcMain.on("reset_scorebug", (event,args)=>{
        console.log(scorebug);
        scorebug = args; 
        ws.send(JSON.stringify({
            event : 'update_scorebug',
            data: scorebug, 
        }));
    })
    
    ws.on("close", data => {
        console.log("Overlay has disconnected");
    })

    ws.onerror = (err) => {
        console.error("WebSocket error", err);
    }
});


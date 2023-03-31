const { ipcRenderer, contextBridge } = require("electron");

const WINDOW_API = {
    update_teams: (message) => ipcRenderer.send("update_teams", message),
    reset_teams: (message) => ipcRenderer.send("reset_teams", message),
    update_scorebug: (message) => ipcRenderer.send("update_scorebug", message),
    reset_scorebug: (message) => ipcRenderer.send("reset_scorebug", message)

}

contextBridge.exposeInMainWorld("api", WINDOW_API);
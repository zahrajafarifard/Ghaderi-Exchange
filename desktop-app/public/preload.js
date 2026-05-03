const { ipcRenderer } = require("electron");

window.Notification = {
  showError: (body) => {
    ipcRenderer.invoke("showError", body);
  },
  showSuccess: (body) => {
    ipcRenderer.invoke("showSuccess", body);
  },
  
};

window.closeApp = {
  closeApplication: () => {
    ipcRenderer.invoke("closeApp");
  },
};

window.reloadApp = {
  reloadApplication: () => {
    ipcRenderer.invoke("reloadApp");
  },
};

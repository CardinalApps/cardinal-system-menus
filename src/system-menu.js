const { Menu } = require('electron')
const desktopServerMenu = require('./desktop-server-menu.js')
//const desktopMusicMenu = require('./desktop-music-menu.js')

/**
 * Sets and/or switches the current system menu. Automatically detects the
 * operating system.
 * 
 * @param {string} hydraApp - "server" | "music"
 * @param {BrowserWindow} browserWindow
 * @param {string} lang
 */
exports.set = (hydraApp, browserWindow, lang) => {
  let menuObject

  switch (hydraApp) {
    case 'server':
      menuObject = desktopServerMenu.get(browserWindow, lang)
      break

    // case 'music':
    //   menuObject = desktopMusicMenu.get(browserWindow, lang)
    //   break
  }

  let appMenu = new Menu.buildFromTemplate(menuObject)
  Menu.setApplicationMenu(appMenu)
}
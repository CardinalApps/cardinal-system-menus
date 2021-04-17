const { shell } = require('electron')
const i18n = require('hydra-i18n')
const { updater } = require('hydra-updater')

/**
 * Returns all possible menu items that can be used in system menus.
 * 
 * **Only use items with "role" on macOS.** On win32, Echoes uses a custom
 * menu that doesn't support "roles". Linux TBD.
 * 
 * Note: macOS ignores the "visible" property for menu items that use the "role" property.
 * 
 * @param {BrowserWindow} browserWindow - The BrowserWindow instance that this
 * menu will control.
 * @param {string} lang - Lang slug is required.
 */
exports.getItems = (browserWindow, lang) => {
  if (!lang) throw new Error('Lang slug is required.')

  function announce(announcement) {
    // only send announcements if the user has the UI open
    if (!browserWindow) return

    browserWindow.webContents.send('announcements', announcement)
  }

  return {
    'sep': {
      'type': 'separator'
    },
    'about': {
      'id': 'about',
      'label': i18n.string('system-menu.about', lang),
      'click': () => {
        announce({'action': 'show-about'})
      }
    },
    'settings': {
      'id': 'settings',
      'label': i18n.string('system-menu.settings', lang),
      'accelerator': 'CmdOrCtrl+,',
      'win32-accelerator-label': 'Ctrl+,',
      'click': () => {
        announce({'action': 'openSettings'})
      }
    },
    'check-for-updates': {
      'id': 'check-for-updates',
      'label': i18n.string('system-menu.check-for-updates', lang),
      'click': async () => {
        console.log('Checking for update (manually triggered)')

        // this will automatically create dialog box(s) for the user
        await updater.checkForUpdates()
      }
    },
    'darwin:hide': {
      'id': 'hide',
      'role': 'hide',
      'label': i18n.string('system-menu.macos.hide', lang)
    },
    'darwin:hide-others': {
      'role': 'hideothers'
    },
    'darwin:unhide': {
      'id': 'hide',
      'role': 'unhide',
      'label': i18n.string('system-menu.macos.unhide', lang)
    },
    'close': {
      'id': 'close',
      'accelerator': 'CmdOrCtrl+W',
      'win32-accelerator-label': 'Ctrl+W',
      'label': i18n.string('system-menu.close-window', lang),
      'click': () => {
        browserWindow.close()
      }
    },
    'quit': {
      'id': 'quit',
      'accelerator': 'CmdOrCtrl+q',
      'win32-accelerator-label': 'Ctrl+Q',
      'label': i18n.string('system-menu.quit', lang),
      'click': () => {
        browserWindow.quit()
      }
    },
    // will capture back/forward for users that use bettertouchtool to remap mb4 and mb5 to cmd+[ and cmd+]
    'back': {
      'id': 'back',
      'label': i18n.string('system-menu.back', lang),
      'accelerator': 'CmdOrCtrl+[',
      'win32-accelerator-label': 'Ctrl+[',
      'click': () => {
        announce({'action': 'back', lang})
      }
    },
    'forward': {
      'id': 'forward',
      'label': i18n.string('system-menu.forward', lang),
      'accelerator': 'CmdOrCtrl+]',
      'win32-accelerator-label': 'Ctrl+,[',
      'click': () => {
        announce({'action': 'forward'})
      }
    },
    'cut': {
      'id': 'cut',
      'role': 'cut',
      'win32-accelerator-label': 'Ctrl+X',
      'label': i18n.string('system-menu.cut', lang),
      'visible': false
    },
    'copy': {
      'id': 'copy',
      'role': 'copy',
      'win32-accelerator-label': 'Ctrl+C',
      'label': i18n.string('system-menu.copy', lang),
      'visible': false
    },
    'paste': {
      'id': 'paste',
      'role': 'paste',
      'win32-accelerator-label': 'Ctrl+V',
      'label': i18n.string('system-menu.paste', lang),
      'visible': false
    },
    'selectAll': {
      'id': 'selectAll',
      'role': 'selectAll',
      'win32-accelerator-label': 'Ctrl+A',
      'label': i18n.string('system-menu.select-all', lang),
      'visible': false
    },
    'zoomIn': {
      'id': 'zoomIn',
      'accelerator': 'CmdOrCtrl+=',
      'win32-accelerator-label': 'Ctrl+=',
      'label': i18n.string('system-menu.zoom-in', lang),
      'click': () => {
        announce({'action': 'zoom-in'})
      }
    },
    'zoomOut': {
      'id': 'zoomOut',
      'accelerator': 'CmdOrCtrl+-',
      'win32-accelerator-label': 'Ctrl+-',
      'label': i18n.string('system-menu.zoom-out', lang),
      'click': () => {
        announce({'action': 'zoom-out'})
      }
    },
    'resetZoom': {
      'id': 'resetZoom',
      'accelerator': 'CmdOrCtrl+0',
      'win32-accelerator-label': 'Ctrl+0',
      'label': i18n.string('system-menu.reset-zoom', lang),
      'click': () => {
        announce({'action': 'reset-zoom'})
      }
    },
    'toggleQueue': {
      'id': 'toggleQueue',
      'label': i18n.string('system-menu.toggle-queue', lang),
      'accelerator': 'CmdOrCtrl+/',
      'win32-accelerator-label': 'Ctrl+/',
      'click': () => {
        announce({'action': 'togglequeue'})
      }
    },
    'toggleDevTools': {
      'id': 'toggleDevTools',
      'accelerator': 'CmdOrCtrl+Alt+I',
      'win32-accelerator-label': 'Ctrl+Alt+I',
      'label': i18n.string('system-menu.toggle-dev-tools', lang),
      'click': () => {
        browserWindow.webContents.openDevTools()
      }
    },
    'toggleFullScreen': {
      'id': 'toggleFullScreen',
      'label': i18n.string('system-menu.full-screen', lang),
      'click': () => {
        if (browserWindow.isFullScreen()) {
          browserWindow.setFullScreen(false)
        } else {
          browserWindow.setFullScreen(true)
        }
      }
    },
    'play': {
      'id': 'play',
      'label': i18n.string('system-menu.play', lang),
      'accelerator': 'Shift+Up',
      'click': () => {
        announce({'action': 'play'})
      }
    },
    'pause': {
      'id': 'pause',
      'label': i18n.string('system-menu.pause', lang),
      'accelerator': 'Shift+Down',
      'click': () => {
        announce({'action': 'pause'})
      }
    },
    'stop': {
      'id': 'stop',
      'label': i18n.string('system-menu.stop', lang),
      'accelerator': 'Shift+Backspace',
      'click': () => {
        announce({'action': 'stop'})
      }
    },
    'previous': {
      'id': 'previous',
      'label': i18n.string('system-menu.previous', lang),
      'accelerator': 'Shift+Left',
      'click': () => {
        announce({'action': 'previous'})
      }
    },
    'next': {
      'id': 'next',
      'label': i18n.string('system-menu.next', lang),
      'accelerator': 'Shift+Right',
      'click': () => {
        announce({'action': 'next'})
      }
    },
    // currently not being used; it has weird behaviour
    'reload': {
      'id': 'reload',
      'role': 'reload',
      'win32-accelerator-label': 'Ctrl+R',
      'label': i18n.string('system-menu.reload', lang),
    },
    'minimize': {
      'id': 'minimize',
      'role': 'minimize',
      'label': i18n.string('system-menu.minimize', lang)
    },
    'darwin:front': {
      'role': 'front',
      'label': i18n.string('system-menu.front', lang),
    },
    'darwin:window': {
      'role': 'window',
      'label': i18n.string('system-menu.window', lang),
    },
    'modal:welcome': {
      'id': 'showWelcome',
      'label': i18n.string('system-menu.show-welcome', lang), 
      'click': () => {
        announce({'action': 'show-welcome'})
      }
    },
    'modal:learnMore': {
      'id': 'showLearnMore',
      'label': i18n.string('system-menu.learn-more', lang),
      'click': async () => {
        await shell.openExternal(process.env.HYDRA_HOMEPAGE)
      }
    },
    'modal:tac': {
      'id': 'showTac',
      'label': i18n.string('system-menu.terms-and-conditions', lang),
      'click': async () => {
        await shell.openExternal(`${process.env.HYDRA_HOMEPAGE}/en/terms-and-conditions`)
      }
    },
    'modal:pp': {
      'id': 'showPp',
      'label': i18n.string('system-menu.privacy-policy', lang),
      'click': async () => {
        await shell.openExternal(`${process.env.HYDRA_HOMEPAGE}/en/privacy-policy`)
      }
    },
    'modal:attributions': {
      'id': 'showAttributions',
      'label': i18n.string('system-menu.attributions', lang), 
      'click': () => {
        announce({'action': 'show-attributions'})
      }
    }
  }
}
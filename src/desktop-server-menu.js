const { app } = require('electron')
const i18n = require('hydra-i18n')
const systemMenuItems = require('./items.js')

/**
 * Get the system menu for the desktop server app.
 * 
 * @param {BrowserWindow} browserWindow - The BrowserWindow instance that this
 * menu will control.
 * @param {string} lang - Lang slug is required.
 * @returns {(object|null)} Returns an object that can be given to the Electron
 * menu module, or null if no menu exists for this platform.
 */
exports.get = (browserWindow, lang) => {
  let platforms = {}

  let menuItems = systemMenuItems.getItems(browserWindow, lang)

  platforms.win32 = [
    // "File"
    {
      'label': i18n.string('system-menu.top-level.file', lang),
      'submenu': [
        {...menuItems['check-for-updates']},
        {...menuItems['sep']},
        {...menuItems['settings']},
        {...menuItems['sep']},
        {...menuItems['back']},
        {...menuItems['forward']},
        {...menuItems['sep']},
        {...menuItems['cut']},
        {...menuItems['copy']},
        {...menuItems['paste']},
        {...menuItems['selectAll']},
        {...menuItems['quit']}
      ]
    },
    // "Playback"
    {
      'label': i18n.string('system-menu.top-level.playback', lang),
      'submenu': [
        {...menuItems['play']},
        {...menuItems['pause']},
        {...menuItems['stop']},
        {...menuItems['sep']},
        {...menuItems['previous']},
        {...menuItems['next']},
      ]
    },
    // "View"
    {
      'label': i18n.string('system-menu.top-level.view', lang),
      'submenu': [
        {...menuItems['zoomIn']},
        {...menuItems['zoomOut']},
        {...menuItems['resetZoom']},
        {...menuItems['sep']},
        {...menuItems['toggleQueue']},
        {...menuItems['sep']},
        {...menuItems['toggleDevTools']},
        {...menuItems['sep']},
        {...menuItems['toggleFullScreen']},
      ]
    },
    // "Help"
    {
      'label': i18n.string('system-menu.top-level.help', lang),
      'submenu': [
        {...menuItems['about']},
        {...menuItems['sep']},
        {...menuItems['modal:welcome']},
        {...menuItems['modal:learnMore']},
        {...menuItems['modal:attributions']},
        {...menuItems['sep']},
        {...menuItems['modal:tac']},
        {...menuItems['modal:pp']},
      ]
    }
  ]

  platforms.darwin = [
    // "Cardinal"
    {
      'label': app.name,
      'submenu': [
        {...menuItems['about']},
        {...menuItems['sep']},
        {...menuItems['settings']},
        {...menuItems['sep']},
        {...menuItems['check-for-updates']},
        {...menuItems['sep']},
        {...menuItems['darwin:hide']},
        {...menuItems['darwin:hide-others']},
        {...menuItems['darwin:unhide']},
        {...menuItems['sep']},
        {...menuItems['close']},
        {...menuItems['quit']}
      ]
    },
    // "File"
    {
      'label': i18n.string('system-menu.top-level.file', lang),
      'submenu': [
        {...menuItems['back']},
        {...menuItems['forward']},
        {...menuItems['sep']},
        {...menuItems['cut']},
        {...menuItems['copy']},
        {...menuItems['paste']},
        {...menuItems['selectAll']},
        {...menuItems['sep']},
        {...menuItems['close']},
      ]
    },
    // "View"
    {
      'label': i18n.string('system-menu.top-level.view', lang),
      'submenu': [
        {...menuItems['zoomIn']},
        {...menuItems['zoomOut']},
        {...menuItems['resetZoom']},
        {...menuItems['sep']},
        {...menuItems['toggleQueue']},
        {...menuItems['sep']},
        {...menuItems['toggleDevTools']},
        {...menuItems['sep']}
      ]
    },
    // "Window"
    {
      'label': i18n.string('system-menu.top-level.window', lang),
      'submenu': [
        {...menuItems['minimize']},
        {...menuItems['darwin:front']},
        {...menuItems['sep']},
        {...menuItems['darwin:window']}
      ]
    },
    // "Help"
    {
      'role': 'help',
      'submenu': [
        {...menuItems['modal:attributions']},
        {...menuItems['sep']},
        {...menuItems['modal:tac']},
        {...menuItems['modal:pp']},
      ]
    }
  ]

  if (process.platform in platforms) {
    return platforms[process.platform]
  } else {
    console.log('No system menu for this platform')
    return null
  }
}
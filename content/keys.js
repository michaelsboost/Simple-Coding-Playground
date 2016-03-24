document.addEventListener("DOMContentLoaded", function() {
  // Load library
  var gui = require("nw.gui")

  // Reference to window
  var win = gui.Window.get()

  // Create menu container
  var Menu = new gui.Menu({
    type: "menubar"
  })

  // Initialize default mac menu
  Menu.createMacBuiltin("Code Editor")

  // Get the root menu from the default mac menu
  var rootMenu = Menu.items[0].submenu
  var windowMenu = Menu.items[2].submenu

  var file = new gui.Menu()
  file.append(new gui.MenuItem({
      type: "normal",
      label: "Export Zip",
      key: "s",
      modifiers: "cmd",
      click: function () {
        var file_system = require("fs")
        var archiver = require("archiver")

        var output = file_system.createWriteStream("target.zip")
        var archive = archiver("zip")

        output.on("close", function () {
          // alertify.message("File exported: " + archive.pointer() + " total bytes" + "<br> Zip is located at " + process.cwd())

          var options = {
            body: archive.pointer() + " total bytes" + "\n" + process.cwd()
          }
          var notification = new Notification("File exported", options);
          notification.onclick = function () {
            notification.close()
          }
        })

        archive.on("error", function(err) {
          throw err
        })

        archive.pipe(output)
        archive.bulk([
          { expand: true, cwd: "./content/project/", src: ["*"], dest: "project"}
        ])
        archive.finalize()
      }
  }))

  windowMenu.insert(
    new gui.MenuItem({
      type: "normal",
      label: "Toggle Fullscreen",
      key: "F",
      modifiers: "cmd",
      click: function () {
        win.toggleFullscreen()
      }
    })
  )
  windowMenu.insert(
    new gui.MenuItem({
      type: "normal",
      label: "Reload App",
      key: "r",
      modifiers: "cmd",
      click: function () {
        win.reload()
      }
    })
  )

  // Append Menu to Window
  win.menu = Menu
  rootMenu.removeAt(0)

  // add the file menu to window/menu panel - menu
  win.menu.insert(new gui.MenuItem({
      label: "File",
      submenu: file
  }), 1)
  // Remove Menu Items
  // editMenu.removeAt(8)
})

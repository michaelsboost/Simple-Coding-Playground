// Clear Input Values - JQuery Plugin
(function($) {
  $.fn.clear = function() {
    $(this).val("")
  }
}) (jQuery);

var InitEditor = function() {
  var fs = require("fs"),
      download_to_editor = function (url, el) {
        return $.get(url, null, function (data) {
          el.setValue(data)
        }, "text")
      };

  __dirname = fs.realpathSync(".")
  function currentPath() {
    fs.realpath(__dirname + "/content", function(err, path) {
      if (err) {
        console.log(err)
        return
      }
      console.log("Path is : " + path)
    })
  }
  function fileTree() {
    var listFiles = function() {
      var files = fs.readdirSync(__dirname + "/content/project")
      files.forEach(function(f) {
        $("[data-action=filetree]").append(
          $("<div/>").append(
            $("<a/>", {
              text: f
            }).attr("data-name", f)
              .attr("data-location", "file://" + __dirname + "/content/project/" + f),

            $("<a/>", {
              class: "fr"
            }).attr("data-name", f)
              .html("<i class=\"fa fa-times\"></i>")
              .attr("data-delete", "file://" + __dirname + "/content/project/" + f)
          )
        )
      })
    }
    listFiles()
    $("[data-action=filetree] a:contains('.html')").attr("data-extension", "html")
                                                   .attr("class", "htmlfile")
    $("[data-action=filetree] a:contains('.css')").attr("data-extension", "css")
                                                  .attr("class", "cssfile")
    $("[data-action=filetree] a:contains('.js')").attr("data-extension", "js")
                                                 .attr("class", "jsfile")
    $("[data-action=filetree] a:contains('.md')").attr("data-extension", "md")
                                                 .attr("class", "mdfile")

    // Select file
    function SelectFile() {
      $("[data-extension=html]").on("click", function() {
        $("[data-action=filetree] a:contains('.html')").attr("class", "htmlfile")
        $(this).attr("class", "htmlfile htmlactive")

        $("#htmlEditor").attr("data-file", this.textContent)
        if ( $("#htmlEditor").hasClass("hide") ) {
          $("#htmlEditor").removeClass("hide")
          $("#mdEditor").addClass("hide")
        }

        var name = __dirname + "/content/project/" + this.textContent
        download_to_editor(name, htmlEditor)
        setTimeout(updatePreview, 300)
      })
      $("[data-extension=css]").on("click", function() {
        $("[data-action=filetree] a:contains('.css')").attr("class", "cssfile")
        $(this).attr("class", "cssfile cssactive")

        $("#cssEditor").attr("data-file", this.textContent)

        var name = __dirname + "/content/project/" + this.textContent
        download_to_editor(name, cssEditor)
        setTimeout(updatePreview, 300)
      })
      $("[data-extension=js]").on("click", function() {
        $("[data-action=filetree] a:contains('.js')").attr("class", "jsfile")
        $(this).attr("class", "jsfile jsactive")

        $("#jsEditor").attr("data-file", this.textContent)

        var name = __dirname + "/content/project/" + this.textContent
        download_to_editor(name, jsEditor)
        setTimeout(updatePreview, 300)
      })
      $("[data-extension=md]").on("click", function() {
        $("[data-action=filetree] a:contains('.md')").attr("class", "mdfile")
        $(this).attr("class", "mdfile mdactive")

        $("#mdEditor").attr("data-file", this.textContent)
        if ( $("#mdEditor").hasClass("hide") ) {
          $("#htmlEditor").addClass("hide")
          $("#mdEditor").removeClass("hide")
        }

        var name = __dirname + "/content/project/" + this.textContent
        download_to_editor(name, mdEditor)
        setTimeout(markdownPreview, 300)
      })
    }
    SelectFile()

    // Delete a file
    $("[data-delete]").on("click", function() {
      fs.unlink(__dirname + "/content/project/" + $(this).attr("data-name"))
      $("[data-action=filetree]").empty()
      fileTree()

      $("[data-action=filetree] a:contains('"+ $("#htmlEditor").attr("data-file") +"')").trigger("click")
      $("[data-action=filetree] a:contains('"+  $("#cssEditor").attr("data-file") +"')").trigger("click")
      $("[data-action=filetree] a:contains('"+   $("#jsEditor").attr("data-file") +"')").trigger("click")
      $("[data-action=filetree] a:contains('"+   $("#mdEditor").attr("data-file") +"')").trigger("click")
    })
  }

  // Create a new file
  $("[data-action=addfile]").click(function() {
    if ($("[data-action=filename]").val().toLowerCase().substring($("[data-action=filename]").val().length - 5) === ".html") {
      fs.writeFile("./content/project/" + $("[data-action=filename]").val(), "<!-- hello world -->", { flag: "wx" }, function (err) {
        if (err) throw err
      })
    } else if ($("[data-action=filename]").val().toLowerCase().substring($("[data-action=filename]").val().length - 4) === ".css") {
      fs.writeFile("./content/project/" + $("[data-action=filename]").val(), "/* hello world */", { flag: "wx" }, function (err) {
        if (err) throw err
      })
    } else if ($("[data-action=filename]").val().toLowerCase().substring($("[data-action=filename]").val().length - 3) === ".js") {
      fs.writeFile("./content/project/" + $("[data-action=filename]").val(), "// hello world", { flag: "wx" }, function (err) {
        if (err) throw err
      })
    } else if ($("[data-action=filename]").val().toLowerCase().substring($("[data-action=filename]").val().length - 3) === ".md") {
      fs.writeFile("./content/project/" + $("[data-action=filename]").val(), "# hello world", { flag: "wx" }, function (err) {
        if (err) throw err
      })
    } else {
      alertify.error("Sorry kodeWeave does not currently support that file type!")
    }
    $("[data-action=filetree]").empty()
    fileTree()
    $("[data-action=filename]").clear()

    setTimeout(function() {
      $("[data-action=filetree] a:contains('"+ $("#htmlEditor").attr("data-file") +"')").trigger("click")
      $("[data-action=filetree] a:contains('"+  $("#cssEditor").attr("data-file") +"')").trigger("click")
      $("[data-action=filetree] a:contains('"+   $("#jsEditor").attr("data-file") +"')").trigger("click")
      $("[data-action=filetree] a:contains('"+   $("#mdEditor").attr("data-file") +"')").trigger("click")
    }, 500)
  })
  $("[data-action=filename]").on("keydown", function(e) {
    if (e.which == 13) {
      $("[data-action=addfile]").trigger("click")
    }
  })

  // Display the project files
  fileTree()

  htmlEditor.on("change", function() {
    fs.writeFileSync("./content/project/" + $("#htmlEditor").attr("data-file"), htmlEditor.getValue())
  })
  cssEditor.on("change", function() {
    fs.writeFileSync("./content/project/" + $("#cssEditor").attr("data-file"), cssEditor.getValue())
  })
  jsEditor.on("change", function() {
    fs.writeFileSync("./content/project/" + $("#jsEditor").attr("data-file"), jsEditor.getValue())
  })
  mdEditor.on("change", function() {
    fs.writeFileSync("./content/project/" + $("#mdEditor").attr("data-file"), mdEditor.getValue())
  })

  // Select default files
  setTimeout(function() {
    $("[data-action=filetree] a:contains('README.md')").trigger("click")
    $("[data-action=filetree] a:contains('index.html')").trigger("click")
    $("[data-action=filetree] a:contains('style.css')").trigger("click")
    $("[data-action=filetree] a:contains('script.js')").trigger("click")
  }, 1000)
}
InitEditor()

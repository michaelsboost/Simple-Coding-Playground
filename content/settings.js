var timeout,
    delay,
    htmlWaiting,
    cssWaiting,
    jsWaiting,
    widgets = [];

function updateJSHints() {
  jsEditor.operation(function(){
    for (var i = 0; i < widgets.length; ++i)
      jsEditor.removeLineWidget(widgets[i])
    widgets.length = 0

    JSHINT(jsEditor.getValue())
    for (i = 0; i < JSHINT.errors.length; ++i) {
      var err = JSHINT.errors[i]
      if (!err) continue
      var msg = document.createElement("div")
      var icon = msg.appendChild(document.createElement("span"))
      icon.innerHTML = "!!"
      icon.className = "lint-error-icon"
      msg.appendChild(document.createTextNode(err.reason))
      msg.className = "lint-error"
      widgets.push(jsEditor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}))
    }
  })
  var info = jsEditor.getScrollInfo()
  var after = jsEditor.charCoords({line: jsEditor.getCursor().line + 1, ch: 0}, "local").top
  if (info.top + info.clientHeight < after)
    jsEditor.scrollTo(null, after - info.clientHeight + 3)
}
function updateCSSHints() {
  cssEditor.operation(function(){
    for (var i = 0; i < widgets.length; ++i){
      cssEditor.removeLineWidget(widgets[i])
    }

    widgets.length = 0

    var result = CSSLint.verify(cssEditor.getValue())

    for (i = 0; i < result.messages.length; ++i) {
      var err = result.messages[i]
      if (!err) continue
      var msg = document.createElement("div")
      var icon = msg.appendChild(document.createElement("span"))
      icon.innerHTML = "!!"
      icon.className = "lint-error-icon"
      //***** HERE *****
      msg.appendChild(document.createTextNode(err.message))
      msg.className = "lint-error"
      widgets.push(cssEditor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}))
    }
  })// end of cssEditor.operation
}// end of updateCSSHints
function updateHTMLHints() {
  htmlEditor.operation(function() {
    for (var i = 0; i < widgets.length; ++i){
      htmlEditor.removeLineWidget(widgets[i])
    }

    widgets.length = 0

    var messages = HTMLHint.verify(htmlEditor.getValue())

    for (i = 0; i < messages.length; ++i) {
      err = messages[i];
      if (!err) continue
      var msg = document.createElement("div")
      var icon = msg.appendChild(document.createElement("span"))
      icon.innerHTML = "!!"
      icon.className = "lint-error-icon"
      //***** HERE *****
      msg.appendChild(document.createTextNode(err.message))
      msg.className = "lint-error"
      widgets.push(htmlEditor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}))
    }
  })// end of editor.operation
}// end of updateHTMLHints

// Rules Specified for HTML Validation
var ruleSets = {
  "tagname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "tag-pair": true,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "attr-no-duplication": true
}

// Initialize HTML editor
var htmlEditor = CodeMirror(document.getElementById("htmlEditor"), {
  mode: "text/html",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {
    "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()) }
  },
  paletteHints: true
})
Inlet(htmlEditor)
emmetCodeMirror(htmlEditor)
var cssEditor = CodeMirror(document.getElementById("cssEditor"), {
  mode: "text/css",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {
    "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()) }
  },
  paletteHints: true
})
Inlet(cssEditor)
emmetCodeMirror(cssEditor)
var jsEditor = CodeMirror(document.getElementById("jsEditor"), {
  mode: "text/javascript",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {
    "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()) }
  },
  mode: {name: "javascript", globalVars: false},
  paletteHints: true
})
Inlet(jsEditor)

var mdEditor = CodeMirror(document.getElementById("mdEditor"), {
  mode: "text/x-markdown",
  theme: "default",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  dragDrop: true,
  gutters: ["CodeMirror-linenumbers"],
  extraKeys: {
    "Enter": "newlineAndIndentContinueMarkdownList"
  }
})

// Live preview
htmlEditor.on("change", function() {
  clearTimeout(delay)
  clearTimeout(htmlWaiting)
  delay = setTimeout(updatePreview, 300)
  htmlWaiting = setTimeout(updateHTMLHints, 300)
})
cssEditor.on("change", function() {
  clearTimeout(delay)
  clearTimeout(cssWaiting)
  delay = setTimeout(updatePreview, 300)
  cssWaiting = setTimeout(updateCSSHints, 300)
})
jsEditor.on("change", function() {
  clearTimeout(delay)
  delay = setTimeout(updatePreview, 300)
})
mdEditor.on("change", function() {
  clearTimeout(delay)
  delay = setTimeout(markdownPreview, 300)
})

// Don't add to code, replace with new drop file's code
htmlEditor.on("drop", function() {
  htmlEditor.setValue("")
})
cssEditor.on("drop", function() {
  cssEditor.setValue("")
})
jsEditor.on("drop", function() {
  jsEditor.setValue("")
})
mdEditor.on("drop", function() {
  mdEditor.setValue("")
})

function updatePreview() {
  var iframe = document.getElementById("preview")
  iframe.src = "project/index.html"
}

function markdownPreview() {
  var mdconverter = new Showdown.converter(),
      previewFrame = document.getElementById("preview"),
      preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document

  previewFrame.src = ""

  preview.open()
  preview.write( mdconverter.makeHtml( mdEditor.getValue() ) )
  preview.close()
}
setTimeout(markdownPreview, 300)
setTimeout(updatePreview, 300)
setTimeout(updateCSSHints, 300)
setTimeout(updateHTMLHints, 300)

jsEditor.on("change", function() {
  jsWaiting = setTimeout(updateJSHints, 300)
  clearTimeout(jsWaiting)
  setTimeout(updateJSHints, 300)
})

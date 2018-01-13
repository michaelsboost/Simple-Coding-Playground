Simple Coding Playground
===================

I love coding playgrounds like [JSFiddle](http://jsfiddle.net/), [JSBin](http://jsbin.com/), [kodeWeave](http://michaelsboost.github.io/kodeWeave/), [Dabblet](http://dabblet.com/), etc: Yet all these editors have a **HUGE** flaw. None of them allow the user to create additional files.

[Plunker](https://plnkr.co/edit) is one of the few coding playgrounds that allows users to create additional files. However what I don't like about it is all your files only show up in 1 editor. Meaning if you're working on your html file you don't see your javascript, or css code until you select that file. Which makes it less productive than it could be.

I created this coding playground as a template for a solution to solve those problems.

License
-------------

MIT

Tech
-------------

This Coding Playground uses a number of open source projects to work properly:

* [jQuery](http://jquery.com/) - duh
* [JQWidgets](http://www.jqwidgets.com/jquery-widgets-demo/demos/jqxsplitter/index.htm#demos/jqxsplitter/nested-splitters.htm) - awesome plugin for resizable columns
* [Codemirror](http://codemirror.net/) - awesome web-based text editor
* [node-webkit](http://nwjs.io/) - makes web apps run on desktops (comes built with [node.js](http://nodejs.org/))
* [Inlet](https://github.com/enjalot/Inlet) - awesome inline color picker and numeric slider for Codemirror
* [Emmet](http://emmet.io/) - Codemirror Plugin for Zen Coding
* [Showdown](http://showdownjs.github.io/demo/) - Markdown to HTML converter
* [HTMLHint](http://htmlhint.com/) - for html syntax validation
* [CSSLint](http://csslint.net/) - for css syntax validation
* [JSHint](http://jslint.com/) - for javascript syntax validation

This application was built using [node-webkit](http://nwjs.io/) on my Mac. Which means it can easily be ported over to Windows or Linux using either [node-webkit](http://nwjs.io/) (for 32bit processors) or [Electron](http://electron.atom.io/) (for 64bit processors)

You can use [WebDGap](http://michaelsboost.github.io/WebDGap/) to export your application or this application as a Windows, Linux or Mac application.

Development
-------------

Want to contribute? Great!  

You can also submit a pull request here on Github or simply share it with your friends :)

// Splitter Theme
$("#mainSplitter, #splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
  theme: "metro"
})

// Grid
function GridScheme() {
  $("#mainSplitter").jqxSplitter({
    height: "auto",
    width: "100%",
    orientation: "vertical",
    showSplitBar: true,
    panels: [{ size: '30%' },
             { size: '70%',collapsible:false }]
  })
  $("#splitContainer").jqxSplitter({
    height: "auto",
    width: "100%",
    orientation: "horizontal",
    showSplitBar: true,
    panels: [{ size: "50%",collapsible:false },
             { size: "50%" }]
  })
  $("#leftSplitter").jqxSplitter({
    width: "100%",
    height: "100%",
    orientation: "vertical",
    showSplitBar: true,
    panels: [{
      size: "50%",
      collapsible: false
    }]
  })
  $("#rightSplitter").jqxSplitter({
    width: "100%",
    height: "100%",
    orientation: "vertical",
    showSplitBar: true,
    panels: [{
      size: "50%",
      collapsible: false
    }]
  })
}
GridScheme()
// $("#mainSplitter").jqxSplitter("collapse")

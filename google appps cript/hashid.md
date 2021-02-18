Manipulate Google Spreadsheet with 'apps script'
```js
// Run MANUALLY WHEN MODIFYING THE 

var activeSheet = SpreadsheetApp.getActiveSheet();
var rangeData = activeSheet.getDataRange();
var lastColumn = rangeData.getLastColumn();
var cell = activeSheet.getActiveCell();
var lastRowindex = activeSheet.getLastRow()-1

function createIds() {
Logger.log("hola")
  //   for (var i=2; i < lastRowindex + 2; i++){
  //     var str = activeSheet.getRange(i, 1).getValue()
  //     activeSheet.getRange(i, 2).setValue(hashCode(str))
  // }

}

// Generate the unique ID
function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 * Run when editing the cell in the column of 'en', not in the rest
 */
function onEdit(e) {
  // Set a comment on the edited cell to indicate when it was changed.
  // var code = hashCode('asdf')
  var range = e.range;
  // next.setValue("akjsdhf")
  // Logger.log(e.range.getCell())
  
  // Logger.log(range.getCell())

  range.setNote('Last modified: ' + new Date());
var rigth =range.offset(0, 1) // cell at the right
  rigth.offset(0, 2).setValue(e.oldValue)
  range.offset(0, 2).setValue(e.value)
}
```

let dataForTable = {};

async function fetchData() {
    await fetch('https://krypto-medical.herokuapp.com/api/v1/getdatafortable')
    .then((res) => res.json())
    .then((data) => { dataForTable = data;});
}

async function buildHtmlTable(selector) {
    await fetchData();
    var columns = addAllColumnHeaders(dataForTable, selector);
  
    for (var i = 0; i < dataForTable.length ; i++) {
      var row = $('<tr/>').addClass("hover:bg-gray-100 dark:hover:bg-gray-700");
      for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var cellValue = dataForTable[i][columns[colIndex]];
        if (cellValue == null) cellValue = "";
        row.append($('<td/>').html(cellValue).addClass("py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"));
      }
      $(selector).append(row);
    }
  }
  
  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records.
  function addAllColumnHeaders(dataForTable, selector) {
    var columnSet = [];
  
    for (var i = dataForTable.length; i >= 0 ; i--) {
      var rowHash = dataForTable[i];
      for (var key in rowHash) if ($.inArray(key, columnSet) == -1) columnSet.push(key); 
    }
    
    return columnSet;
  }

buildHtmlTable("table");

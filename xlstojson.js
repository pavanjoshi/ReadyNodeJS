node_xj = require("xls-to-json");
  node_xj({
    input: "sample.xls",  //path to a sample excel sheet
    output: "output.json" //path of output json file
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });

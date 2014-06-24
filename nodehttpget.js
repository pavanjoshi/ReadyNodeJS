// JSON GET CALL WITH PROXY
var url = 'your url to get json response';
var options = {
  host: "proxy",
  port: port, //enter port e.g. 8080
  path: url
};

http.get(options, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var jsonResponse = JSON.parse(body)
        console.log("Got response: ", jsonResponse.get24HoursVideos[0].name);
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});

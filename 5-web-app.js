
function greeter(app) {
  return function (req, res) {
    if (!(req.method === "GET" && req.url.pathname === "/")) {
      return app(req, res);
    }
    res(200, {
      "Content-Type": "text/plain",
      "Content-Length": 12
    }, "Hello World\n");
  }
}

function logger(app) {
  return function (req, res) {
    app(req, function (code, headers, body) {
      console.log(req.method + " " + req.url.path + " " + code);
      res(code, headers, body);
    });
  };
}

var app = function (req, res) {
  res(404, {"Content-Type": "text/plain"}, "Not Found\n");
};

app = greeter(app);
app = logger(app);

////////////////////////////////////////////////////////////////////////////////

var handler = require('web').socketHandler(app);

var server = require('net').createServer(handler);

server.listen(8080, function () {
  console.log("Server listening at", server.address());
});

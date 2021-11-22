var express    = require("express"),
    app        = express(),
    port       = process.env.port || 3000,
    bodyParser = require("body-parser");

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.send("From root route");
})

app.use("/api/todo", todoRoutes);

app.listen(port, function() {
    console.log("App running on port " + port);
})
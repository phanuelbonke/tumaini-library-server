const express = require("express");
const app = express();
 
app.get("/", function (req, res){
    //logic
    res.send("Hello world");
});
app.listen(900, function () {
    console.log("App listening on port 9000");
});